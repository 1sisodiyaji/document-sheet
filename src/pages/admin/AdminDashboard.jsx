import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import Home from "../../components/core/admin/Home";
import History from "../../components/core/admin/History";
import Setting from "../../components/core/admin/Setting";
import Vendors from "../../components/core/admin/Vendors";
import Payment from "../../components/core/admin/Payment";
import axios from "axios";
import Feedback from "../../components/core/admin/Feedback";
import Sheet from "../../components/core/admin/Sheet";
import SearchHistory from "../../components/core/admin/SearchHistory";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();
  const [serialNumberData, setSerialNumberData] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (serialNumberData.trim() === "") {
        toast.error("Please enter a valid serial number.");
        return;
      }
      setIsModalOpen(true);
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSerialNumberData("");
  };

  const menuItems = [
    { name: "Home", id: "home", img1: "https://res.cloudinary.com/dlgyf2xzu/image/upload/v1733940865/Vector_ro75y5.png", img2: "https://res.cloudinary.com/dlgyf2xzu/image/upload/v1733940865/Simplification_1_hkqulx.png" },
    { name: "History", id: "history", img1: "https://res.cloudinary.com/dlgyf2xzu/image/upload/v1733940865/image_6_fvdgvx.png", img2: "https://res.cloudinary.com/dlgyf2xzu/image/upload/v1733940865/Simplification_2_uhznnd.png" },
    { name: "Payments", id: "payment", img1: "https://res.cloudinary.com/dlgyf2xzu/image/upload/v1734190215/image_8_bfhvtf.png", img2: "https://res.cloudinary.com/dlgyf2xzu/image/upload/v1734190215/Simplification_5_oxcp71.png" },
    { name: "Vendors", id: "vendor", img1: "https://res.cloudinary.com/dlgyf2xzu/image/upload/v1734190122/image_61_fakdmh.png", img2: "https://res.cloudinary.com/dlgyf2xzu/image/upload/v1734190122/Simplification_2_agko2f.png" },
    { name: "Setting", id: "setting", img1: "https://res.cloudinary.com/dlgyf2xzu/image/upload/v1734190122/Simplification_1_vjsi7g.png", img2: "https://res.cloudinary.com/dlgyf2xzu/image/upload/v1734190149/Simplification_3_tzzeyt.png" },
    { name: "Feedback", id: "feedback", img1: "https://res.cloudinary.com/dbqq41bpc/image/upload/v1734547468/feedback_jretkt.png", img2: "https://res.cloudinary.com/dbqq41bpc/image/upload/v1734547468/feedback_jretkt.png" },
    { name: "Sheet", id: "sheet", img1: "https://res.cloudinary.com/dlgyf2xzu/image/upload/v1733941760/image_19_gsh3ic.png", img2: "https://res.cloudinary.com/dlgyf2xzu/image/upload/v1733941760/image_19_gsh3ic.png" },

  ];

  const handleLogout = async() => {
      try{
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/admin/logout`)
  
      if(response.status) {
          Cookies.remove("Admin-document-sheet-token-#ADST");
          navigate("/admin-login");
        }else{
          toast.error("Failed to Logout");
        }
      }catch(error){
        console.log(error);
        toast.error("Failed to excute logout");
      }
  };

  return (
    <div className="flex h-screen ">
      <div className={`fixed inset-y-0 z-50 left-0 transform bg-[#C2E9DB] md:w-96 w-80 shadow-lg p-4 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`} >
        <div className="text-gray-800 mb-6 text-center">
          <h2 className="font-bold text-xl">Welcome Back,</h2>
          <p className="text-lg">Somashekar</p>
        </div>
        <nav className="space-y-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`flex items-center w-full px-6 py-3 rounded-md text-left ${activeTab === item.id
                ? "bg-[#219B9D] text-white"
                : "text-gray-700 hover:bg-green-200"
                }`}
              onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false);
              }}
            >
              <span className="w-6 h-6"><img src={activeTab === item.id ? item.img2 : item.img1} alt={item.name} loading="lazy" /></span>
              <span className="ml-3">{item.name}</span>
            </button>
          ))}

        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 md:p-6 p-2 md:ml-96">
        <div className="flex md:flex-row flex-row-reverse items-center justify-between">
          <button
            className="block md:hidden px-2 py-1 rounded-sm bg-gray-200 text-gray-700 ms-1"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? 'X' : '☰'}
          </button>

          <div className="flex justify-between items-center space-x-2 w-full p-1">
            <input
              type="text"
              value={serialNumberData}
              onChange={(e) => setSerialNumberData(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Please Enter Serial Number "
              className="md:w-96 w-64 px-4  py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-300 focus:outline-none"
            />
            <div className="flex items-center space-x-2">
              <div
                className="bg-red-300 px-4 py-2 text-black rounded-md text-sm cursor-pointer flex justify-center items-center"
                onClick={handleLogout}
              >
                Logout <i className="fi fi-rs-sign-out-alt ms-2"></i>
              </div>

            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg max-w-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">See Details of {serialNumberData} </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-600 hover:text-red-500"
                >
                  ✕
                </button>
              </div>
             <SearchHistory serialNumber={ serialNumberData}/>
            </div>
          </div>
        )}

        <div className="mt-6">
          {activeTab === "home" && (<Home/>)}

          {activeTab === "history" && (<History/>)}

          {activeTab === "payment" && (<Payment/>)}

          {activeTab === "vendor" && (<Vendors/>)}

          {activeTab === "setting" && (<Setting/>)}
 
          {activeTab === "feedback" && (<Feedback/>)}
          
          {activeTab === "sheet" && (<Sheet/>)}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
