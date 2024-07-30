"use client";

import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useRef, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Loader from "@/app/dashboard/_components/Loader";
import { openDB } from "idb";

const Feedback = ({ params }) => {
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState([]);

  const [loading, setLoading] = useState(true);

  const [indexedDB, setDb] = useState(null);
  const [videoURL, setVideoURL] = useState(null);

  const playerRef = useRef(null);

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    setFeedbackList(result);
    //console.log(result);
    setLoading(false);
  };

  useEffect(() => {
    async function initDB() {
      const db = await openDB("mediaDB", 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains("media")) {
            db.createObjectStore("media", {
              keyPath: "id",
              autoIncrement: true,
            });
          }
        },
      });
      setDb(db);
    }
    initDB();
  }, []);

  const playRecording = async () => {
    const transaction = indexedDB.transaction("media", "readonly");
    const mediaStore = transaction.objectStore("media");
    const allMedia = await mediaStore.getAll();

    if (allMedia.length > 0) {
      const blob = allMedia[allMedia.length - 1].blob;
      const url = URL.createObjectURL(blob);
      setVideoURL(url);
      //setPlaying(true);
    }
  };

  const deleteRecording = async () => {
    const transaction = indexedDB.transaction("media", "readwrite");
    const mediaStore = transaction.objectStore("media");
    await mediaStore.clear();

    setVideoURL(null);
  };

  return (
    <div className="p-10">
      {loading ? (
        <Loader />
      ) : (
        <div className="">
          {feedbackList?.length == 0 ? (
            <h2 className="text-xl my-8">
              Sorry! Currently we do not have any feedback for you!!
            </h2>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-green-500">
                Congratulations!
              </h2>
              <h2 className="font-bold text-2xl">Here is your feedback</h2>
              <h2 className="text-primary text-lg my-3">
                Your overall rating: <strong>7/10</strong>
              </h2>

              <h2 className="text-sm text-gray-500">
                Find below interview question with correct answer, your answer
                and feedback for improvement
              </h2>

              <div className="">
                <div>
                  {feedbackList &&
                    feedbackList.map((item, index) => (
                      <Collapsible key={index} className="mt-4">
                        <CollapsibleTrigger className="p-2 bg-secondary rounded my-2 flex justify-between w-full">
                          {index + 1 + ") "}
                          {item.question}{" "}
                          <ChevronsUpDown className="h-5 w-5 ml-4" />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="flex flex-col gap-2">
                            <h2 className="text-gray-600 p-2 border rounded-lg">
                              <strong>Rating: </strong>
                              {item.rating}
                            </h2>
                            <h2 className="text-gray-600 p-2 border rounded-lg bg-gray-100 text-sm">
                              <strong>Your answer: </strong>
                              {item.userAns}
                            </h2>
                            <h2 className="text-gray-600 p-2 border rounded-lg bg-gray-100 text-sm">
                              <strong>Expected answer: </strong>
                              {item.correctAns}
                            </h2>
                            <h2 className="text-gray-600 p-2 border rounded-lg bg-gray-100 text-sm">
                              <strong>Feedback: </strong>
                              {item.feedback}
                            </h2>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                </div>

                <div className="my-10 bg-black py-12 flex flex-col justify-center items-center rounded-2xl">
                  <h1 className="text-2xl font-bold text-gray-400 mb-8">
                    Analyze your Video
                  </h1>
                  <div className="h-[60vh] w-[50vw] bg-gray-600 p-2">
                    <video
                      ref={playerRef}
                      src={videoURL}
                      controls
                      className=" border-2 border-gray-900 w-full h-full"
                    />
                  </div>
                  <div className="flex gap-4 py-4 px-8 rounded-b-3xl bg-gray-600">
                    <Button
                      onClick={playRecording}
                      className="px-4 py-2 text-white bg-green-600"
                    >
                      Play
                    </Button>

                    <Button
                      onClick={deleteRecording}
                      className="px-4 py-2 text-white bg-red-600"
                      disabled={!videoURL}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
          <Button onClick={() => router.replace("/dashboard")}>Go Home</Button>
        </div>
      )}
    </div>
  );
};

export default Feedback;
