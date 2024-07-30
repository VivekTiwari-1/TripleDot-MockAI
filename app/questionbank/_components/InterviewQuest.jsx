"use client";

import Loader from "@/app/dashboard/_components/Loader";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import React, { useEffect, useState } from "react";

const InterviewQuest = () => {
  const [questions, setQuestions] = useState([]);

  const [loading, setLoading] = useState();

  useEffect(() => {
    GetQuestions();
  }, []);

  const GetQuestions = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(MockInterview)
      .orderBy(MockInterview.id);

    const newQuestions = [];

    result.map((item) => {
      const data = JSON.parse(item.jsonMockResp);

      for (let idx = 0; idx < data.length; idx++) {
        const quest = data[idx];
        if (quest) {
          newQuestions.push(quest);
        }
      }
    });

    setQuestions(newQuestions);
    setLoading(false);
  };
  return (
    <div>
      {loading ? (
        <div className="h-[100vh]">
          <Loader />
        </div>
      ) : (
        <div className="mt-16">
          {questions && (
            <div className="bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 py-8 px-8 rounded-2xl">
              <div className="flex flex-col">
                {questions?.map((item, index) => (
                  <div className="bg-slate-950 border border-gray-800 p-4 rounded-xl mb-7 hover:scale-105 ">
                    <h2 className="text-gray-400 flex">
                      <span className="text-gray-300 mr-2">Question: </span>
                      <span>{item?.question}</span>
                    </h2>
                    <p className="mt-2  text-gray-500 flex">
                      <span className="text-gray-300 mr-3 ml-1"> Answer: </span>{" "}
                      <span> {item?.answer}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InterviewQuest;
