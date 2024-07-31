"use client";

import Loader from "@/app/dashboard/_components/Loader";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { db } from "@/utils/db";
import { ObjectiveMock } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = ({ params }) => {
  const [interviewData, setInterviewData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    setLoading(true);
    try {
      const result = await db
        .select()
        .from(ObjectiveMock)
        .where(eq(ObjectiveMock.mockId, params.interviewId));

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
        <div className=" m-2 h-[70vh] w-full ">
          <h1 className="text-center text-3xl font-bold">Instructions</h1>
          <div className="flex gap-8 mt-8">
            <div className="info">
              <div className="flex flex-col gap-12 p-4 rounded-lg border border-gray-700">
                <div className="flex flex-col gap-5 bg-gray-900 text-gray-400 p-6 rounded-md">
                  <h2 className="text-lg">
                    <strong>Tech Stack: </strong> {interviewData?.techStack}
                  </h2>
                  <h2 className="text-lg">
                    <strong>Experience: </strong> {interviewData?.level}
                  </h2>
                </div>
                <div className="flex flex-col gap-5 bg-gray-900 text-gray-500 p-6 rounded-md">
                  <h2 className="">
                    <strong className="text-gray-400 flex">
                      <Lightbulb /> NOTE:{" "}
                    </strong>
                    <br />
                    It will contain 10 questions along with four options <br />
                    Select an option and press next to save it and move to next
                    Question <br />
                    At last question, you will get a preview of all questions{" "}
                    <br />
                    There will be a Timer of 5 minutes, if time gets over it
                    will automatically submit your answer
                  </h2>
                </div>
              </div>
            </div>
            <div className="image w-[40vw] h-[60vh] bg-slate-950 rounded-lg border border-gray-700"></div>
          </div>
          <div className="flex justify-end">
            <Link
              href={
                "/dashboard/interview/" +
                params.interviewId +
                "/objectiveTest/start"
              }
            >
              <Button className="mt-4 bg-gray-900">Start Assesment</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
