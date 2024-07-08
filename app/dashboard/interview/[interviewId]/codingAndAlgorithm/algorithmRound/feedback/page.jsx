"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { AlgoInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const page = ({ params }) => {
  const [interviewData, setInterviewData] = useState([]);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(AlgoInterview)
      .where(eq(AlgoInterview.mockId, params.interviewId));

    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    //console.log(jsonMockResp.question);
    setMockInterviewQuestion(jsonMockResp);
    console.log(jsonMockResp);
    setInterviewData(result[0]);
    setLoading(false);
  };
  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold text-green-500">Congratulations!</h2>
      <h2 className="font-bold text-2xl">Here is your feedback</h2>

      <h2 className="text-sm text-gray-500">
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
          <div className="flex gap-6 bg-slate-300">
            <div>
              <h1 className="text-xl font-bold">Scenario</h1>
              <h2 className="">{mockInterviewQuestion?.question?.scenario}</h2>
            </div>
            <div>
              <h1 className="text-xl font-bold">Problem</h1>
              <h2>{mockInterviewQuestion?.question?.problem}</h2>
            </div>
            <div>
              <h1 className="text-xl font-bold">Requirements</h1>
              <h2>{mockInterviewQuestion?.question?.requirements}</h2>
            </div>
          </div>
          <div className="my-8 w-[50%]">
            <h1 className="text-xl font-bold">Solution: </h1>
            <p>{mockInterviewQuestion?.answer?.algorithm}</p>
          </div>
          <div className="w-[50%]">
            <h1 className="text-xl font-bold">Explanation: </h1>
            <p>{mockInterviewQuestion?.answer?.explanation}</p>
          </div>

          <Link href={"/dashboard"}>
            <Button className="my-8">Go Home</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default page;
