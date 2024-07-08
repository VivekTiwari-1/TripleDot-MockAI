"use client";

import React, { useEffect, useState } from "react";
import CodeEditor from "../../_components/CodeEditor";
import { db } from "@/utils/db";
import { CodingInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = ({ params }) => {
  const [interviewData, setInterviewData] = useState([]);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(CodingInterview)
      .where(eq(CodingInterview.mockId, params.interviewId));

    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    console.log(jsonMockResp.question);
    setMockInterviewQuestion(jsonMockResp.question);

    setInterviewData(result[0]);
  };
  return (
    <div className="-mx-16">
      <div className="flex justify-between gap-8 mt-12">
        <div className="m-1 max-w-[45vw] pr-8">
          <h1 className="mt-4 text-2xl font-semibold">
            {mockInterviewQuestion?.title}
          </h1>
          <h3 className="mt-8">
            <strong>Level: </strong>
            {mockInterviewQuestion?.difficulty}
          </h3>
          <div className="mt-8 ">
            <h1 className="text-xl font-semibold">Description</h1>
            <p className="">{mockInterviewQuestion?.description}</p>
          </div>
          <div className="mt-8 ">
            <h1 className="text-xl font-semibold">Input Format</h1>
            <p className="">{mockInterviewQuestion?.input_format}</p>
          </div>
          <div className="mt-8 ">
            <h1 className="text-xl font-semibold">Output Format</h1>
            <p className="">{mockInterviewQuestion?.output_format}</p>
          </div>
          <div className="mt-8 ">
            <h1 className="text-xl font-semibold">Constraints</h1>
            <p className="">{mockInterviewQuestion?.constraints}</p>
          </div>
          <div className="mt-8 ">
            <h1 className="text-xl font-semibold">Sample Input</h1>
            <p className="">
              <strong>Input: </strong>
              {mockInterviewQuestion?.sample_input[0]}
            </p>
            <p className="">
              <strong>Output: </strong>
              {mockInterviewQuestion?.sample_output[0]}
            </p>
          </div>
          <div className="mt-8 ">
            <h1 className="text-xl font-semibold">Sample Input</h1>
            <p className="">
              <strong>Input: </strong>
              {mockInterviewQuestion?.sample_input[1]}
            </p>
            <p className="">
              <strong>Output: </strong>
              {mockInterviewQuestion?.sample_output[1]}
            </p>
          </div>
          <p className="mt-8">
            {" "}
            <span className="font-medium">Platform:</span>{" "}
            {mockInterviewQuestion?.platform}
          </p>
          <p className="mt-8">
            {" "}
            <span className="font-medium">Hint:</span>{" "}
            {mockInterviewQuestion?.hint}
          </p>
        </div>
        <div className="m-1 fixed right-8">
          <CodeEditor />
          <div className="">
            <Link
              href={
                "/dashboard/interview/" +
                params.interviewId +
                "/codingAndAlgorithm/codingRound/feedback"
              }
            >
              <Button>Submit Code</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

// ---------------- SAMPLE QUESTION --------------------

// constraints
// :
// "1 <= n <= 10^5\n-10^9 <= arr[i] <= 10^9"
// description
// :
// "Given an unsorted array of integers, find the length of the longest consecutive sequence. For example, given the array [100, 4, 200, 1, 3, 2], the longest consecutive sequence is [1, 2, 3, 4], so return its length, 4."
// difficulty
// :
// "Medium"
// explanation
// :
// "For the first sample input, the longest consecutive sequence is [1, 2, 3, 4], so return its length, 4. For the second sample input, the longest consecutive sequence is [0, 2, 3, 5, 7], so return its length, 4."
// input_format
// :
// "The first line contains an integer n, the size of the array. The second line contains n space-separated integers representing the elements of the array."
// output_format
// :
// "Print the length of the longest consecutive sequence."
// platform
// :
// "LeetCode"
// sample_input
// :
// (2) ['6\n100 4 200 1 3 2', '5\n0 3 7 2 5']
// sample_output
// :
// (2) ['4', '4']
// title
// :
// "Longest Consecutive Sequence"
