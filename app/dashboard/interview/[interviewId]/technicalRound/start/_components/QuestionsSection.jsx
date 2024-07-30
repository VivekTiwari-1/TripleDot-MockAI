import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

const QuestionsSection = ({ mockInterviewQuestion, activeQuestionIndex }) => {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry your browser, does not support text to speech ");
    }
  };
  return (
    mockInterviewQuestion && (
      <div className="p-5 border rounded-lg border-gray-800 my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockInterviewQuestion &&
            mockInterviewQuestion.map((question, index) => (
              <h2
                className={`p-2 bg-gray-800 rounded-full text-xs md:text-sm text-center ${
                  activeQuestionIndex === index && "bg-gray-900 text-white"
                }`}
              >
                Question {index + 1}
              </h2>
            ))}
        </div>
        <h2 className="my-5 text-gray-300 text-md md:text-lg">
          {mockInterviewQuestion[activeQuestionIndex]?.question}
        </h2>

        <Volume2
          onClick={() =>
            textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
          }
        />
        <div className="flex flex-col rounded-lg p-5 bg-gray-800 mt-20">
          <h2 className="flex gap-2 items-center text-gray-300">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-sm text-gray-400 my-2">
            Click on record answer when you want to answer the question, At the
            end of the interview we will give you the feedback along with the
            correct answer for each of question and your answer to compare it.
          </h2>
        </div>
      </div>
    )
  );
};

export default QuestionsSection;
