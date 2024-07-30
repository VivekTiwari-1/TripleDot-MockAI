import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const InterviewItemCard = ({ interview }) => {
  return (
    <div className="bg-gray-950 border border-gray-700 shadow-sm rounded-lg p-3 hover:shadow-lg hover:shadow-gray-600 ">
      <h2 className="font-bold text-xl text-gray-400">
        {interview?.jobPosition}
      </h2>
      <h2 className="text-sm text-gray-500 my-2">
        Description: {interview?.jobDesc}
      </h2>
      <h2 className="text-sm text-gray-600 my-2">
        Years of Experience: {interview?.jobExperience}
      </h2>
      <h2 className="text-xs text-gray-600">
        Created At: {interview?.createdAt}
      </h2>

      <div className="flex justify-between mt-2 gap-4">
        <Link
          href={
            "/dashboard/interview/" +
            interview?.mockId +
            "/technicalRound/feedback"
          }
          className="w-full"
        >
          <Button size="sm" className="w-full bg-gray-800 text-gray-400">
            Feedback
          </Button>
        </Link>
        <Link
          href={"/dashboard/interview/" + interview?.mockId + "/technicalRound"}
          className="w-full"
        >
          <Button size="sm" className="w-full bg-gray-900 text-gray-400">
            Start
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default InterviewItemCard;
