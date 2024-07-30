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
    <div className="my-10 flex flex-col md:flex-row justify-between gap-10">
      <div>
        <h2 className="text-2xl font-bold text-gray-300">Let's Get Started!</h2>
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col gap-5 bg-gray-900 p-5 rounded-lg border border-gray-700 text-gray-400">
            <h2 className="text-lg">
              <strong>Job Role/Job Position: </strong>{" "}
              {interviewData.jobPosition}
            </h2>
            <h2 className="text-lg">
              <strong>Tech Stack: </strong> {interviewData.language}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience: </strong>
              {interviewData.jobExperience}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-gray-600 bg-gray-800">
            <h2 className="flex gap-2 items-center text-gray-300">
              <Lightbulb /> <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-gray-500">
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
            <Button className="bg-gray-900">Start Interview</Button>
          </Link>
        </div>
      </div>
      <div className="w-full ml-36 content-center hidden md:flex">
        <div className="bg-slate-900 w-full h-[52vh] mt-12"></div>
      </div>
    </div>
  );
};

export default AlgorithmRound;
