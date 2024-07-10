"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { CodingInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = ({ params }) => {
  const [interviewData, setInterviewData] = useState([]);
  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(CodingInterview)
      .where(eq(CodingInterview.mockId, params.interviewId));

    console.log(result);
    setInterviewData(result[0]);
  };
  return (
    <div>
      <div className=" m-2 h-[70vh] w-full ">
        <h1 className="text-center text-3xl font-bold">Instructions</h1>
        <div className="flex gap-8 mt-8">
          <div className="info">
            <div className="flex flex-col gap-12 p-4 rounded-lg border">
              <div className="flex flex-col gap-5 bg-gray-200 p-6 rounded-md">
                <h2 className="text-lg">
                  <strong>Job Role/Job Position: </strong>{" "}
                  {interviewData?.jobPosition}
                </h2>
                <h2 className="text-lg">
                  <strong>Programming Language: </strong>{" "}
                  {interviewData?.language}
                </h2>
                <h2 className="text-lg">
                  <strong>Years of Experience: </strong>
                  {interviewData?.jobExperience}
                </h2>
              </div>
              <div className="flex flex-col gap-5 bg-gray-300 p-6 rounded-md">
                <h2 className="">
                  <strong>Hints: </strong>
                  Question has a hint which you may use when you are stuck in
                  question
                </h2>
                <h2 className="">
                  <strong>Time Limit: </strong>
                  There will be a timer on the top right corner of the interface
                  showing the remaining duration
                </h2>
                <h2 className="">
                  <strong>*NOTE: </strong>
                  Below editor interface, check error button will show you any
                  possible error and Save button will save your code before
                  submission
                </h2>
              </div>
            </div>
          </div>
          <div className="image w-[40vw] h-[60vh] bg-slate-100 mt-4 rounded-lg border"></div>
        </div>
        <Link
          href={
            "/dashboard/interview/" + params.interviewId + "/codingRound/start"
          }
        >
          <Button className="mt-4">Start Assesment</Button>
        </Link>
      </div>
    </div>
  );
};

export default page;

// I need to create a coding problem for the mock interview. "Job position: Software Engineer, Years of Experience: 4" -  Based on this information generate a problem and its solution in Java language in this JSON structure - { "question": { "title": "", "difficulty": "", "description": "", "input_format": "", "output_format": "", "constraints": "", "sample_input": [ "", "" ], "sample_output": [ "", "" ], "explanation": "", "platform": "" }, "code_solution": { "title": "", "explanation": "", "code": "" } }
