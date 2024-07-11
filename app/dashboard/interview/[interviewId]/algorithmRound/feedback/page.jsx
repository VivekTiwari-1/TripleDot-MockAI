"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { AlgoFeedback } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";

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
    const result = await db
      .select()
      .from(AlgoFeedback)
      .where(eq(AlgoFeedback.mockIdRef, params.interviewId));

    setInterviewData(result[0]);
    setMockInterviewQuestion(JSON.parse(result[0].question));
    setCorrectAnswer(JSON.parse(result[0].correctAns));
    setFeedback(JSON.parse(result[0].feedback));
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
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[70vw] rounded-xl bg-gray-400" />
          <div className="space-y-2">
            <Skeleton className="h-[20vh] w-[60vw]" />
            <Skeleton className="h-[10vh] w-[50vw]" />
          </div>
        </div>
      ) : (
        <div>
          <div className="">
            <Collapsible className="mt-4">
              <CollapsibleTrigger className="p-2 bg-secondary rounded my-2 flex justify-between w-full">
                Question <ChevronsUpDown className="h-5 w-5 ml-4" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-600 p-2 border rounded-lg text-sm">
                    <strong>Scenario: </strong>
                    {mockInterviewQuestion?.scenario}
                  </h2>
                  <h2 className="text-gray-600 p-2 border rounded-lg bg-gray-100 text-sm">
                    <strong>Problem: </strong>
                    {mockInterviewQuestion?.problem}
                  </h2>
                  <h2 className="text-gray-600 p-2 border rounded-lg bg-gray-100 text-sm">
                    <strong>Requirements: </strong>
                    {mockInterviewQuestion?.requirements}
                  </h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div className="">
            <Collapsible className="mt-4">
              <CollapsibleTrigger className="p-2 bg-secondary rounded my-2 flex justify-between w-full">
                Correct Solution <ChevronsUpDown className="h-5 w-5 ml-4" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-600 p-2 border rounded-lg text-sm">
                    <strong>Solution: </strong>
                    {correctAnswer?.algorithm}
                  </h2>
                  <h2 className="text-gray-600 p-2 border rounded-lg bg-gray-100 text-sm">
                    <strong>Explanation: </strong>
                    {correctAnswer?.explanation}
                  </h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div className="">
            <Collapsible className="mt-4">
              <CollapsibleTrigger className="p-2 bg-secondary rounded my-2 flex justify-between w-full">
                Your Submitted Solution{" "}
                <ChevronsUpDown className="h-5 w-5 ml-4" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <h2 className="text-gray-600 p-2 border rounded-lg text-sm">
                  <strong>Solution: </strong>
                  {interviewData?.userAns}
                </h2>
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div className="w-full bg-gray-200 p-8 rounded-lg my-12">
            <h1 className="text-xl font-semibold mb-4">
              Your Personalized feedback
            </h1>
            <h2 className="text-gray-600 p-2 border rounded-lg text-md my-6">
              <strong>Rating: </strong>
              {feedback?.rating}/10
            </h2>
            <h2 className="text-gray-600 p-2 border rounded-lg text-sm mt-2">
              <strong>Correctness: </strong>
              {feedback?.correctness}
            </h2>
            <h2 className="text-gray-600 p-2 border rounded-lg text-sm mt-2">
              <strong>Approach: </strong>
              {feedback?.approach}
            </h2>
            <h2 className="text-gray-600 p-2 border rounded-lg text-sm mt-2">
              <strong>Efficiency: </strong>
              {feedback?.efficiency}
            </h2>
            <h2 className="text-gray-600 p-2 border rounded-lg text-sm mt-2">
              <strong>Optimization: </strong>
              {feedback?.optimization}
            </h2>
            <h2 className="text-gray-600 p-2 border rounded-lg text-sm mt-2">
              <strong>Scalability: </strong>
              {feedback?.scalability}
            </h2>
          </div>

          <Link href={"/dashboard"}>
            <Button className="">Go to Dashboard</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default page;
