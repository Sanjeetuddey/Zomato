import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Toaster />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/adminDashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;