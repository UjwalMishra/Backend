import React, { useState } from "react";
import Topbar from "../components/Topbar";
import Balance from "../components/Balance";
import User from "../components/User";
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  let username = "";

  if (token) {
    const decoded = jwtDecode(token);
    username = decoded.username;
    username = username.split("@")[0];
  }
  return (
    <div className=" ">
      {/* Topbar */}
      <Topbar userName={username} />

      {/* Main Content */}
      <div className="w-11/12 mx-auto mt-24 p-4 flex flex-col gap-8">
        <Balance />
        <User />
      </div>
    </div>
  );
};

export default Dashboard;
