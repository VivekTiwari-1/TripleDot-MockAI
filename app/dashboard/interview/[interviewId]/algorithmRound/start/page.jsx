"use client";

import React, { useEffect, useState } from "react";
import CodeEditor from "../../_components/CodeEditor";
import { db } from "@/utils/db";
import { AlgoInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const page = ({ params }) => {
  const [interviewData, setInterviewData] = useState([]);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(AlgoInterview)
      .where(eq(AlgoInterview.mockId, params.interviewId));

    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    //console.log(jsonMockResp.question);
    setMockInterviewQuestion(jsonMockResp);
    console.log(mockInterviewQuestion);
    setInterviewData(result[0]);
  };
  return (
    <div className="flex gap-8 py-8 w-[90vw] -ml-12">
      <div className="flex flex-col gap-8 pr-12 w-[50%]">
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
        <Link
          href={
            "/dashboard/interview/" +
            params.interviewId +
            "/algorithmRound/feedback"
          }
        >
          <Button>Submit Algo</Button>
        </Link>
      </div>

      <div className="w-[50%] rounded-lg shadow-lg p-4">
        <CodeEditor />
      </div>
    </div>
  );
};

export default page;
