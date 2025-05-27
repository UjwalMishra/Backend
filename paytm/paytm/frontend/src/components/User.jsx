import React from "react";
import AllUsers from "./AllUsers";

const User = () => {
  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Users:</h2>
      <div className="flex flex-col gap-y-4">
        <AllUsers></AllUsers>
        <AllUsers></AllUsers>
      </div>
    </div>
  );
};

export default User;
