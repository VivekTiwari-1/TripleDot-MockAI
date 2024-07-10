"use client";

import { db } from "@/utils/db";
import { CodingFeedback } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import FormatCode from "../_component/FormatCode";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const page = ({ params }) => {
  const [correctAnswer, setCorrectAnswer] = useState();
  const [solutionFeedback, setSolutionFeedback] = useState();

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(CodingFeedback)
      .where(eq(CodingFeedback.mockIdRef, params.interviewId))
      .orderBy(CodingFeedback.id);

    const jsonResp = result[result.length - 1];

    console.log(JSON.parse(jsonResp.feedback));
    setSolutionFeedback(JSON.parse(jsonResp.feedback));
    setCorrectAnswer(JSON.parse(jsonResp.correctAns));
  };
  return (
    <div className="pt-12">
      <h1 className="text-center text-2xl font-bold">SOLUTION</h1>
      <div className="w-[50%]">
        <div>
          <strong>Title: </strong>
          {correctAnswer?.title}
        </div>
        <div className="mt-10 bg-slate-200 ">
          <strong>Correct Solution: </strong>
          <FormatCode code={correctAnswer?.code} language="java" />
        </div>
        <div className="mt-10">
          <strong>Explanation: </strong>
          {correctAnswer?.explanation}
        </div>
      </div>
      <div className="">
        <h1 className="text-center text-2xl font-bold my-8">FEEDBACK</h1>

        {solutionFeedback && (
          //console.log(JSON.parse(interview?.feedback).message)
          <div className="my-8">
            <div className="mb-6">
              <h1 className="text-xl font-semibold mb-4">Message</h1>
              <p>{solutionFeedback?.message}</p>
            </div>
            <div className="mb-6">
              <h1 className="text-xl font-semibold mb-4">Correctness</h1>
              <p>{solutionFeedback?.correctness}</p>
            </div>
            <div className="mb-6">
              <h1 className="text-xl font-semibold mb-4">Approach</h1>
              <p>{solutionFeedback?.approach}</p>
            </div>
            <div className="mb-6">
              <h1 className="text-xl font-semibold mb-4">Efficiency</h1>
              <p>{solutionFeedback?.efficiency}</p>
            </div>
            <div className="mb-6">
              <h1 className="text-xl font-semibold mb-4">Code Quality</h1>
              <p>{solutionFeedback?.code_quality}</p>
            </div>
            <div className="mb-6">
              <h1 className="text-xl font-semibold mb-4">Optimization</h1>
              <p>{solutionFeedback?.optimization}</p>
            </div>
            <div className="mb-20">
              <h1 className="text-xl font-semibold mb-4">Overall Feedback</h1>
              <p>{solutionFeedback?.overall_feedback}</p>
            </div>
          </div>
        )}
      </div>
      <Link href={"/dashboard"}>
        <Button className="my-8">Go to Dashboard</Button>
      </Link>
    </div>
  );
};

export default page;
