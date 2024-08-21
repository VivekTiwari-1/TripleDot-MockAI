"use client";

import Loader from "@/app/dashboard/_components/Loader";
import { toast } from "@/components/ui/use-toast";
import { db } from "@/utils/db";
import { ObjectiveMock } from "@/utils/schema";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

const ObjectiveQuest = () => {
  const [questions, setQuestions] = useState([]);

  const [loading, setLoading] = useState();

  useEffect(() => {
    GetQuestions();
  }, []);

  const GetQuestions = async () => {
    setLoading(true);

    try {
      const result = await db
        .select()
        .from(ObjectiveMock)
        .orderBy(ObjectiveMock.id);

      const newQuestions = [];

      result.map((item) => {
        const data = JSON.parse(item.jsonMockResp);
        //console.log(data);

        for (let idx = 0; idx < data.length; idx++) {
          const quest = data[idx];
          if (quest) {
            newQuestions.push(quest);
            console.log(quest);
          }
        }
      });

      setQuestions(newQuestions);
    } catch (error) {
      toast({
        description: "Please try again!!",
        action: <X className="text-red-600" />,
      });
    }
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
            <div className="bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 py-8 px-16 rounded-2xl">
              <div className="flex flex-col">
                {questions?.map((item, index) => (
                  <div className="bg-slate-950 border border-gray-800 p-4 rounded-xl mb-7 hover:scale-105 transition-transform duration-300">
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

export default ObjectiveQuest;
