// // // Signup.jsx
// // import React from "react";
// // import { Link } from "react-router-dom";

// // const Signup = () => {
// //   return (
// //     <div className="flex items-center justify-center py-10">
// //       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
// //         <h2 className="text-2xl font-bold text-center mb-4">Join FeastFleet</h2>
// //         <p className="text-gray-600 text-center mb-6 text-sm">
// //           Sign up to order food
// //         </p>

// //         <input
// //           type="text"
// //           placeholder="Full Name"
// //           className="w-full px-4 py-2 mb-4 border rounded-lg"
// //         />
// //         <input
// //           type="email"
// //           placeholder="Email"
// //           className="w-full px-4 py-2 mb-4 border rounded-lg"
// //         />
// //         <input
// //           type="password"
// //           placeholder="Password"
// //           className="w-full px-4 py-2 mb-4 border rounded-lg"
// //         />
// //         <input
// //           type="password"
// //           placeholder="Confirm Password"
// //           className="w-full px-4 py-2 mb-4 border rounded-lg"
// //         />

// //         <button className="w-full bg-orange-500 text-white py-2 rounded-lg">
// //           Sign Up
// //         </button>

// //         <p className="text-center text-sm text-gray-600 mt-4">
// //           Already have an account?{" "}
// //           <Link to="/login" className="text-orange-500 font-semibold">
// //             Sign in
// //           </Link>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Signup;

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { motion } from "framer-motion";
// import api from "../config/api";
// import toast from "react-hot-toast";
// const SignupPage = () => {
//   const [signupData, setSignupData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSignupData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     if (signupData.password !== signupData.confirmPassword) {
//       setError("Passwords do not match");
//       setLoading(false);
//       return;
//     }

//     console.log("Signup Data:", signupData);

//     try {
//       const res = await api.post("/auth/signup", signupData);
//       toast.success(res.data.message);
//       navigate("/login");
//     } catch (err) {
//       setError(toast.err.response?.data?.message || "Unknow Error From Server");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-base-200 px-4">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//         className="bg-base-100 p-8 rounded-2xl shadow-xl w-full max-w-md"
//       >
//         <h2 className="text-3xl font-bold text-center text-base-content mb-2">
//           Join FeastFleet
//         </h2>
//         <p className="text-center text-sm text-base-content/70 mb-6">
//           Sign up to order food
//         </p>

//         {error && (
//           <p className="text-red-500 text-sm text-center mb-4">{error}</p>
//         )}

//         <form className="space-y-4" onSubmit={handleSignup}>
//           <input
//             type="text"
//             name="fullName"
//             placeholder="Full Name"
//             className="input input-bordered w-full"
//             value={signupData.fullName}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             className="input input-bordered w-full"
//             value={signupData.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             className="input input-bordered w-full"
//             value={signupData.password}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="confirmPassword"
//             placeholder="Confirm Password"
//             className="input input-bordered w-full"
//             value={signupData.confirmPassword}
//             onChange={handleChange}
//             required
//           />

//           <button
//             type="submit"
//             className="btn btn-primary w-full"
//             disabled={loading}
//           >
//             {loading ? "Signing Up..." : "Sign Up"}
//           </button>
//         </form>

//         <p className="text-center text-sm text-base-content/70 mt-4">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="text-primary font-medium hover:underline"
//           >
//             Sign in
//           </Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default SignupPage;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import api from "../config/api";
import toast from "react-hot-toast";
const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (signupData.password !== signupData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    console.log("Signup Data:", signupData);

    try {
      const res = await api.post("/auth/signup", signupData);
      toast.success(res.data.message);
      navigate("/login");
    } catch (err) {
      setError(toast.err.response?.data?.message || "Unknow Error From Server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-base-200 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-base-100 p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-base-content mb-2">
          Join FeastFleet
        </h2>
        <p className="text-center text-sm text-base-content/70 mb-6">
          Sign up to order food
        </p>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form className="space-y-4" onSubmit={handleSignup}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="input input-bordered w-full"
            value={signupData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={signupData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={signupData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="input input-bordered w-full"
            value={signupData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-base-content/70 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;