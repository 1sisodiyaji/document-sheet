import React, { useEffect, useState } from "react";
import Chart from "../../components/core/vendor/Chart";
import History from "../../components/core/vendor/History";
import Admin from "../../components/core/vendor/Admin";
import CreateNewSheet from "../../components/core/vendor/CreateNewSheet";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-hot-toast";
import SingleHistoryData from "../../components/core/vendor/SingleHistoryData";


const VendorDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [createsheet, setCreatesheet] = useState(false);
  const navigate = useNavigate();
  const [allocatedLeft, setAllocatedLeft] = useState("0");
  const [id, setId] = useState("");
  const [totalAssignedSheets, setTotalAssignedSheets] = useState("");
  const [serialNumberData, setSerialNumberData] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recents, setRecents] = useState("");
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
    { name: "Admin", id: "admin", img1: "https://res.cloudinary.com/dlgyf2xzu/image/upload/v1733940865/Simplification_gxaqjn.png", img2: "https://res.cloudinary.com/dlgyf2xzu/image/upload/v1733940865/Simplification_gxaqjn.png" },
  ];

  const handleLogout = () => {
    Cookies.remove("Vendor-document-sheet-token-#VDST");
    navigate("/vendor-login");
  };


  useEffect(() => {
    const token = Cookies.get("Vendor-document-sheet-token-#VDST");
    if (!token) {
      toast.error("Token not found.");
      return;
    }

    const fetchVendorDetails = async () => {
      try {


        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/vendor/show-vendor-Detail`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = response.data.data;
        setAllocatedLeft(result.allocatedLeft);
        setId(result.id);
        setTotalAssignedSheets(result.assignedSheets)
      } catch (error) {
        console.error("Error fetching vendor details:", error);
        toast.error("Failed to fetch vendor details.");
      }
    };
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/vendor/all-history`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.success === false) {
          toast.error("Failed to fetch history.");
        } else {
          setRecents(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching history:", error.response?.data || error.message);
        toast.error("Failed to fetch history. Please try again.");
      }
    };

    fetchHistory();
    fetchVendorDetails();
  }, []);


  return (
    <div className="flex h-screen">
      <div className={`fixed inset-y-0 left-0 transform bg-[#F7EEDC] md:w-96 w-80 shadow-lg p-4 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`} >
        <div className="text-gray-800 mb-6 text-center">
          <h2 className="font-bold text-xl">Welcome Back,</h2>
          <p className="text-lg">{id}</p>
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
              <span className="w-6 h-6"><img src={activeTab === item.id ? item.img2 : item.img1} alt={item.name} /></span>
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

          <div className="flex justify-between items-center space-x-4 w-full p-1">
            <input
              type="text"
              value={serialNumberData}
              onChange={(e) => setSerialNumberData(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Please Enter Serial Number"
              className="md:w-96 w-64 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-300 focus:outline-none"
            />
            <div className="flex items-center space-x-4">
              <span className="bg-orange-300 w-8 h-8 flex items-center justify-center rounded-full text-sm">
                {allocatedLeft}
              </span>
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
              <SingleHistoryData serialNumber={serialNumberData} />

            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="mt-6">
          {activeTab === "home" && (
            <>
              {createsheet
                ?
                <>
                  <button onClick={() => setCreatesheet(!createsheet)} className="hover:scale-95"> <i class="fi fi-rr-arrow-left"></i></button>
                  <CreateNewSheet />
                </>
                :
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="min-h-64 p-6 rounded-lg bg-gradient-to-b from-[#EFDEC4] to-[#D1E1D0] shadow-lg flex flex-col justify-center items-center">
                      <img src="https://res.cloudinary.com/dlgyf2xzu/image/upload/v1733941760/image_19_gsh3ic.png"
                        alt="create-new-sheet"
                        loading="lazy"
                        className="mx-auto"
                      />
                      <h3 className="text-3xl font-semibold mb-2">
                        Create new sheet
                      </h3>
                      <p className="text-2xl  text-gray-600">
                        Start a new sheet with ease
                      </p>
                      <button onClick={() => setCreatesheet(!createsheet)} className="mt-4  px-12 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 hover:scale-105 animate-pulse hover:animate-none">
                        Create Sheet
                      </button>
                    </div>
                    <div className="flex justify-center items-center bg-green-100 rounded-lg p-6">
                      <div className="text-center">
                        <Chart left={allocatedLeft} Total={totalAssignedSheets} />
                        <div className="text-4xl font-bold overflow-y-hidden">{totalAssignedSheets - allocatedLeft}</div>
                        <p className="text-sm text-gray-600">This Month</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-lg">Recents</h4>
                      <button
                        onClick={() => {
                          setActiveTab("history");
                          setIsSidebarOpen(false);
                        }}
                        className="text-sm text-green-600 hover:underline" >View All</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      {recents && recents.slice(0, 3).map((item, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-r from-[#F5DCB2] to-[#E2EBDF] p-4 rounded-lg shadow-md space-y-4"
                        >
                          {item.serialNumbers.map((serial, idx) => (
                            <div key={idx} className="flex justify-between items-center">
                              <p className="text-md font-semibold">{serial.serialNumber}</p>
                              <p
                                className={`font-semibold ${serial.status === "success"
                                  ? "text-green-600"
                                  : serial.status === "pending"
                                    ? "text-orange-500"
                                    : "text-red-600"
                                  }`}
                              >
                                {serial.status.charAt(0).toUpperCase() + serial.status.slice(1)}
                              </p>
                            </div>
                          ))}
                          <div className="flex justify-between items-center">
                            <p className="text-lg font-bold">{item.name}</p>
                            <p className="text-sm text-gray-700">Amount: ₹{item.amount}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </>
              }
            </>

          )}

          {activeTab === "history" && (<History />)}

          {activeTab === "admin" && (<Admin />)}

        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
