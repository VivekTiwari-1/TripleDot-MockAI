"use client";

import Loader from "@/app/dashboard/_components/Loader";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { ObjectiveMock } from "@/utils/schema";
import { eq } from "drizzle-orm";
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
    const result = await db
      .select()
      .from(ObjectiveMock)
      .where(eq(ObjectiveMock.mockId, params.interviewId));

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
              <div className="flex flex-col gap-12 p-4 rounded-lg border">
                <div className="flex flex-col gap-5 bg-gray-200 p-6 rounded-md">
                  <h2 className="text-lg">
                    <strong>Tech Stack: </strong> {interviewData?.techStack}
                  </h2>
                  <h2 className="text-lg">
                    <strong>Experience: </strong> {interviewData?.level}
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
                    There will be a timer on the top right corner of the
                    interface showing the remaining duration
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
              "/dashboard/interview/" +
              params.interviewId +
              "/objectiveTest/start"
            }
          >
            <Button className="mt-4">Start Assesment</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default page;
