"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { ObjectiveFeedback, ObjectiveMock } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loader from "@/app/dashboard/_components/Loader";

const page = ({ params }) => {
  const [interviewData, setInterviewData] = useState([]);
  const [userAnswer, setUserAnswer] = useState();
  const [index, setIndex] = useState(0);
  const [option, setOption] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [ansArray, setAnsArray] = useState(new Array(10));

  const [loading, setLoading] = useState(true);

  const router = useRouter();

  //let ansArray = new Array(10);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    setLoading(true);
    const question = await db
      .select()
      .from(ObjectiveMock)
      .where(eq(ObjectiveMock.mockId, params.interviewId));

    const answer = await db
      .select()
      .from(ObjectiveFeedback)
      .where(eq(ObjectiveFeedback.mockIdRef, params.interviewId));

    const jsonMockResp = JSON.parse(question[0].jsonMockResp);
    //console.log(answer[0]);

    setInterviewData(jsonMockResp);
    setUserAnswer(answer[0].userAnswer);

    setLoading(false);
  };

  return (
    <div>
      <h1 className="font-semibold text-3xl mt-6 text-gray-300">
        Your Response
      </h1>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="bg-gray-900 flex flex-col gap-4 my-6 p-8 rounded-lg">
            {interviewData &&
              interviewData.map((item, index) => (
                <div className="bg-gray-950 text-gray-400 flex flex-col gap-1 px-7 py-4 rounded-md">
                  <div className="font-semibold ">
                    <span className="font-bold mr-2">Q.{index + 1}</span>
                    {item?.question}
                  </div>
                  <div>
                    <span className="font-semibold mr-2">Your answer:</span>
                    {item?.options[userAnswer[index] - 1]
                      ? item?.options[userAnswer[index] - 1]
                      : "Not Attempted"}
                  </div>
                  <div>
                    <span className="font-semibold mr-2">Correct answer:</span>
                    {item?.answer}
                  </div>
                </div>
              ))}
          </div>
          <div className="flex justify-between mb-7">
            <Link href="/dashboard">
              <Button className="bg-gray-900 text-gray-300">Go Home</Button>
            </Link>
            <Link
              href={
                "/dashboard/interview/" + params.interviewId + "/objectiveTest"
              }
            >
              <Button className="bg-gray-900 text-gray-300">Re-attempt</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
