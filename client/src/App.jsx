import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./pages/Header";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "../src/components/userDashboard/Dashboard"
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Toaster />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;