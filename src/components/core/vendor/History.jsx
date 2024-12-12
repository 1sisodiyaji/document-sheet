import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";
import Skeleton from "../../common/Skeleton";
import TimeConverter from "../../../utils/TimeConverter";
import { Link } from "react-router-dom";
import SingleHistoryData from "./SingleHistoryData";

const History = () => {
  const [historyPresent, setHistoryPresent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [singleHistory, setSingleHistory] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleView = (id) => {
    setSelectedId(id);
    setSingleHistory(true);
  };

  useEffect(() => {
    const fetchHistory = async () => {
      const token = Cookies.get("Vendor-document-sheet-token-#VDST");

      if (!token) {
        toast.error("Token not found.");
        setIsLoading(false);
        return;
      }

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
          setHistoryPresent(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching history:", error.response?.data || error.message);
        toast.error("Failed to fetch history. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div>
      <img src="https://res.cloudinary.com/dlgyf2xzu/image/upload/v1734025428/Simplification_mlxmlr.png" alt="history" loading="lazy" className="h-8" />
      <h2 className="text-2xl font-semibold mb-1">History</h2>

      {isLoading ?
        <div className="flex justify-center items-center  py-12"> <Skeleton /> </div> :
        historyPresent && historyPresent.length > 0 ?
          <>
            {singleHistory ?
              <div className="my-2">
                <button onClick={() => setSingleHistory(false)}> <i className="fi fi-rr-angle-small-left"></i> Back </button>
                <SingleHistoryData serialNumber={selectedId} />
              </div>
              :
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {historyPresent.map((item, index) => (
                    <div key={index}
                      className="bg-gradient-to-r from-[#F5DCB2] to-[#E2EBDF] p-4 rounded-lg shadow-md min-h-52 space-y-4" >

                      <div className="mb-2">
                        {item.serialNumbers.map((serial, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <div className="flex justify-between items-center  w-full">
                              <p className="text-lg">{serial.serialNumber}</p>
                              <p className={`font-semibold mt-2 ${serial.status === "success"
                                ? "text-green-600"
                                : serial.status === "pending"
                                  ? "text-orange-500"
                                  : "text-red-600"
                                }`}
                              >
                                {item.serialNumbers[0].status.charAt(0).toUpperCase() +
                                  item.serialNumbers[0].status.slice(1)}
                              </p>
                            </div>
                          </div>
                        ))}

                      </div>

                      <div className="flex justify-between items-center">
                        <p className="text-md text-black">{item.name}</p>
                        <p className="text-lg text-black bg-white px-4 py-2 rounded-full w-12 h-12 flex justify-center items-center"> ₹{item.amount}</p>
                        <p className="text-md text-black underline">{item.reason}</p>
                      </div>

                      <p className="text-md text-black">{item.place}</p>

                      <div className="flex justify-between items-center">

                        <p className="text-lg text-black"> <TimeConverter date={item.createdAt} /> </p>

                        <Link onClick={() => handleView(item.serialNumbers[0].serialNumber)} className=" bg-gray-100 text-blue-500 px-3 py-1 rounded shadow-md hover:bg-green-500 hover:text-white transition duration-300">
                          View →
                        </Link>

                      </div>

                    </div>
                  ))}
                </div>
              </>
            }

          </> : (
            <div>
              <p className="text-gray-600 mt-4 text-xl">
                <span style={{ color: "#EFA153" }}>No records yet!</span> Your transaction history will appear here -
              </p>
              <p className="text-gray-600 mt-4 text-xl">
                Once you start <span style={{ color: "#2AC288" }}>ready to begin?</span>.
              </p>
              <div>
                <img
                  src="https://res.cloudinary.com/dlgyf2xzu/image/upload/v1733943460/Simplification_3_louxwv.png"
                  alt="No History Found"
                  className="mx-auto mb-6"
                />
                <h1 className="text-center text-2xl">No History Found</h1>
              </div>
            </div>
          )}
    </div>
  );
};

export default History;
