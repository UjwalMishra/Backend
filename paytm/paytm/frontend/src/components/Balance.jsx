import React, { useEffect, useState } from "react";
import axios from "axios";
const Balance = () => {
  const [balance, setBalance] = useState(0);
  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/account/balance",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setBalance(res.data.balance);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className="text-xl font-bold">
        Your Balance is : <span>Rs {balance}</span>
      </div>
    </div>
  );
};

export default Balance;
