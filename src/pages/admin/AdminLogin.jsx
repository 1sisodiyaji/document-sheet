import React, { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import AUTHENTICATE_ANIMARIONS from "../../data/Auth_Animation.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import Cookies from "js-cookie";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }
    if (!password) {
      toast.error("Please enter your password.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/admin/login`, { email, password });
      const { success, token } = response.data;

      if (success) {
        Cookies.set("Admin-document-sheet-token-#ADST", token, { expires: 1 });
        navigate("/admin");
      } else {
        toast.error("Failed to Login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get("Admin-document-sheet-token-#ADST");
    if (token) {
      navigate("/admin");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="md:w-1/2 hidden md:flex flex-col justify-center items-center bg-gradient-to-b from-[#EFDEC4] to-[#D1E1D0] p-8">
        <Player autoplay loop src={AUTHENTICATE_ANIMARIONS} className="w-full h-[60vh]" />
        <p className="text-center text-gray-700 font-medium mt-4 px-8">
          Welcome back, Admin. Manage secure property documentation, oversee records, and ensure seamless operations with Dastabej.
        </p>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center px-6">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center">
            <img
              src="/logo.png"
              alt="Dastabej Logo"
              className="mx-auto mb-4"
              style={{ width: "80px", height: "80px" }}
            />
            <h1 className="text-2xl font-bold text-gray-800">Welcome Admin</h1>
            <p className="text-gray-600">Please enter your details to sign in</p>
          </div>

          {error && (
            <div className="text-red-500 text-sm font-medium mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="p-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="flex p-1">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:outline-none"
                />
                <div onClick={() => setShowPassword(!showPassword)} className="mx-1 flex justify-center items-center cursor-pointer">
                  <i className={showPassword ? "fi fi-rr-eye" : "fi fi-rs-crossed-eye"}></i>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg font-semibold transition ${
                loading ? "cursor-not-allowed bg-green-400 text-white" : "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center p-1">
                  <div className="w-6 h-6 border-2 border-t-transparent border-black rounded-full animate-spin"></div>
                  <span className="ml-2">Loading...</span>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
