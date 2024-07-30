"use client";

import Loader from "@/app/dashboard/_components/Loader";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { CodingInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import img from "@/app/Images/coding_interface.png";

const page = ({ params }) => {
  const [interviewData, setInterviewData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(CodingInterview)
      .where(eq(CodingInterview.mockId, params.interviewId));

    console.log(result);
    setInterviewData(result[0]);

    setLoading(false);
  };
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className=" m-2 h-[70vh] w-full ">
          <h1 className="text-center text-3xl font-bold">Instructions</h1>
          <div className="flex gap-8 mt-8">
            <div className="info">
              <div className="flex flex-col gap-12 p-4 rounded-lg border border-gray-700">
                <div className="flex flex-col gap-5 bg-gray-900 text-gray-400 p-6 rounded-md">
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
                <div className="flex flex-col gap-5 bg-gray-900 text-gray-500 p-6 rounded-md">
                  <h2 className="">
                    <strong className="text-gray-400">Hints: </strong>
                    It contains a hint which you may use when you are stuck in
                    question
                  </h2>
                  <h2 className="">
                    <strong className="text-gray-400">Time Limit: </strong>
                    There will be a timer on the top right corner of the
                    interface showing the remaining duration
                  </h2>
                  <h2 className="">
                    <strong className="text-gray-400">*NOTE: </strong>
                    Below editor interface, check error button will show you any
                    possible error and Save button will save your code before
                    submission
                  </h2>
                </div>
              </div>
            </div>
            <div className="image w-[45vw] h-[60vh] bg-slate-900 mt-4 pt-5 px-2 rounded-lg border border-gray-700">
              <Image src={img} className="object-cover" />
            </div>
          </div>
          <div className="flex justify-end">
            <Link
              href={
                "/dashboard/interview/" +
                params.interviewId +
                "/codingRound/start"
              }
            >
              <Button className="mt-4 bg-slate-900">Start Assesment</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;

// I need to create a coding problem for the mock interview. "Job position: Software Engineer, Years of Experience: 4" -  Based on this information generate a problem and its solution in Java language in this JSON structure - { "question": { "title": "", "difficulty": "", "description": "", "input_format": "", "output_format": "", "constraints": "", "sample_input": [ "", "" ], "sample_output": [ "", "" ], "explanation": "", "platform": "" }, "code_solution": { "title": "", "explanation": "", "code": "" } }
