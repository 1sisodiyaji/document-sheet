import React, { useState } from 'react'
import CreateSheet from "../../../data/CreateSheet.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";

const CreateNewSheet = () => {
  const [docData, setDocData] = useState({
    UserName: "",
    Reason: "",
    Village: "",
    Post: "",
    District: "",
    Date: "",
    NumberOfSheet: "",
  });

  const [errors, setErrors] = useState({
    UserName: "",
    Reason: "",
    Village: "",
    Post: "",
    District: "",
    Date: "",
    NumberOfSheet: "",
  });

  const validateFields = () => {
    const tempErrors = {};
    let isValid = true;

    Object.keys(docData).forEach((field) => {
      if (!docData[field]) {
        tempErrors[field] = `${field} is required`;
        isValid = false;
      } else {
        tempErrors[field] = "";
      }
    });

    setErrors(tempErrors);
    return isValid;
  };

  const onHandleDocCreated = async () => {

    if (!validateFields()) {
      toast.error("Please fill all the fields");
      return;
    }

    const today = new Date();
    const todayFormatted = today.toISOString().split("T")[0];

    if (docData.Date < todayFormatted) {
      toast.error("Please do not fill past dates.");
    }
    let token = Cookies.get("Vendor-document-sheet-token-#VDST");
    if (!token) {
      toast.error("token not found.");
    }
    try {

      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/vendor/CreateSheetByVendor`, docData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );

      if (response.success === false) {
        toast.error("Failed to Create Sheet")
      }

      toast.success("Sheet created successfully!");

      setDocData({
        UserName: "",
        Reason: "",
        Village: "",
        Post: "",
        District: "",
        Date: "",
        NumberOfSheet: "",
      });

    } catch (error) {
      console.error("Error creating sheet:", error.response?.data || error.message);
      toast.error("Failed to create sheet. Please try again.");
    }
  };
  
  return (
    <>
      <h1 className="text-3xl  bg-gradient-to-r from-orange-400 via-green-500 to-teal-500 bg-clip-text text-transparent">
        Please Fill the details of Customer
      </h1>

      <div className="flex md:flex-row flex-col-reverse justify-center items-center pt-6 mx-auto w-full">
        <div className="md:w-2/3 w-full space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <div className="flex flex-col p-4 border-2 border-gray-200 rounded-lg">
              <label className="mb-2 font-medium text-gray-700" htmlFor="name">
                Your Name
              </label>
              <input
                type="text"
                required
                name="UserName"
                value={docData.UserName}
                onChange={(e) => setDocData({ ...docData, UserName: e.target.value })}
                id="name"
                placeholder="Enter Your Name"
                className="py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500 ring-4 ring-green-100"
              />
              {errors.UserName && <p className="text-red-500 text-xs">{errors.UserName}</p>}
            </div>


            <div className="flex flex-col p-4 border-2 border-gray-200 rounded-lg">
              <label className="mb-2 font-medium text-gray-700" htmlFor="reason">
                Reason
              </label>
              <input
                type="text"
                name="Reason"
                required
                value={docData.Reason}
                onChange={(e) => setDocData({ ...docData, Reason: e.target.value })}
                id="reason"
                placeholder="Enter Reason"
                className="py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500 ring-4 ring-green-100"
              />
              {errors.Reason && <p className="text-red-500 text-xs">{errors.Reason}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col p-4 border-2 border-gray-200 rounded-lg">
              <label className="mb-2 font-medium text-gray-700" htmlFor="village">
                Village
              </label>
              <input
                type="text"
                required
                name="Village"
                value={docData.Village}
                onChange={(e) => setDocData({ ...docData, Village: e.target.value })}
                id="village"
                placeholder="Enter Your Village"
                className="py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500 ring-4 ring-green-100"
              />
              {errors.Village && <p className="text-red-500 text-xs">{errors.Village}</p>}
            </div>

            <div className="flex flex-col p-4 border-2 border-gray-200 rounded-lg">
              <label className="mb-2 font-medium text-gray-700" htmlFor="post">
                Post
              </label>
              <input
                type="text"
                required
                name="Post"
                value={docData.Post}
                onChange={(e) => setDocData({ ...docData, Post: e.target.value })}
                id="post"
                placeholder="Enter Post"
                className="py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500 ring-4 ring-green-100"
              />
              {errors.Post && <p className="text-red-500 text-xs">{errors.Post}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col p-4 border-2 border-gray-200 rounded-lg col-span-2">
              <label className="mb-2 font-medium text-gray-700" htmlFor="district">
                Select District
              </label>
              <select
                id="district"
                name="District"
                value={docData.District}
                onChange={(e) => setDocData({ ...docData, District: e.target.value })}
                className="py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500 ring-4 ring-green-100"
              >
                <option value="">Select District</option>
                <option value="Bagalkot" className="">Bagalkot</option>
                <option value="Ballari">Ballari</option>
                <option value="Belagavi">Belagavi</option>
                <option value="Bengaluru Urban">Bengaluru Urban</option>
                <option value="Bengaluru Rural">Bengaluru Rural</option>
                <option value="Bidar">Bidar</option>
                <option value="Chamarajanagar">Chamarajanagar</option>
                <option value="Chikkaballapur">Chikkaballapur</option>
                <option value="Chikkamagaluru">Chikkamagaluru</option>
                <option value="Chitradurga">Chitradurga</option>
                <option value="Dakshina Kannada">Dakshina Kannada</option>
                <option value="Davanagere">Davanagere</option>
                <option value="Dharwad">Dharwad</option>
                <option value="Gadag">Gadag</option>
                <option value="Hassan">Hassan</option>
                <option value="Haveri">Haveri</option>
                <option value="Kalaburagi">Kalaburagi</option>
                <option value="Kodagu">Kodagu</option>
                <option value="Kolar">Kolar</option>
                <option value="Koppal">Koppal</option>
                <option value="Mandya">Mandya</option>
                <option value="Mysuru">Mysuru</option>
                <option value="Raichur">Raichur</option>
                <option value="Ramanagara">Ramanagara</option>
                <option value="Shivamogga">Shivamogga</option>
                <option value="Tumakuru">Tumakuru</option>
                <option value="Udupi">Udupi</option>
                <option value="Uttara Kannada">Uttara Kannada</option>
                <option value="Vijayapura">Vijayapura</option>
                <option value="Yadgir">Yadgir</option>
              </select>
              {errors.District && <p className="text-red-500 text-xs">{errors.District}</p>}
            </div>

            <div className="flex flex-col p-4 border-2 border-gray-200 rounded-lg">
              <label className="mb-2 font-medium text-gray-700" htmlFor="date">
                Select Date
              </label>
              <input
                type="date"
                name="Date"
                value={docData.Date}
                min={(() => {
                  const today = new Date();
                  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
                  return today.toISOString().split("T")[0];
                })()}
                onChange={(e) => setDocData({ ...docData, Date: e.target.value })}
                id="date"
                className="py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500 ring-4 ring-green-100"
              />
              {errors.Date && <p className="text-red-500 text-xs">{errors.Date}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col p-4 border-2 border-gray-200 rounded-lg  col-span-2">
              <label className="mb-2 font-medium text-gray-700" htmlFor="noOfSheets">
                Number Of Sheets
              </label>
              <select
                id="noOfSheets"
                name="NumberOfSheet"
                value={docData.NumberOfSheet}
                onChange={(e) => setDocData({ ...docData, NumberOfSheet: e.target.value })}
                className="py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500 ring-4 ring-green-100"
              >
                <option value="">Select Number</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              {errors.NumberOfSheet && <p className="text-red-500 text-xs">{errors.NumberOfSheet}</p>}
            </div>
            <div className="flex justify-center items-center">
              <button
                onClick={onHandleDocCreated}
                className=" w-80 py-3 rounded-xl focus:outline-none ring-2 transition-all duration-700 ring-green-100 bg-green-200 text-black hover:bg-green-400"
              >
                Create Sheet
              </button>
            </div>
          </div>
        </div>

        <div className="hidden md:block md:w-1/3 w-full">
          <Player autoplay loop src={CreateSheet} style={{ height: "auto", width: "100%" }} />
        </div>
      </div>
    </>
  )
}

export default CreateNewSheet