import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import api from "../config/api";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login", loginData);
      toast.success(res.data.message)
     

      // if (response.data.token) {
      //   sessionStorage.setItem("authToken", response.data.token);
      // }

      navigate("/");
    } catch (err) {
      
      setError(toast.err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-base-100 p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-base-content mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-base-content/70 mb-6">
          Login to your account
        </p>

        {/* Error message */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        {/* Login Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="label text-sm font-medium text-base-content">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              value={loginData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="label text-sm font-medium text-base-content">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              value={loginData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Sign up link */}
        <p className="text-center text-sm text-base-content/70 mt-6">
          Don’t have an account?{" "}
          <NavLink
            to="/signup"
            className="text-primary font-medium hover:underline"
          >
            Sign up
          </NavLink>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;