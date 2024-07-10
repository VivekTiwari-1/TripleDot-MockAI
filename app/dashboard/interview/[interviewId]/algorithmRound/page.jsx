"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { AlgoInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const AlgorithmRound = ({ params }) => {
  const [interviewData, setInterviewData] = useState([]);
  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(AlgoInterview)
      .where(eq(AlgoInterview.mockId, params.interviewId));

    setInterviewData(result[0]);
  };
  return (
    <div className="my-10 flex justify-between gap-10">
      <div>
        <h2 className="text-2xl font-bold">Let's Get Started!</h2>
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col gap-5 p-5 rounded-lg border">
            <h2 className="text-lg">
              <strong>Job Role/Job Position: </strong>{" "}
              {interviewData.jobPosition}
            </h2>
            <h2 className="text-lg">
              <strong>Programming Language: </strong> {interviewData.language}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience: </strong>
              {interviewData.jobExperience}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-gray-400 bg-gray-100">
            <h2 className="flex gap-2 items-center">
              <Lightbulb /> <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-gray-400">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum
              odit ad quae sint illum ipsam perferendis aliquid a ipsa corrupti!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              dolore nobis recusandae corrupti enim odit nisi esse voluptates
              quibusdam vitae.
            </h2>
          </div>
          <Link
            href={
              "/dashboard/interview/" +
              params.interviewId +
              "/algorithmRound/start"
            }
          >
            <Button>Start Interview</Button>
          </Link>
        </div>
      </div>
      <div className="w-[60vw] ml-36 content-center">
        <div className="bg-slate-200 w-[70%] h-[60vh]"></div>
      </div>
    </div>
  );
};

export default AlgorithmRound;
