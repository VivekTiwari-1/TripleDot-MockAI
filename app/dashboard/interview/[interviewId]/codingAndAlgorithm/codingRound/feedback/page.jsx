"use client";

import { db } from "@/utils/db";
import { CodingInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import FormatCode from "../_component/FormatCode";

const page = ({ params }) => {
  const [interviewData, setInterviewData] = useState([]);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(CodingInterview)
      .where(eq(CodingInterview.mockId, params.interviewId));

    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    console.log(jsonMockResp.code_solution);
    setMockInterviewQuestion(jsonMockResp.code_solution);

    setInterviewData(result[0]);
  };
  return (
    <div className="pt-12">
      <h1 className="text-center text-2xl font-bold">FEEDBACK</h1>
      <div className="w-[50%]">
        <div>
          <strong>Title: </strong>
          {mockInterviewQuestion?.title}
        </div>
        <div className="mt-10 bg-slate-200 ">
          <strong>Code Solution: </strong>
          <FormatCode code={mockInterviewQuestion?.code} language="java" />
        </div>
        <div className="mt-10">
          <strong>Explanation: </strong>
          {mockInterviewQuestion?.explanation}
        </div>
      </div>
    </div>
  );
};

export default page;
