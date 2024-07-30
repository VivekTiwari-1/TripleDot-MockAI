"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { ObjectiveMock } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ObjectiveTestList = () => {
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
      .from(ObjectiveMock)
      .where(
        eq(ObjectiveMock.createdBy, user?.primaryEmailAddress?.emailAddress)
      )
      .orderBy(desc(ObjectiveMock.id));

    console.log(result);
    setInterviewList(result);
    setLoading(false);
  };
  return (
    <div>
      {loading ? (
        ""
      ) : (
        <div>
          <h2 className="font-medium text-2xl mt-24">
            Previous Objective Test
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-7">
            {interviewList &&
              interviewList.map((interview, index) => (
                <div className="border shadow-sm rounded-lg p-3 hover:shadow-xl hover:shadow-gray-400 ">
                  <h2 className="font-bold text-xl text-primary">
                    {interview?.techStack}
                  </h2>
                  <h2 className="font-sm text-gray-600 my-3">
                    <strong>Difficulty: </strong>
                    {interview?.level}
                  </h2>
                  <h2 className="text-xs text-gray-400">
                    Created At: {interview?.createdAt}
                  </h2>

                  <div className="flex justify-between mt-2 gap-4">
                    <Link
                      href={
                        "/dashboard/interview/" +
                        interview?.mockId +
                        "/ObjectiveTest/start"
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

export default ObjectiveTestList;
