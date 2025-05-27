import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AllUsers = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center shadow-lg rounded-lg p-2">
      <div className="flex items-center gap-4">
        <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold capitalize">
          {user.firstName[0]}
        </div>
        <p className="text-lg font-medium text-gray-700 capitalize">
          {user.firstName} {user.lastName}
        </p>
      </div>

      <button
        className="text-sm px-4 py-3 rounded-lg font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition cursor-pointer"
        onClick={() => {
          navigate(`/send?id=${user.userId}&name=${user.firstName}`);
        }}
      >
        Send Money
      </button>
    </div>
  );
};

export default AllUsers;
