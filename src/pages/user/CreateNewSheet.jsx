import axios from "axios"; 
import Banner from "../../components/common/Banner"
import React, { useState } from "react";
import CreateSheet from "../../data/CreateSheet.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { toast } from "react-hot-toast";
const CreateNewSheet = () => {

  const [docData, setDocData] = useState({
    UserName: "",
    Reason: "",
    Village: "",
    Post: "",
    District: "",
    Date: "",
    NumberOfSheet: ""

  })

  const onHandleDocCreated = async () => {
    console.log("Document Data:", docData); // Logs the data to verify before the API call

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/create-sheet`, docData); // Adjust the URL as per your API endpoint
      console.log("Response from server:", response.data);

      // Optional: Reset form fields after successful submission
      setDocData({
        UserName: "",
        Reason: "",
        Village: "",
        Post: "",
        District: "",
        Date: "",
        NumberOfSheet: ""
      });

      toast.success("Sheet created successfully!");
    } catch (error) {
      console.error("Error creating sheet:", error.response?.data || error.message);
      toast.error("Failed to create sheet. Please try again.");
    }
  };

  return (
    <>
      <Banner title={"Create Your sheet"} text={'Fill your information correctly adn get your sheet'} />

      <div className="flex justify-center items-center py-16  mx-auto max-w-7xl">
        <div className="md:w-2/3 w-full space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:px-10 p-2">
            {/* Name Card */}
            <div className="flex flex-col p-4 border-2 border-gray-200 rounded-lg shadow-md">
              <label className="mb-2 font-medium text-gray-700" htmlFor="name">
                Your Name
              </label>
              <input
                type="text"
                name="UserName"
                value={docData.UserName}
                onChange={(e) => setDocData({ ...docData, UserName: e.target.value })}
                id="name"
                placeholder="Enter Your Name"
                className="py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500 ring-4 ring-green-100"
              />
            </div>

            {/* Reason Card */}
            <div className="flex flex-col p-4 border-2 border-gray-200 rounded-lg shadow-md">
              <label
                className="mb-2 font-medium text-gray-700"
                htmlFor="reason"
              >
                Reason
              </label>
              <input
                type="text"
                name="Reason"
                value={docData.Reason}
                onChange={(e) => setDocData({ ...docData, Reason: e.target.value })}
                id="reason"
                placeholder="Enter Reason"
                className="py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500 ring-4 ring-green-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:px-10 p-2">
            {/* Name Card */}
            <div className="flex flex-col p-4 border-2 border-gray-200 rounded-lg shadow-md">
              <label className="mb-2 font-medium text-gray-700" htmlFor="name">
                Village
              </label>
              <input
                type="text"
                name="Village"
                value={docData.Village}
                onChange={(e) => setDocData({ ...docData, Village: e.target.value })}
                id="name"
                placeholder="Enter Your Name"
                className="py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500 ring-4 ring-green-100"
              />
            </div>

            {/* Reason Card */}
            <div className="flex flex-col p-4 border-2 border-gray-200 rounded-lg shadow-md">
              <label
                className="mb-2 font-medium text-gray-700"
                htmlFor="reason"
              >
                Post
              </label>
              <input
                type="text"
                name="Post"
                value={docData.Post}
                onChange={(e) => setDocData({ ...docData, Post: e.target.value })}
                id="reason"
                placeholder="Enter Reason"
                className="py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500 ring-4 ring-green-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:px-10 p-2 md:mt-8">
            {/* District Dropdown Card */}
            <div className="flex flex-col p-4 border-2 border-gray-200 rounded-lg shadow-md col-span-2">
              <label
                className="mb-2 font-medium text-gray-700"
                htmlFor="district"
              >
                Select District
              </label>
              <select
                id="district"
                name="Reason"
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
            </div>

            {/* Date Card */}
            <div className="flex flex-col p-4 border-2 border-gray-200 rounded-lg shadow-md">
              <label className="mb-2 font-medium text-gray-700" htmlFor="date">
                Select Date
              </label>
              <input
                type="date"
                name="Date"
                value={docData.Date}
                onChange={(e) => setDocData({ ...docData, Date: e.target.value })}
                id="date"
                className="py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500 ring-4 ring-green-100"
              />
            </div>

          </div>

          <div className="flex justify-center items-center md:px-10">
            <div className="flex flex-col p-4  w-96 border-2 border-gray-200 rounded-lg shadow-md ">
              <label className="mb-2 font-medium text-gray-700" htmlFor="number-of-sheets">
                Number of Sheets
              </label>
              <div className="relative"> 
                <div className="flex items-center justify-between">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div
                      key={i + 1}
                      className={`relative flex-1 h-2 rounded-full transition-all duration-300 ease-in-out cursor-pointer ${i + 1 <= docData.NumberOfSheet
                          ? 'bg-green-500'
                          : 'bg-gray-300'
                        }`}
                      onClick={() => setDocData({ ...docData, NumberOfSheet: i + 1 })}
                    >
                      {/* Progress circle (radio button look) */}
                      <div
                        className={`absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full transition-all duration-300 ease-in-out ${i + 1 <= docData.NumberOfSheet
                            ? 'bg-green-500'
                            : 'bg-gray-300'
                          }`}
                      ></div>
                    </div>
                  ))}
                </div>

                {/* Option labels under progress bar */}
                <div className="flex justify-between mt-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i + 1} className="text-sm text-gray-700">
                      {i + 1}
                    </span>
                  ))}
                </div>
              </div>
            </div>
 
            <button
              onClick={onHandleDocCreated}
              className="relative  w-72 py-2 px-2 border-2 mx-auto border-gray-300 rounded-md focus:outline-none ring-4 transition-all duration-700 ring-green-100 bg-green-500 text-white"
            >
              Create Sheet
            </button>
          </div>
 
        </div>

        <div className="hidden md:block w-1/3 ">
          <Player
            autoplay
            loop
            src={CreateSheet}
            style={{ height: "auto", width: "100%" }}
          />
        </div>
      </div>
    </>
  );
};

export default CreateNewSheet;
