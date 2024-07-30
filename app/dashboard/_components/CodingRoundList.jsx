"use client";

import { db } from "@/utils/db";
import { CodingInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
                <div className="border shadow-sm rounded-lg p-3 hover:shadow-xl hover:shadow-gray-600 ">
                  <h2 className="font-bold text-xl text-primary">
                    {interview?.jobPosition}
                  </h2>
                  <h2 className="font-sm text-gray-600 my-3">
                    Years of Experience: {interview?.jobExperience}
                  </h2>
                  <h2 className="text-xs text-gray-400">
                    Created At: {interview?.createdAt}
                  </h2>

                  <div className="flex justify-between mt-2 gap-4">
                    <Link
                      href={
                        "/dashboard/interview/" +
                        interview?.mockId +
                        "/codingRound/feedback"
                      }
                      className="w-full"
                    >
                      <Button size="sm" variant="outline" className="w-full">
                        Feedback
                      </Button>
                    </Link>
                    <Link
                      href={
                        "/dashboard/interview/" +
                        interview?.mockId +
                        "/codingRound"
                      }
                      className="w-full"
                    >
                      <Button size="sm" className="w-full">
                        Start
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodingRoundList;
