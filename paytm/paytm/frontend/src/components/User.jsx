import React, { useEffect, useState } from "react";
import AllUsers from "./AllUsers";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
const User = () => {
  const [filter, setFilter] = useState("");
  const [fetchUser, setFetchUser] = useState([]);

  //todo : apply debouncing concept

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/user/findUsers?filter=${filter}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setFetchUser(res.data.Users);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Users:</h2>
      <form>
        <div className="mb-4 flex relative">
          <input
            id="user"
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search User"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <div className="absolute right-3 top-2 text-2xl">
            <IoSearch />
          </div>
        </div>
      </form>
      <div className="pt-5 flex flex-col gap-y-4">
        {fetchUser.length > 0 ? (
          fetchUser.map((userData) => (
            <AllUsers key={userData.userId} user={userData}></AllUsers>
          ))
        ) : (
          <div>No users found</div>
        )}
      </div>
    </div>
  );
};

export default User;
