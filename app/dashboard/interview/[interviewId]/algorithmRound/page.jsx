"use client";

import Loader from "@/app/dashboard/_components/Loader";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { db } from "@/utils/db";
import { AlgoInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import img from "@/app/Images/Algo.png";
import Image from "next/image";

const AlgorithmRound = ({ params }) => {
  const [interviewData, setInterviewData] = useState([]);
  const [loading, setLoading] = useState();

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

      setInterviewData(result[0]);
    } catch (error) {
      toast({
        description: "Please try again!!",
        action: <X className="text-red-600" />,
      });
    }

    setLoading(false);
  };
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="my-10 flex flex-col md:flex-row  gap-10">
          <div className="w-[50vw]">
            <h2 className="text-2xl font-bold text-gray-300">
              Let's Get Started!
            </h2>
            <div className="flex flex-col my-5 gap-5">
              <div className="flex flex-col gap-5 bg-gray-950 p-5 rounded-lg border border-gray-900 text-gray-400">
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
              <div className="p-5 border rounded-lg border-gray-800 bg-gray-900">
                <h2 className="flex gap-2 items-center text-gray-300">
                  <Lightbulb /> <strong>Information</strong>
                </h2>
                <h2 className="mt-3 text-gray-500">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Laborum odit ad quae sint illum ipsam perferendis aliquid a
                  ipsa corrupti! Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Nostrum dolore nobis recusandae corrupti
                  enim odit nisi esse voluptates quibusdam vitae.
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
          <div className="w-[60vw] h-[55vh] bg-slate-900 mt-12 -mr-8 content-center hidden md:flex">
            <Image src={img} className="w-full h-full" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AlgorithmRound;
