"use client";

import React, { useEffect, useState } from "react";

import { db } from "@/utils/db";
import { CodingFeedback, CodingInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { chatSession } from "@/utils/GeminiAIModel";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { toast } from "@/components/ui/use-toast";
import { CircleCheckBig, Lightbulb, X } from "lucide-react";
import { useRouter } from "next/navigation";
import CodeEditor from "../../_components/CodeEditor";
import Timer from "../_component/Timer";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Loader from "@/app/dashboard/_components/Loader";

const page = ({ params }) => {
  const [language, setLanguage] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [mockInterviewAnswer, setMockInterviewAnswer] = useState();
  const [userSolution, setUserSolution] = useState();

  const [loading, setLoading] = useState(true);

  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    setLoading(true);
    try {
      const result = await db
        .select()
        .from(CodingInterview)
        .where(eq(CodingInterview.mockId, params.interviewId));

      const jsonMockResp = JSON.parse(result[0].jsonMockResp);
      //console.log(jsonMockResp.question);
      setMockInterviewQuestion(jsonMockResp.question);
      setMockInterviewAnswer(jsonMockResp.code_solution);
      setLanguage(result[0].language);
    } catch (error) {
      toast({
        description: "Please try again!!",
        action: <X className="text-red-600" />,
      });
    }

    setLoading(false);
  };

  const handleValueChange = (value) => {
    //Recieving data from a child component Code Editor
    setUserSolution(value);
  };

  const HandleTimeUp = (value) => {
    //Recieving data from a child component Timer
    if (value) {
      updateUserAnswer();
    }
  };

  const updateUserAnswer = async () => {
    setLoading(true);

    try {
      const feedbackPrompt = `"This is a coding question - " Title: ${mockInterviewQuestion?.title} Description: ${mockInterviewQuestion?.description} Sample Input: ${mockInterviewQuestion?.sample_input[0]} Sample Output: ${mockInterviewQuestion?.sample_output[0]} " and this is the solution that I have solved - " ${userSolution} " - Based on this answer, please provide me feedback in JSON format without any extra space in between with these fields - message, correctness, approach, efficiency, code_quality, optimization, overall_feedback
"`;

      const result = await chatSession.sendMessage(feedbackPrompt);

      const mockJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");

      const jsonMockResp = JSON.parse(mockJsonResp);
      //console.log(jsonMockResp);

      const resp = await db.insert(CodingFeedback).values({
        mockIdRef: params.interviewId,
        question: mockInterviewQuestion,
        correctAns: mockInterviewAnswer,
        userAns: userSolution,
        feedback: jsonMockResp,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-YYYY"),
      });

      console.log(resp);
      if (resp) {
        toast({
          description: "User answer recorded successfully!!",
          action: <CircleCheckBig className="text-green-600" />,
        });
      }

      setTimeout(() => {
        router.push(
          "/dashboard/interview/" + params.interviewId + "/codingRound/feedback"
        );
      }, 1000);
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
        <div className="-mx-36 bg-gray-950 text-white">
          <div className="flex justify-between gap-8">
            <div className="m-1 max-w-[45vw] pr-4 pt-8 pl-12">
              <h1 className=" text-xl font-semibold">
                {mockInterviewQuestion?.title}
              </h1>
              <div className="mt-4 text-sm flex items-center gap-16">
                <h3 className=" text-gray-500">
                  <strong>Level: </strong>
                  {mockInterviewQuestion?.difficulty}
                </h3>
                <div className="flex ">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="flex bg-gray-900 text-gray-500">
                        <Lightbulb className="h-4" />
                        Hint
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64 bg-gray-800 border-gray-500 text-gray-400">
                      <DropdownMenuLabel>
                        {mockInterviewQuestion?.hint}
                      </DropdownMenuLabel>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <p className="h-[1px] bg-gray-600 my-5"></p>
              <div className="text-gray-400">
                <div className="">
                  {/* <h1 className="text-xl font-semibold">Description</h1> */}
                  <p className="">{mockInterviewQuestion?.description}</p>
                </div>
                <div className=""></div>
                <div className="mt-8 ">
                  <strong>Input Format</strong>
                  <p className="">{mockInterviewQuestion?.input_format}</p>
                </div>
                <div className="mt-8 ">
                  <strong>Output Format</strong>
                  <p className="">{mockInterviewQuestion?.output_format}</p>
                </div>

                <div className="mt-8">
                  <h1 className="text-lg font-semibold mb-4 ">Examples</h1>
                  <div className="bg-gray-900 border border-gray-700 rounded-md p-3">
                    <p className="">
                      <strong>Input: </strong>
                      {mockInterviewQuestion?.sample_input[0]}
                    </p>
                    <p className="">
                      <strong>Output: </strong>
                      {mockInterviewQuestion?.sample_output[0]}
                    </p>
                  </div>
                  <div className="mt-8 bg-gray-900 border border-gray-700 rounded-md p-3">
                    <p className="">
                      <strong>Input: </strong>
                      {mockInterviewQuestion?.sample_input[1]}
                    </p>
                    <p className="">
                      <strong>Output: </strong>
                      {mockInterviewQuestion?.sample_output[1]}
                    </p>
                  </div>
                </div>
                <div className="mt-8 ">
                  <h1 className="text-lg font-semibold">Constraints</h1>
                  <p className="">{mockInterviewQuestion?.constraints}</p>
                </div>
                <p className="mt-8">
                  {" "}
                  <span className="font-medium">Platform:</span>{" "}
                  {mockInterviewQuestion?.platform}
                </p>
              </div>
            </div>
            <div className=" right-2 bg-gray-900 px-8 pt-2 pb-8">
              <div className="flex justify-between mb-2">
                <h1 className="border border-gray-600 rounded-lg px-4 h-6  text-gray-500">
                  {language?.toLowerCase()}
                </h1>
                <h1>
                  <Timer
                    initialMinutes={20}
                    initialSeconds={0}
                    onTimeUp={HandleTimeUp}
                  />
                </h1>
              </div>
              <div className="">
                {language && (
                  <CodeEditor
                    onValueChange={handleValueChange}
                    language={language.toLowerCase()}
                  />
                )}
              </div>
              {userSolution && (
                <div className="-mt-16 ">
                  <Button
                    className="mt-4 bg-gray-950"
                    onClick={updateUserAnswer}
                  >
                    Submit Code
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
