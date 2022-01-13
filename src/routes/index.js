import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import Register from "../components/Register";
import Reset from "../components/Reset";

const index = () => {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/reset" element={<Reset/>} />
      {/* <Route exact path="/dashboard" component={Dashboard} /> */}
    </Routes>
  );
};

export default index;
