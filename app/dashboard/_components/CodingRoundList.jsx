"use client";

import { db } from "@/utils/db";
import { CodingInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";

const CodingRoundList = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    user && getInterviewList();
  }, [user]);

  const getInterviewList = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(CodingInterview)
      .where(
        eq(CodingInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
      )
      .orderBy(desc(CodingInterview.id));

    // console.log(result);
    setInterviewList(result);
    setLoading(false);
  };
  return (
    <div>
      {loading ? (
        ""
      ) : (
        <div>
          <h2 className="font-medium text-2xl mt-24">Previous Coding Round</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-7">
            {interviewList &&
              interviewList.map((interview, index) => (
                <InterviewItemCard
                  interview={interview}
                  key={index}
                  type="codingRound"
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodingRoundList;
