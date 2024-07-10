"use client";

import { db } from "@/utils/db";
import { AlgoInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";

const AlgoRoundList = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    user && getInterviewList();
  }, [user]);

  const getInterviewList = async () => {
    const result = await db
      .select()
      .from(AlgoInterview)
      .where(
        eq(AlgoInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
      )
      .orderBy(desc(AlgoInterview.id));

    // console.log(result);
    setInterviewList(result);
  };
  return (
    <div>
      <h2 className="font-medium text-2xl mt-24">Previous Algorithm Round</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {interviewList &&
          interviewList.map((interview, index) => (
            <InterviewItemCard
              interview={interview}
              key={index}
              type="algorithmRound"
            />
          ))}
      </div>
    </div>
  );
};

export default AlgoRoundList;
