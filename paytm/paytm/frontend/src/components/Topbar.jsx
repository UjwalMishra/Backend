import React from "react";

const Topbar = () => {
  return (
    <div className="w-full fixed top-0 left-0 bg-white shadow-md z-50">
      <div className="flex justify-between items-center px-8 py-4">
        <div className="text-2xl font-bold text-blue-600">PayKro!</div>
        <div className="text-lg font-medium text-gray-800">Hello! @ujwal</div>
      </div>
    </div>
  );
};

export default Topbar;
