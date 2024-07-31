"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { db } from "@/utils/db";
import { ObjectiveMock } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import { X } from "lucide-react";
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

    try {
      const result = await db
        .select()
        .from(ObjectiveMock)
        .where(
          eq(ObjectiveMock.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
        .orderBy(desc(ObjectiveMock.id));

      setInterviewList(result);
    } catch (error) {
      toast({
        description: "Unable to load content!!",
        action: <X className="text-red-600" />,
      });
    }

    setLoading(false);
  };
  return (
    <div>
      {loading ? (
        ""
      ) : (
        <div>
          <h2 className="text-gray-300 font-medium text-2xl mt-24">
            Previous Objective Test
          </h2>

          <div className="bg-slate-900 rounded-2xl p-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-7">
            {interviewList &&
              interviewList.map((interview, index) => (
                <div className="bg-gray-950 border border-gray-700 shadow-sm rounded-lg p-3 hover:shadow-lg hover:shadow-gray-600">
                  <h2 className="font-bold text-xl text-gray-400">
                    {interview?.techStack}
                  </h2>
                  <h2 className="font-sm text-gray-500 my-3">
                    <strong>Difficulty: </strong>
                    {interview?.level}
                  </h2>
                  <h2 className="text-xs text-gray-500">
                    Created At: {interview?.createdAt}
                  </h2>

                  <div className="flex justify-between mt-2 gap-4">
                    <Link
                      href={
                        "/dashboard/interview/" +
                        interview?.mockId +
                        "/objectiveTest"
                      }
                      className="w-full"
                    >
                      <Button
                        size="sm"
                        className="w-full bg-gray-900 text-gray-400"
                      >
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
