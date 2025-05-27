import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Topbar = ({ userName }) => {
  const navigate = useNavigate();
  function logoutHandler() {
    localStorage.removeItem("token");
    navigate("/signin");
  }
  return (
    <div className="w-full fixed top-0 left-0 bg-white shadow-md z-50">
      <div className="flex justify-between items-center px-8 py-4">
        <div className="text-2xl font-bold text-blue-600">PayKro!</div>
        <div className="text-lg font-medium text-gray-800 flex gap-x-4 items-center">
          <div>Hello! @{userName}</div>
          <div>
            <button
              type="submit"
              onClick={logoutHandler}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-lg transition duration-300 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
