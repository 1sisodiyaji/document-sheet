import React, { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import AUTHENTICATE_ANIMARIONS from "../../data/Auth_Animation.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const VendorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ShowPasswordData, setShowPasswordData] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Check for empty fields
    if (!email) {
      toast("Please fill in your email.");
      return;
    }
  
    if (!password) {
      toast("Please fill in your password.");
      return;
    }
  
    try {
      setLoading(true);
  
      // Send the login request
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/vendor/login`, { email, password });
      console.log(response);
       const { success, token } = response.data;

       console.log(success, token)
      // Chec k if the login was successful
      if (success) { 
        Cookies.set("Vendor-document-sheet-token-#VDST", token, { expires: '1d' });
        navigate("/vendor");
      } else {
        // Handle failure if the success flag is false
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      // Handle unexpected errors
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      // Ensure loading is always set to false
      setLoading(false);
    }
  };
  
  const ShowPassword = () => {
    setShowPasswordData(!ShowPasswordData); // Correct toggle logic
  };

  useEffect(() => {
    const token = Cookies.get("Vendor-document-sheet-token-#VDST");
    if (token) {
      navigate("/vendor");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="md:w-1/2 hidden md:flex flex-col justify-center items-center bg-gradient-to-b from-[#EFDEC4] to-[#D1E1D0] p-8">
        <div className="flex justify-center p-3">
          {["S", "E", "C", "U", "R", "E"].map((letter, index) => (
            <div
              key={index}
              className="flex justify-center items-center  w-14 h-14 bg-green-200 rounded-full animate-bounce mx-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {letter}
            </div>
          ))}
          {["Y", "O", "U", "R"].map((letter, index) => (
            <div
              key={index}
              className="flex justify-center items-center w-14 h-14 bg-indigo-200 rounded-full animate-bounce mx-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {letter}
            </div>
          ))}
        </div>
        <div className="flex p-3">
          {["F", "U", "T", "U", "R", "E"].map((letter, index) => (
            <div
              key={index}
              className="flex justify-center items-center  w-14 h-14 bg-blue-200 rounded-full animate-bounce mx-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {letter}
            </div>
          ))}
        </div>
        <p className="text-center text-gray-700 font-medium mt-4 px-8">
          Join the future of secure property documentation. Dastabej makes managing real estate records easy and accessible, anytime, anywhere.
        </p>
        <Player
          autoplay
          loop
          src={AUTHENTICATE_ANIMARIONS}
          className="w-full h-[60vh]"
        />
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
            <h1 className="text-2xl font-bold text-gray-800">Welcome Back Vendor</h1>
            <p className="text-gray-600">Please enter your details to sign in</p>
          </div>

          {error && (
            <div className="text-red-500 text-sm font-medium mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="p-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="flex p-1">
                <input
                  type={ShowPasswordData ? 'text' : 'password'} // Correct input type toggle
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:outline-none"
                />
                <div onClick={ShowPassword} className="mx-1 flex justify-center items-center cursor-pointer">
                  <i className={ShowPasswordData ? 'fi fi-rr-eye' : 'fi fi-rs-crossed-eye'}></i>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg font-semibold transition ${loading ? 'cursor-not-allowed bg-green-400 text-white' : 'bg-green-600 text-white hover:bg-green-700 cursor-pointer'}`}
            >
              {loading ? (
                <div className="flex items-center justify-center overflow-y-hidden">
                  <div className="w-6 h-6 border-2 border-t-transparent border-black rounded-full animate-spin"></div>
                  <span className="ml-2">Welcome to Document Sheet</span>
                </div>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorLogin;
