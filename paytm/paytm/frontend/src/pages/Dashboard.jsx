import React from "react";
import Topbar from "../components/Topbar";
import Balance from "../components/Balance";
import User from "../components/User";

const Dashboard = () => {
  return (
    <div className=" ">
      {/* Topbar */}
      <Topbar />

      {/* Main Content */}
      <div className="w-11/12 mx-auto mt-24 p-4 flex flex-col gap-8">
        <Balance />
        <User />
      </div>
    </div>
  );
};

export default Dashboard;
