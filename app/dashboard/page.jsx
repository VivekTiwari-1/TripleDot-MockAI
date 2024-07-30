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
    <div className="p-10">
      <h2 className="font-bold text-2xl">Dashboard</h2>
      <h2 className="text-gray-500">Create and Start your AI Mockup</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-4">
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
