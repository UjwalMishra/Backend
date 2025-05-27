import React from "react";
import { Link } from "react-router-dom";

const AllUsers = () => {
  return (
    <div className="flex justify-between items-center shadow-lg rounded-lg p-2">
      <div className="flex items-center gap-4">
        <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
          U
        </div>
        <p className="text-lg font-medium text-gray-700">Shivam Mishra</p>
      </div>
      <Link to="/send">
        <button className="text-sm px-4 py-3 rounded-lg font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition cursor-pointer">
          Send Money
        </button>
      </Link>
    </div>
  );
};

export default AllUsers;
