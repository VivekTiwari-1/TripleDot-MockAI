"use client";

import AddCodingAlgorithm from "./_components/addCodingAlgorithm";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

const Dashboard = () => {
  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Dashboard</h2>
      <h2 className="text-gray-500">Create and Start your AI Mockup</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-4">
        <div>
          <AddCodingAlgorithm />
        </div>
        <div>
          <AddNewInterview />
        </div>
      </div>

      {/* Previous Interview Lists */}
      <InterviewList />
    </div>
  );
};

export default Dashboard;
