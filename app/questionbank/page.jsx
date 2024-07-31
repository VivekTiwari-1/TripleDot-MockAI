"use client";

import React, { useState } from "react";
import InterviewQuest from "./_components/InterviewQuest";
import ObjectiveQuest from "./_components/ObjectiveQuest";

const page = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="bg-black text-white flex flex-col items-center py-8 px-32">
      <div className="p-4 border rounded-2xl border-gray-700 bg-gradient-to-b from-transparent to-gray-950">
        <ul className="flex gap-8">
          <li
            className={`cursor-pointer ${index == 1 ? "text-gray-500" : ""}`}
            onClick={() => setIndex(1)}
          >
            Interview
          </li>
          <li
            className={`cursor-pointer ${index == 2 ? "text-gray-500" : ""}`}
            onClick={() => setIndex(2)}
          >
            Objective
          </li>
          <li
            className={`cursor-pointer ${index == 3 ? "text-gray-500" : ""}`}
            onClick={() => setIndex(3)}
          >
            Algorithm
          </li>
          <li
            className={`cursor-pointer ${index == 4 ? "text-gray-500" : ""}`}
            onClick={() => setIndex(4)}
          >
            Coding
          </li>
        </ul>
      </div>

      <div>
        {index == 0 ? (
          <h1 className="text-gray-700 h-[83vh] flex justify-center items-center">
            Select among the above to see result
          </h1>
        ) : (
          ""
        )}
        {index == 1 ? <InterviewQuest /> : ""}
        {index == 2 ? <ObjectiveQuest /> : ""}
        {index == 3 ? (
          <div className="bg-black text-gray-700 h-[83vh] w-full flex justify-center items-center">
            Algorithm Questions will be added soon!!
          </div>
        ) : (
          ""
        )}
        {index == 4 ? (
          <div className="bg-black text-gray-700 h-[83vh] w-full flex justify-center items-center">
            Coding Questions will be added soon!!
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default page;
