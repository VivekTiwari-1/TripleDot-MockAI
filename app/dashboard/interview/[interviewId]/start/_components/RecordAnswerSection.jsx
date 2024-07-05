"use client";

import "regenerator-runtime/runtime";
import { Button } from "@/components/ui/button";
import { Mic, StopCircle, WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { toast } from "@/components/ui/use-toast";
import { chatSession } from "@/utils/GeminiAIModel";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

//http://localhost:3000/dashboard/interview/b099ef07-955a-4690-8e96-fed159d4a8da/start

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    browserSupportsContinuousListening,
  } = useSpeechRecognition();

  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState();
  const { user } = useUser();

  // if (!browserSupportsSpeechRecognition) {
  //   return <span>Browser doesn't support speech recognition.</span>;
  // }

  useEffect(() => {
    if (!listening && userAnswer.length > 10) {
      updateUserAnswer();
    }
  }, [userAnswer]);

  const startStopRecording = async () => {
    if (listening) {
      setLoading(true);

      SpeechRecognition.startListening({ continuous: false });

      if (transcript?.length < 10) {
        toast({
          description: "Error while saving your answer, Please record again!!",
        });
        resetTranscript;
        return;
      }
      setUserAnswer(transcript);
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  const updateUserAnswer = async () => {
    setLoading(true);

    const feedbackPrompt =
      "Question: " +
      mockInterviewQuestion[activeQuestionIndex]?.question +
      ", User answer:" +
      userAnswer +
      ". Depends on question and user answer for given interview questions. Please give us rating and feedback as area of improvement if any in just 3 to 5 line in JSON format with rating field and feedback field";

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
      toast({ description: "User answer recorded successfully!!" });
      setUserAnswer("");
      resetTranscript;
    }
    resetTranscript;
    setLoading(false);
  };

  // useEffect(() => {
  //   if (listening) {
  //     SpeechRecognition.startListening({ continuous: true });
  //   }
  //   if (!listening) {
  //     if (transcript?.length < 10) {
  //       toast("Error while saving your answer, Please record again!!");
  //       return;
  //     }
  //     setUserAnswer(transcript);
  //     SpeechRecognition.startListening({ continuous: false });
  //   }
  // }, [listening]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center rounded-lg mt-16 p-5 bg-black text-white">
        <WebcamIcon height={300} width={300} className="absolute" />
        <Webcam
          mirrored={true}
          style={{ height: 300, width: "100%", zIndex: 10 }}
        />
      </div>
      <Button variant="outline" className="mt-10" onClick={startStopRecording}>
        {listening ? (
          <h2 className="flex gap-3 text-red-700 animate-pulse items-center">
            <StopCircle />
            Stop Recording
          </h2>
        ) : (
          <h2 className="flex gap-3 items-center">
            <Mic />
            Record Answer
          </h2>
        )}
      </Button>

      <div>
        <p className="m-10">{transcript}</p>
      </div>
    </div>
  );
};

export default RecordAnswerSection;
