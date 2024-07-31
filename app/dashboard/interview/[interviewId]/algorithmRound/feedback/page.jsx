"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { AlgoFeedback } from "@/utils/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown, X } from "lucide-react";
import Loader from "@/app/dashboard/_components/Loader";
import { toast } from "@/components/ui/use-toast";

const page = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [feedback, setFeedback] = useState();
  const [correctAnswer, setCorrectAnswer] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    setLoading(true);

    try {
      const result = await db
        .select()
        .from(AlgoFeedback)
        .where(eq(AlgoFeedback.mockIdRef, params.interviewId));

      setInterviewData(result[0]);
      setMockInterviewQuestion(JSON.parse(result[0].question));
      setCorrectAnswer(JSON.parse(result[0].correctAns));
      setFeedback(JSON.parse(result[0].feedback));
    } catch (error) {
      toast({
        description: "Please try again!!",
        action: <X className="text-red-600" />,
      });
    }

    setLoading(false);
  };
  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold text-green-500">Congratulations!</h2>

      <h2 className="text-md text-gray-500 mt-2 mb-12">
        Find below interview question with correct answer, your answer and
        feedback for improvement
      </h2>
      {loading && loading ? (
        <Loader />
      ) : (
        <div>
          <div className="">
            <Collapsible className="mt-4">
              <CollapsibleTrigger className="p-2 bg-gray-900 rounded text-gray-400 font-bold pl-4 my-2 flex justify-between w-full">
                Question <ChevronsUpDown className="h-5 w-5 ml-4" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500 bg-gray-950 p-2 border border-gray-600 rounded-lg text-sm">
                    <strong className="text-gray-400">Scenario: </strong>
                    {mockInterviewQuestion?.scenario}
                  </h2>
                  <h2 className="text-gray-500 bg-gray-950 p-2 border border-gray-600 rounded-lg text-sm">
                    <strong className="text-gray-400">Problem: </strong>
                    {mockInterviewQuestion?.problem}
                  </h2>
                  <h2 className="text-gray-500 bg-gray-950 p-2 border border-gray-600 rounded-lg text-sm">
                    <strong className="text-gray-400">Requirements: </strong>
                    {mockInterviewQuestion?.requirements}
                  </h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div className="">
            <Collapsible className="mt-4">
              <CollapsibleTrigger className="p-2 bg-gray-900 rounded text-gray-400 font-bold pl-4 my-2 flex justify-between w-full">
                Correct Solution <ChevronsUpDown className="h-5 w-5 ml-4" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500 bg-gray-950 p-2 border border-gray-600 rounded-lg text-sm">
                    <strong className="text-gray-400">Solution: </strong>
                    {correctAnswer?.algorithm}
                  </h2>
                  <h2 className="text-gray-500 bg-gray-950 p-2 border border-gray-600 rounded-lg text-sm">
                    <strong className="text-gray-400">Explanation: </strong>
                    {correctAnswer?.explanation}
                  </h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div className="">
            <Collapsible className="mt-4">
              <CollapsibleTrigger className="p-2 bg-gray-900 rounded text-gray-400 font-bold pl-4 my-2 flex justify-between w-full">
                Your Submitted Solution{" "}
                <ChevronsUpDown className="h-5 w-5 ml-4" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <h2 className="text-gray-500 bg-gray-950 p-2 border border-gray-600 rounded-lg text-sm">
                  <strong className="text-gray-400">Solution: </strong>
                  {interviewData?.userAns}
                </h2>
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div className="w-full bg-gray-950 text-gray-500 p-8 rounded-lg my-12">
            <h1 className="text-xl font-bold mb-4 text-gray-400">
              Your Personalized feedback
            </h1>
            <h2 className=" p-2 border border-gray-800 rounded-lg text-md my-6">
              <strong>Rating: </strong>
              {feedback?.rating}/10
            </h2>
            <h2 className=" p-2 border border-gray-800 rounded-lg text-sm mt-2">
              <strong>Correctness: </strong>
              {feedback?.correctness}
            </h2>
            <h2 className=" p-2 border border-gray-800 rounded-lg text-sm mt-2">
              <strong>Approach: </strong>
              {feedback?.approach}
            </h2>
            <h2 className="p-2 border border-gray-800 rounded-lg text-sm mt-2">
              <strong>Efficiency: </strong>
              {feedback?.efficiency}
            </h2>
            <h2 className="p-2 border border-gray-800 rounded-lg text-sm mt-2">
              <strong>Optimization: </strong>
              {feedback?.optimization}
            </h2>
            <h2 className="p-2 border border-gray-800 rounded-lg text-sm mt-2">
              <strong>Scalability: </strong>
              {feedback?.scalability}
            </h2>
          </div>

          <Link href={"/dashboard"}>
            <Button className=" bg-gray-900 text-gray-400">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default page;
