"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { ObjectiveFeedback, ObjectiveMock } from "@/utils/schema";
import { eq } from "drizzle-orm";
import Timer from "../../codingRound/_component/Timer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { toast } from "@/components/ui/use-toast";
import { CircleCheckBig } from "lucide-react";

const page = ({ params }) => {
  const [interviewData, setInterviewData] = useState([]);
  const [interviewInfo, setInterviewInfo] = useState();
  const [index, setIndex] = useState(0);
  const [option, setOption] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [ansArray, setAnsArray] = useState(new Array(10));

  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { user } = useUser();

  //let ansArray = new Array(10);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(ObjectiveMock)
      .where(eq(ObjectiveMock.mockId, params.interviewId));

    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    //console.log(JSON.parse(result[0].jsonMockResp));
    console.log(result[0]);

    setInterviewData(jsonMockResp);
    setInterviewInfo(result[0]);

    setLoading(false);
  };

  const HandleTimeUp = () => {}; //Complete this function

  const saveAnswer = (idx, opt) => {
    const newArray = [...ansArray];
    newArray[idx] = opt;
    // Update the state with the new array
    setAnsArray(newArray);

    if (index < 9) {
      setIndex((prev) => prev + 1);
    }
    setOption(0);
  };

  const handlePreview = (idx, opt) => {
    saveAnswer(idx, opt);
    setOpenDialog(true);
    //console.log(ansArray);
  };

  const handleSubmit = async () => {
    setLoading(true);

    const resp = await db.insert(ObjectiveFeedback).values({
      mockIdRef: interviewInfo?.mockId,
      jsonMockResp: interviewData,
      userAnswer: ansArray,
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

    setLoading(false);

    router.push(
      "/dashboard/interview/" +
        interviewInfo?.mockId +
        "/objectiveTest/feedback"
    );
  };

  //useEffect(() => {}, [interviewData]);
  return (
    <div className="bg-gray-50 my-8 py-16 px-12 rounded-xl shadow-xl">
      {interviewData && (
        <div className="">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <h1 className="w-[7vw] text-xl font-semibold flex items-end">
                <span className="text-5xl font-extrabold">
                  {index && index < 9 ? (
                    <h2>0{index + 1}</h2>
                  ) : (
                    <h2>{index + 1}</h2>
                  )}{" "}
                </span>
                <span className="opacity-70"> / 10</span>
              </h1>
              <p className="bg-black w-[2px] h-12"></p>
              <p className="w-[50vw]">{interviewData[index]?.question}</p>
            </div>
            <div className="w-[10%]">
              <Timer
                initialMinutes={5}
                initialSeconds={0}
                onTimeUp={HandleTimeUp}
              />
            </div>
          </div>
          <div className="flex flex-col mt-10">
            <div
              onClick={() => setOption(1)}
              className="w-[90%] h-[13vh] rounded-lg flex items-center gap-7 px-4 hover:shadow-lg cursor-pointer"
            >
              <div className="h-12 w-20 border border-blue-300 rounded-md flex items-center justify-center gap-2">
                <h2
                  className={`w-4 h-4 rounded-full border-2 border-blue-500 ${
                    option && option == 1 ? "bg-blue-300" : ""
                  }`}
                ></h2>
                <p className="text-blue-500 text-lg">A</p>
              </div>
              <p
                className={`w-[80%]${
                  option && option == 1 ? "opacity-100" : " opacity-80 "
                }`}
              >
                {interviewData[index]?.options[0]}
              </p>
            </div>

            <div
              onClick={() => setOption(2)}
              className="w-[85%] h-[13vh] rounded-lg flex items-center gap-7 px-4 hover:shadow-lg cursor-pointer"
            >
              <div className="h-12 w-20 border border-blue-300 rounded-md flex items-center justify-center gap-2">
                <h2
                  className={`w-4 h-4 rounded-full border-2 border-blue-500 ${
                    option && option == 2 ? "bg-blue-300" : ""
                  }`}
                ></h2>
                <p className="text-blue-500 text-lg">B</p>
              </div>
              <p
                className={`m-0${
                  option && option == 2 ? "opacity-100" : " opacity-80 "
                }`}
              >
                {interviewData[index]?.options[1]}
              </p>
            </div>

            <div
              onClick={() => setOption(3)}
              className="w-[85%] h-[13vh] rounded-lg flex items-center gap-7 px-4 hover:shadow-lg cursor-pointer"
            >
              <div className="h-12 w-20 border border-blue-300 rounded-md flex items-center justify-center gap-2">
                <h2
                  className={`w-4 h-4 rounded-full border-2 border-blue-500 ${
                    option && option == 3 ? "bg-blue-300" : ""
                  }`}
                ></h2>
                <p className="text-blue-500 text-lg">C</p>
              </div>
              <p
                className={`m-0${
                  option && option == 3 ? "opacity-100" : " opacity-80 "
                }`}
              >
                {interviewData[index]?.options[2]}
              </p>
            </div>

            <div
              onClick={() => setOption(4)}
              className="w-[85%] h-[13vh] rounded-lg flex items-center gap-7 px-4 hover:shadow-lg cursor-pointer"
            >
              <div className="h-12 w-20 border border-blue-300 rounded-md flex items-center justify-center gap-2">
                <h2
                  className={`w-4 h-4 rounded-full border-2 border-blue-500 ${
                    option && option == 4 ? "bg-blue-300" : ""
                  }`}
                ></h2>
                <p className="text-blue-500 text-lg">D</p>
              </div>
              <p
                className={`m-0${
                  option && option == 4 ? "opacity-100" : " opacity-80 "
                }`}
              >
                {interviewData[index]?.options[3]}
              </p>
            </div>

            <div className="flex gap-2 w-full justify-end">
              {index && index > 0 ? (
                <Button
                  onClick={() => {
                    setIndex((prev) => prev - 1);
                    setOption(0);
                  }}
                >
                  Prev Question
                </Button>
              ) : (
                ""
              )}
              {index && index + 1 == interviewData?.length ? (
                <Button
                  onClick={() => {
                    handlePreview(index, option);
                  }}
                >
                  Preview
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    saveAnswer(index, option);
                  }}
                >
                  Next Question
                </Button>
              )}
            </div>
          </div>

          <Dialog open={openDialog}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                {" "}
                <div className="flex gap-8">
                  <div className="grid grid-cols-5 w-[55%] gap-4">
                    {ansArray.map((ans, idx) => (
                      //<div key={idx}>{`Answer ${idx + 1}: ${ans}`}</div>
                      <div>
                        {ans == 0 ? (
                          <div className="h-12 w-12 border-2 border-red-600 rounded-md text-red-600 text-xl flex justify-center items-center">
                            {idx + 1}
                          </div>
                        ) : (
                          <div className="h-12 w-12 border-2 border-green-600 rounded-md text-green-600 text-xl flex justify-center items-center">
                            {idx + 1}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    You have attemped 7 out of 10 questions.
                  </div>
                </div>
                <div className="flex justify-between pt-8">
                  <div className="flex gap-4">
                    <div className="flex gap-2">
                      <div className="h-7 w-7 border-2 border-green-500 rounded-md"></div>
                      <h2>Attempted</h2>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-7 w-7 border-2 border-red-500 rounded-md"></div>
                      <h2>Unattempted</h2>
                    </div>
                  </div>
                  <div className="flex justify-end gap-4">
                    <Button onClick={() => setOpenDialog(false)}>
                      Go back
                    </Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                  </div>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default page;
