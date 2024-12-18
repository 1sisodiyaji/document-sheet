import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

const Setting = () => { 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const[loading,setLoading] = useState(false);
 const name = "Somashekar Chalavadi";
  useEffect(() => {
    const token = Cookies.get("Admin-document-sheet-token-#ADST");
    if (!token) {
      toast.error("Token not found.");
      return;
    }
    const fetchAdminDetails = async () => {
      try {

        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/admin/getAdminDetails`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = response.data.data;
        console.log(response);
        setEmail(result.email);
      } catch (error) {
        console.error("Error fetching vendor details:", error);
        toast.error("Failed to fetch vendor details.");
      }
    };

    fetchAdminDetails();
  }, []); 
  const handleChangePassword = async () => {
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/admin/recover-password`,
        { email, password }
      );

      if (response.data.success) {
        toast.success("Password updated successfully!");
        setPassword("");
        setConfirmPassword("");
        setLoading(false);
      } else {
        toast.error("Failed to update password.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error updating password:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <img src="https://res.cloudinary.com/dlgyf2xzu/image/upload/v1734190122/Simplification_1_vjsi7g.png" alt="setting" loading="lazy" className="w-12 h-12" />
        <h2 className="text-2xl font-semibold mb-6">Your space, your settings—tailored just for you</h2>
      </div>

      <div className="flex justify-center items-center py-8 gap-4">

        <div className="flex flex-col items-center mb-6 border-2 border-dashed w-96 p-4">
           <div className="w-24 h-24 rounded-full bg-green-200 flex items-center justify-center text-2xl font-bold text-gray-800">
              {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              }
            </div> 
            <p>{name}</p>
            <div className="w-full max-w-md bg-green-200 p-4 rounded-xl mt-6">
          <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
          <div className="flex flex-col gap-4 p-1">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:outline-none"

            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:outline-none"

            />
            <button
            disabled = {loading}
              onClick={handleChangePassword}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
             {loading ? 'Updating' : 'Update Password'} 
            </button>
          </div>
        </div>
        </div>
 
      </div>
    </>
  );
};

export default Setting;
