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

            <div className="bg-gray-900 rounded-xl p-4">
              <h2 className="font-bold text-2xl text-gray-300">
                Here is your personalized feedback{" "}
              </h2>
              {solutionFeedback && (
                //console.log(JSON.parse(interview?.feedback).message)
                <div className="my-8 text-gray-400">
                  <div className="mb-6">
                    {/* <h1 className="text-xl font-semibold mb-4">Message</h1> */}
                    <p>{solutionFeedback?.message}</p>
                  </div>

                  <h1 className="mb-4">
                    <span className="text-lg font-semibold text-gray-300">
                      Correctness:{" "}
                    </span>
                    {solutionFeedback?.correctness}
                  </h1>

                  <h1 className="mb-4">
                    <span className="text-lg font-semibold text-gray-300">
                      Approach:{" "}
                    </span>
                    {solutionFeedback?.approach}
                  </h1>

                  <h1 className="mb-4">
                    <span className="text-lg font-semibold text-gray-300">
                      Efficiency:{" "}
                    </span>
                    {solutionFeedback?.efficiency}
                  </h1>
                  <h1 className="mb-4">
                    <span className="text-lg font-semibold text-gray-300">
                      Code Quality:{" "}
                    </span>
                    {solutionFeedback?.code_quality}
                  </h1>
                  <h1 className="mb-4">
                    <span className="text-lg font-semibold text-gray-300">
                      Optimization:{" "}
                    </span>
                    {solutionFeedback?.optimization}
                  </h1>
                  <h1 className="mb-4">
                    <span className="text-lg font-semibold text-gray-300">
                      Overall Feedback:{" "}
                    </span>
                    {solutionFeedback?.overall_feedback}
                  </h1>
                </div>
              )}
            </div>
          </div>

          <div className="w-full bg-gray-900 rounded-xl mt-8 p-4 ">
            <h1 className="font-bold mb-4">Correct Solution: </h1>
            <div className="flex justify-between gap-6">
              <div className=" bg-gray-950 p-4 border-[8px] border-gray-800 rounded-xl">
                <FormatCode code={correctAnswer?.code} language="java" />
              </div>

              <div className="mt-2 flex flex-col gap-4 text-gray-400">
                <div className="">
                  <span className="font-bold mr-2 text-gray-300">
                    Explanation:{" "}
                  </span>
                  <span> {correctAnswer?.explanation}</span>
                </div>
                <div className="">
                  <span className="font-bold mr-2 text-gray-300">
                    Time Complexity:{" "}
                  </span>
                  <span> {correctAnswer?.time_complexity}</span>
                </div>
                <div className="">
                  <span className="font-bold mr-2 text-gray-300">
                    Other Approach:{" "}
                  </span>
                  <span> {correctAnswer?.other_approach}</span>
                </div>
              </div>
            </div>
          </div>
          <Link href={"/dashboard"}>
            <Button className="my-8 bg-gray-800">Go to Dashboard</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default page;
