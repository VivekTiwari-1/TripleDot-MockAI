"use client";

import Loader from "@/app/dashboard/_components/Loader";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

const Interview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    setInterviewData(result[0]);
    setLoading(false);
  };
  return (
    <div className="my-10 ">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h2 className="font-bold text-2xl">Let's get Started</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col my-5 gap-5">
              <div className="flex flex-col gap-5 p-5 rounded-lg border">
                <h2 className="text-lg">
                  <strong>Job Role/Job Position:</strong>{" "}
                  {interviewData?.jobPosition}
                </h2>
                <h2 className="text-lg">
                  <strong>Job Description/Tech Stack:</strong>{" "}
                  {interviewData?.jobDesc}
                </h2>
                <h2 className="text-lg">
                  <strong>Years of Experience:</strong>{" "}
                  {interviewData?.jobExperience}
                </h2>
              </div>
              <div className="p-5 border rounded-lg border-gray-400 bg-gray-100">
                <h2 className="flex gap-2 items-center">
                  <Lightbulb /> <strong>Information</strong>
                </h2>
                <h2 className="mt-3 text-gray-400">
                  Enable your WebCam and Microphone to start your AI Generated
                  Mock Interview. It has 5 question which you can answer and at
                  rhe last you will get the report on the basis of your answer.{" "}
                  <br />
                  <br /> NOTE: We never record your video, you can disable
                  webcam access any time.
                </h2>
              </div>
            </div>

            <div>
              {webCamEnabled ? (
                <div className="bg-gray-700 py-4 rounded-xl">
                  <Webcam
                    onUserMedia={() => setWebCamEnabled(true)}
                    onUserMediaError={() => setWebCamEnabled(false)}
                    mirrored={true}
                    style={{ height: 350, width: "100%" }}
                    className="w-full"
                  />
                </div>
              ) : (
                <div className="flex flex-col justify-center">
                  <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
                  <Button
                    variant="ghost"
                    onClick={() => setWebCamEnabled(true)}
                    className="bg-gray-200 mb-6 md:mb-0"
                  >
                    Enable WebCam and Microphone
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end items-end">
            <Link
              href={
                "/dashboard/interview/" +
                params.interviewId +
                "/technicalRound/start"
              }
            >
              <Button>Start Interview</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Interview;
