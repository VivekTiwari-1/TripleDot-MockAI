"use client";

import "regenerator-runtime/runtime";
import { Button } from "@/components/ui/button";
import { CircleCheckBig, LoaderCircle, Mic, StopCircle, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { chatSession } from "@/utils/GeminiAIModel";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState();
  const [listening, setListening] = useState();
  const { user } = useUser();

  // NEW SECTION STARTS HERE
  const recognition = useRef(null);

  useEffect(() => {
    // Initialize Speech Recognition
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;
      recognition.current.onresult = (event) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        setUserAnswer((prev) => prev + interimTranscript);
      };
    } else {
      alert("Speech Recognition API not supported in this browser.");
    }
  }, []);

  const startStopRecording = async () => {
    if (!listening) {
      try {
        recognition.current.start();
        setUserAnswer("");
        setListening(true);
      } catch (error) {
        toast({
          description: "Wait a second and try again!!",
          action: <X className="text-red-600" />,
        });
      }
    }
    if (listening) {
      recognition.current.stop();
      setListening(false);
    }
  };

  const updateUserAnswer = async () => {
    setLoading(true);

    try {
      const feedbackPrompt =
        "Question: " +
        mockInterviewQuestion[activeQuestionIndex]?.question +
        ", User answer:" +
        userAnswer +
        ". Depends on question and user answer for given interview questions. Please give us rating out of 10 and feedback as area of improvement if any in just 3 to 5 line in JSON format with rating field and feedback field";

      const result = await chatSession.sendMessage(feedbackPrompt);

      const mockJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");

      console.log(mockJsonResp);

      const jsonFeedbackRep = JSON.parse(mockJsonResp);

      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: jsonFeedbackRep?.feedback,
        rating: jsonFeedbackRep?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-YYYY"),
      });

      console.log(mockInterviewQuestion[activeQuestionIndex].answer);

      console.log(resp);

      if (resp) {
        toast({
          description: "User answer recorded successfully!!",
          action: <CircleCheckBig className="text-green-600" />,
        });
        setUserAnswer("");
      }
    } catch (error) {
      toast({
        description: "Please try again!!",
        action: <X className="text-red-600" />,
      });
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between ml-16 -mr-8">
        <Button className="mt-10 bg-gray-800" onClick={startStopRecording}>
          {listening ? (
            <h2 className="flex gap-3 text-red-700 animate-pulse items-center">
              <StopCircle />
              Stop Recording
            </h2>
          ) : (
            <h2 className="flex gap-3 items-center text-gray-300">
              <Mic />
              Record Answer
            </h2>
          )}
        </Button>

        <Button
          className="m-10 bg-gray-800"
          onClick={updateUserAnswer}
          disabled={loading}
        >
          {loading ? (
            <>
              <LoaderCircle className="animate-spin" />
              Saving...
            </>
          ) : (
            "Save Answer"
          )}
        </Button>
      </div>

      <div>
        <p className="m-10">{userAnswer}</p>
      </div>
    </div>
  );
};

export default RecordAnswerSection;
