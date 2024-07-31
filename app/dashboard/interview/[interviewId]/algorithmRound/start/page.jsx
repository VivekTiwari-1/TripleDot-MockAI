"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { AlgoFeedback, AlgoInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModel";
import moment from "moment";
import { useUser } from "@clerk/nextjs";
import { toast } from "@/components/ui/use-toast";
import { CircleCheckBig, LoaderCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Timer from "../../codingRound/_component/Timer";
import Loader from "@/app/dashboard/_components/Loader";

const page = ({ params }) => {
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [userSolution, setUserSolution] = useState("");

  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(true);

  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    setLoading(true);

    try {
      const result = await db
        .select()
        .from(AlgoInterview)
        .where(eq(AlgoInterview.mockId, params.interviewId));

      const jsonMockResp = JSON.parse(result[0].jsonMockResp);
      //console.log(jsonMockResp.question);
      setMockInterviewQuestion(jsonMockResp);
    } catch (error) {
      toast({
        description: "Please try again!!",
        action: <X className="text-red-600" />,
      });
    }

    setLoading(false);
  };

  const onSubmit = async () => {
    setProcessing(true);

    if (userSolution.length < 10) {
      toast({
        description: "Submission Failed!! Answer is too short.",
        action: <X className="text-red-500" />,
      });
      setProcessing(false);
      return;
    }

    try {
      const feedbackPrompt = `"This is an algorithm question - " Scenario: ${mockInterviewQuestion?.question?.scenario} Problem: ${mockInterviewQuestion?.question?.problem} Requirements: ${mockInterviewQuestion?.question?.requirements} " and this is the solution that I have written - " ${userSolution} " - Based on this answer, please provide me a detailed feedback like addressing my approach, efficiency and scalability of my solution, etc in JSON format without any extra space in between with these fields - correctness, approach, efficiency, optimization, scalability, rating(out of 10)
"`;

      const result = await chatSession.sendMessage(feedbackPrompt);

      const mockJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");

      const jsonMockResp = JSON.parse(mockJsonResp);
      console.log(jsonMockResp);

      const resp = await db.insert(AlgoFeedback).values({
        mockIdRef: params.interviewId,
        question: mockInterviewQuestion?.question,
        correctAns: mockInterviewQuestion?.answer,
        userAns: userSolution,
        feedback: jsonMockResp,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-YYYY"),
      });

      setProcessing(false);

      if (resp) {
        toast({
          description: "Submitted successfully",
          action: <CircleCheckBig className="text-green-600" />,
        });
      }

      router.push(
        "/dashboard/interview/" +
          params.interviewId +
          "/algorithmRound/feedback"
      );
    } catch (error) {
      toast({
        description: "Please try again!!",
        action: <X className="text-red-600" />,
      });
    }
  };

  const HandleTimeUp = (value) => {
    //Recieving data from a child component Timer
    if (value) {
      onSubmit();
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex justify-between flex-col lg:flex-row gap-8 py-8 lg:w-[90vw] lg:-ml-12">
          <div className="flex flex-col gap-8 pr-12 w-full text-gray-400">
            <h1 className="text-lg font-bold text-gray-400 my-2">
              Design an algorithm based on the following Information
            </h1>
            <div>
              <h1 className="text-md font-semibold text-gray-300 mb-2 ml-2">
                Scenario
              </h1>
              <h2 className="bg-gray-950 py-2 px-4 rounded-lg border border-gray-900">
                {mockInterviewQuestion?.question?.scenario}
              </h2>
            </div>
            <div>
              <h1 className="text-md font-semibold text-gray-300 mb-2 ml-2">
                Problem
              </h1>
              <h2 className="bg-gray-950 py-2 px-4 rounded-lg border border-gray-900">
                {mockInterviewQuestion?.question?.problem}
              </h2>
            </div>
            <div>
              <h1 className="text-md font-semibold text-gray-300 mb-2 ml-2">
                Requirements
              </h1>
              <h2 className="bg-gray-950 py-2 px-4 rounded-lg border border-gray-900">
                {mockInterviewQuestion?.question?.requirements}
              </h2>
            </div>
          </div>

          <div className="w-full">
            <div className="flex justify-end mb-2">
              <Timer
                initialMinutes={20}
                initialSeconds={0}
                onTimeUp={HandleTimeUp}
              />
            </div>
            <div className="h-[60vh] bg-gray-900 rounded-lg p-4 text-gray-300">
              <Textarea
                placeholder="Write your algorithm here"
                className="h-full w-full bg-gray-950 border-gray-600"
                required
                onChange={(event) => setUserSolution(event.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <Button
                className={`mt-10 bg-gray-800 ${
                  processing ? "text-gray-500" : "text-gray-300"
                }`}
                onClick={() => onSubmit()}
              >
                {processing ? (
                  <div className="flex">
                    {" "}
                    <LoaderCircle className="animate-spin" /> Submitting...
                  </div>
                ) : (
                  "Submit algo"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
