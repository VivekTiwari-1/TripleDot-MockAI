import React from "react";
import Header from "./_components/Header";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="mx-5 md:mx-20 lg:mx-36 text-white">{children}</div>
    </div>
  );
};

export default DashboardLayout;
