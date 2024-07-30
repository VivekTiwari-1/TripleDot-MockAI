"use client";

import AddNewAlgoRound from "./_components/AddNewAlgoRound";
import AddNewCodingRound from "./_components/AddNewCodingRound";
import AddNewInterview from "./_components/AddNewInterview";
import AddObjectiveQuestions from "./_components/AddObjectiveQuestions";
import AlgoRoundList from "./_components/AlgoRoundList";
import CodingRoundList from "./_components/CodingRoundList";
import InterviewList from "./_components/InterviewList";
import Loader from "./_components/Loader";
import ObjectiveTestList from "./_components/ObjectiveTestList";

const Dashboard = () => {
  return (
    <div className="pt-10">
      <h2 className="font-bold text-2xl text-gray-200">Dashboard</h2>
      <h2 className="text-gray-500">Create and Start your AI Mockup</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 my-10 gap-4 w-[70%]">
        <AddNewInterview />
        <AddObjectiveQuestions />
        <AddNewCodingRound />
        <AddNewAlgoRound />
      </div>

      {/* Previous Interview Lists */}
      <InterviewList />
      <CodingRoundList />
      <AlgoRoundList />
      <ObjectiveTestList />
    </div>
  );
};

export default Dashboard;
