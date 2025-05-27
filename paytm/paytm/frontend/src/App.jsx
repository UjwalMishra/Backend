import React, { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import SendMoney from "./pages/SendMoney";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./index.css";

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/send" element={<SendMoney />} />
      </Routes>
    </div>
  );
};

export default App;
