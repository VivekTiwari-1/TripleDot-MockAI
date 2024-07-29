"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import Loader from "../dashboard/_components/Loader";

const page = () => {
  const [index, setIndex] = useState(0);
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
    <div className="bg-black text-white flex flex-col items-center py-8 px-32">
      <div className="p-4 border rounded-2xl border-gray-700 bg-gradient-to-b from-transparent to-gray-950">
        <ul className="flex gap-8">
          <li
            className={`cursor-pointer ${index == 1 ? "text-gray-500" : ""}`}
            onClick={() => setIndex(1)}
          >
            Technical
          </li>
          <li
            className={`cursor-pointer ${index == 2 ? "text-gray-500" : ""}`}
            onClick={() => setIndex(2)}
          >
            Coding
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
            General
          </li>
        </ul>
      </div>

      {loading ? (
        <div className="h-[83vh]">
          <Loader />
        </div>
      ) : (
        <div>
          {index == 0 ? (
            <h1 className="text-gray-700 h-[83vh] flex justify-center items-center">
              Select among the above to see result
            </h1>
          ) : (
            ""
          )}
          {index == 1 ? (
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
                          <span className="text-gray-300 mr-3 ml-1">
                            {" "}
                            Answer:{" "}
                          </span>{" "}
                          <span> {item?.answer}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            ""
          )}
          {index == 2 ? (
            <div className="bg-black text-gray-700 h-[83vh] w-full flex justify-center items-center">
              Sorry for the incovinience, Coding Questions will be added soon!!
            </div>
          ) : (
            ""
          )}
          {index == 3 ? (
            <div className="bg-black text-gray-700 h-[83vh] w-full flex justify-center items-center">
              Sorry for the incovinience, Algorithm Questions will be added
              soon!!
            </div>
          ) : (
            ""
          )}
          {index == 4 ? (
            <div className="bg-black text-gray-700 h-[83vh] w-full flex justify-center items-center">
              Sorry for the incovinience, General Questions will be added soon!!
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default page;
