"use client";

import React, { useState, useRef, useEffect } from "react";
import { openDB } from "idb";

const VideoRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const [mediaBlobUrl, setMediaBlobUrl] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [db, setDb] = useState(null);

  const mediaRecorder = useRef(null);
  const mediaChunks = useRef([]);
  const recognition = useRef(null);
  const audioContext = useRef(null);
  const audioStream = useRef(null);

  const videoRef = useRef(null);
  const playerRef = useRef(null);

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

    // Initialize Speech Recognition
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;
      recognition.current.onresult = (event) => {
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        setTranscript(finalTranscript);
      };
    } else {
      alert("Speech Recognition API not supported in this browser.");
    }
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

      const transaction = db.transaction("media", "readwrite");
      const mediaStore = transaction.objectStore("media");
      await mediaStore.put({ blob });

      mediaChunks.current = [];

      // Stop speech recognition
      recognition.current.stop();
    };

    mediaRecorder.current.start();
    setRecording(true);

    // Start speech recognition
    recognition.current.start();
  };

  const stopRecording = () => {
    mediaRecorder.current.stop();
    videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    setRecording(false);
  };

  const playRecording = async () => {
    const transaction = db.transaction("media", "readonly");
    const mediaStore = transaction.objectStore("media");
    const allMedia = await mediaStore.getAll();

    if (allMedia.length > 0) {
      const blob = allMedia[0].blob;
      const url = URL.createObjectURL(blob);
      setVideoURL(url);
      setPlaying(true);
    }
  };

  const deleteRecording = async () => {
    const transaction = db.transaction("media", "readwrite");
    const mediaStore = transaction.objectStore("media");
    await mediaStore.clear();
    setMediaBlobUrl(null);
    setVideoURL(null);
    setTranscript("");
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <video
        ref={videoRef}
        autoPlay
        muted
        className="w-1/2 border-2 border-gray-400"
      />
      <video
        ref={playerRef}
        src={videoURL}
        controls
        className="w-1/2 border-2 border-gray-400"
      />
      {transcript && (
        <div className="w-1/2 p-4 border-2 border-gray-400">
          <h3 className="text-lg font-bold mb-2">Transcript:</h3>
          <p>{transcript}</p>
        </div>
      )}

      <div className="space-x-2">
        <button
          onClick={recording ? stopRecording : startRecording}
          className={`px-4 py-2 text-white ${
            recording ? "bg-red-600" : "bg-green-600"
          }`}
        >
          {recording ? "Stop Recording" : "Start Recording"}
        </button>

        <button
          onClick={playRecording}
          className="px-4 py-2 text-white bg-blue-600"
          disabled={!mediaBlobUrl && !videoURL}
        >
          Play Recording
        </button>

        <button
          onClick={deleteRecording}
          className="px-4 py-2 text-white bg-red-600"
          disabled={!mediaBlobUrl && !videoURL}
        >
          Delete Recording
        </button>
      </div>
    </div>
  );
};

export default VideoRecorder;
