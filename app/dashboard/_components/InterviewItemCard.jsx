import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const InterviewItemCard = ({ interview, type }) => {
  return (
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
            "/" +
            type +
            "/feedback"
          }
          className="w-full"
        >
          <Button size="sm" variant="outline" className="w-full">
            Feedback
          </Button>
        </Link>
        <Link
          href={"/dashboard/interview/" + interview?.mockId + "/" + type}
          className="w-full"
        >
          <Button size="sm" className="w-full">
            Start
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default InterviewItemCard;
