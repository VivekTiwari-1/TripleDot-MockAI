"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState, useRef } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Loader from "@/app/dashboard/_components/Loader";

import { openDB } from "idb";

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const [loading, setLoading] = useState(true);

  const [isVideoOn, setVideoOn] = useState(false);

  // NEW SECTION STARTS HERE

  const [recording, setRecording] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const [mediaBlobUrl, setMediaBlobUrl] = useState(null);
  const [indexedDb, setIndexedDb] = useState(null);

  const mediaRecorder = useRef(null);
  const mediaChunks = useRef([]);
  const recognition = useRef(null);

  const videoRef = useRef(null);

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
      setIndexedDb(db);
    }
    initDB();
  }, []);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    videoRef.current.srcObject = stream;

    mediaRecorder.current = new MediaRecorder(stream);
    mediaRecorder.current.ondataavailable = (e) => {
      mediaChunks.current.push(e.data);
    };
    mediaRecorder.current.onstop = async () => {
      const blob = new Blob(mediaChunks.current, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setMediaBlobUrl(url);
      setVideoURL(null);
      db;

      const transaction = indexedDb.transaction("media", "readwrite");
      const mediaStore = transaction.objectStore("media");
      await mediaStore.put({ blob });

      mediaChunks.current = [];

      // Stop speech recognition
      //recognition.current.stop();
    };

    mediaRecorder.current.start();
    setRecording(true);
    setVideoOn(true);

    // Start speech recognition
    //recognition.current.start();
  };

  const stopRecording = () => {
    mediaRecorder.current.stop();
    videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    setRecording(false);
  };

  // NEW SECTION ENDS HERE

  useEffect(() => {}, [recording]);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);

    setLoading(false);
  };
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Questions */}
              {!isVideoOn ? (
                ""
              ) : (
                <QuestionsSection
                  mockInterviewQuestion={mockInterviewQuestion}
                  activeQuestionIndex={activeQuestionIndex}
                />
              )}
              {/* Video/Audio recordings */}

              <div>
                <div className="h-[50vh] w-[35vw] flex flex-col justify-center items-center rounded-lg ml-16 mt-12 p-2  bg-black text-white">
                  {/* <WebcamIcon height={300} width={300} className="absolute" /> */}
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    style={{ width: "100%", height: "100%" }}
                    className="border-2 rounded-md bg-gray-400"
                  />{" "}
                </div>

                {!isVideoOn ? (
                  <Button
                    onClick={recording ? "" : startRecording}
                    className={`ml-52 mt-8 text-white ${
                      recording ? "bg-red-600" : "bg-green-600"
                    }`}
                  >
                    {recording ? "Stop Recording" : "Enable Video Recording"}
                  </Button>
                ) : (
                  <>
                    <RecordAnswerSection
                      mockInterviewQuestion={mockInterviewQuestion}
                      activeQuestionIndex={activeQuestionIndex}
                      interviewData={interviewData}
                    />

                    <div className="flex justify-end gap-6">
                      {activeQuestionIndex > 0 && (
                        <Button
                          onClick={() =>
                            setActiveQuestionIndex(activeQuestionIndex - 1)
                          }
                        >
                          Previous Question
                        </Button>
                      )}
                      {activeQuestionIndex !=
                        mockInterviewQuestion?.length - 1 && (
                        <Button
                          onClick={() =>
                            setActiveQuestionIndex(activeQuestionIndex + 1)
                          }
                        >
                          Next Question
                        </Button>
                      )}
                      {activeQuestionIndex ===
                        mockInterviewQuestion?.length - 1 && (
                        <Link
                          href={
                            "/dashboard/interview/" +
                            interviewData?.mockId +
                            "/technicalRound/feedback"
                          }
                        >
                          <Button onClick={recording ? stopRecording : ""}>
                            End Interview
                          </Button>
                        </Link>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartInterview;
