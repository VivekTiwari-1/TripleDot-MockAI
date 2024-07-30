"use client";

import { db } from "@/utils/db";
import { CodingFeedback } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import FormatCode from "../_component/FormatCode";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Loader from "@/app/dashboard/_components/Loader";

const page = ({ params }) => {
  const [correctAnswer, setCorrectAnswer] = useState();
  const [solutionFeedback, setSolutionFeedback] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(CodingFeedback)
      .where(eq(CodingFeedback.mockIdRef, params.interviewId))
      .orderBy(CodingFeedback.id);

    const jsonResp = result[result.length - 1];

    console.log(JSON.parse(jsonResp.correctAns));
    setSolutionFeedback(JSON.parse(jsonResp.feedback));
    setCorrectAnswer(JSON.parse(jsonResp.correctAns));
    setLoading(false);
  };
  return (
    <div className="pt-12">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div>
            <h2 className="text-3xl font-bold text-green-500 mb-6">
              Congratulations!{" "}
              <span className="text-black text-2xl">
                {" "}
                on completing this Challange
              </span>
            </h2>

            <div className="bg-gray-300 rounded-xl p-4">
              <h2 className="font-bold text-2xl">
                Here is your personalized feedback{" "}
              </h2>
              {solutionFeedback && (
                //console.log(JSON.parse(interview?.feedback).message)
                <div className="my-8">
                  <div className="mb-6">
                    {/* <h1 className="text-xl font-semibold mb-4">Message</h1> */}
                    <p>{solutionFeedback?.message}</p>
                  </div>

                  <h1 className="mb-4">
                    <span className="text-lg font-semibold ">
                      Correctness:{" "}
                    </span>
                    {solutionFeedback?.correctness}
                  </h1>

                  <h1 className="mb-4">
                    <span className="text-lg font-semibold ">Approach: </span>
                    {solutionFeedback?.approach}
                  </h1>

                  <h1 className="mb-4">
                    <span className="text-lg font-semibold ">Efficiency: </span>
                    {solutionFeedback?.efficiency}
                  </h1>
                  <h1 className="mb-4">
                    <span className="text-lg font-semibold ">
                      Code Quality:{" "}
                    </span>
                    {solutionFeedback?.code_quality}
                  </h1>
                  <h1 className="mb-4">
                    <span className="text-lg font-semibold ">
                      Optimization:{" "}
                    </span>
                    {solutionFeedback?.optimization}
                  </h1>
                  <h1 className="mb-4">
                    <span className="text-lg font-semibold ">
                      Overall Feedback:{" "}
                    </span>
                    {solutionFeedback?.overall_feedback}
                  </h1>
                </div>
              )}
            </div>
          </div>

          <div className="w-full bg-gray-300 rounded-xl mt-8 p-4 ">
            <h1 className="font-bold">Correct Solution: </h1>
            <div className="flex justify-between gap-6">
              <div className=" bg-gray-200 p-4 border-[16px] border-gray-300 rounded-xl">
                <FormatCode code={correctAnswer?.code} language="java" />
              </div>

              <div className="mt-2 flex flex-col gap-4">
                <div className="">
                  <span className="font-bold mr-2">Explanation: </span>
                  <span> {correctAnswer?.explanation}</span>
                </div>
                <div className="">
                  <span className="font-bold mr-2">Time Complexity: </span>
                  <span> {correctAnswer?.time_complexity}</span>
                </div>
                <div className="">
                  <span className="font-bold mr-2">Other Approach: </span>
                  <span> {correctAnswer?.other_approach}</span>
                </div>
              </div>
            </div>
          </div>
          <Link href={"/dashboard"}>
            <Button className="my-8">Go to Dashboard</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default page;
