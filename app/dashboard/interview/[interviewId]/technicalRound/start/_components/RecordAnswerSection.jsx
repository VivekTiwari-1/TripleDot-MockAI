"use client";

import "regenerator-runtime/runtime";
import { Button } from "@/components/ui/button";
import {
  CircleCheckBig,
  CircleX,
  Mic,
  StopCircle,
  WebcamIcon,
} from "lucide-react";
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
          action: <CircleX className="text-red-600 text-xl" />,
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
      resetTranscript;
    }
    resetTranscript;
    setLoading(false);
  };

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
