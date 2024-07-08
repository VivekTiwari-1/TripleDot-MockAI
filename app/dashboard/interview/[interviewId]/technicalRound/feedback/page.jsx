"use client";

import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Feedback = ({ params }) => {
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    setFeedbackList(result);
    console.log(result);
  };
  return (
    <div className="p-10">
      {feedbackList?.length == 0 ? (
        <h2 className="text-xl my-8">
          Sorry! Currently we do not have any feedback for you!!
        </h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500">
            Congratulations!
          </h2>
          <h2 className="font-bold text-2xl">Here is your feedback</h2>
          <h2 className="text-primary text-lg my-3">
            Your overall rating: <strong>7/10</strong>
          </h2>

          <h2 className="text-sm text-gray-500">
            Find below interview question with correct answer, your answer and
            feedback for improvement
          </h2>

          {feedbackList &&
            feedbackList.map((item, index) => (
              <Collapsible key={index} className="mt-4">
                <CollapsibleTrigger className="p-2 bg-secondary rounded my-2 flex justify-between w-full">
                  {index + 1 + ") "}
                  {item.question} <ChevronsUpDown className="h-5 w-5 ml-4" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-gray-600 p-2 border rounded-lg">
                      <strong>Rating: </strong>
                      {item.rating}
                    </h2>
                    <h2 className="text-gray-600 p-2 border rounded-lg bg-gray-100 text-sm">
                      <strong>Your answer: </strong>
                      {item.userAns}
                    </h2>
                    <h2 className="text-gray-600 p-2 border rounded-lg bg-gray-100 text-sm">
                      <strong>Correct answer: </strong>
                      {item.correctAns}
                    </h2>
                    <h2 className="text-gray-600 p-2 border rounded-lg bg-gray-100 text-sm">
                      <strong>Feedback: </strong>
                      {item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </>
      )}
      <Button onClick={() => router.replace("/dashboard")}>Go Home</Button>
    </div>
  );
};

export default Feedback;
