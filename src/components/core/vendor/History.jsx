import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [count, setCount] = useState('0');
  const limit = 4;

  const handleView = (id) => {
    setSelectedId(id);
    setSingleHistory(true);
  };

  const fetchHistory = async (page) => {
    const token = Cookies.get("Vendor-document-sheet-token-#VDST");

    if (!token) {
      toast.error("Token not found.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/vendor/all-history?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success === false) {
        toast.error("Failed to fetch history.");
      } else {
        const { sheets, count } = response.data.result;
        setHistoryPresent(sheets);
        setCount(count);
        setTotalPages(Math.ceil(count / limit));
      }
    } catch (error) {
      console.error("Error fetching history:", error.response?.data || error.message);
      toast.error("Failed to fetch history. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchHistory(currentPage);
  }, [currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <img
            src="https://res.cloudinary.com/dlgyf2xzu/image/upload/v1734025428/Simplification_mlxmlr.png"
            alt="history"
            loading="lazy"
            className="h-8"
          />
          <h2 className="text-2xl font-semibold mb-1"> History </h2>
        </div>
        <div className="md:text-xl text-sm bg-orange-200 w-12 h-12 rounded-full flex justify-center items-center shadow-md mb-2"> {count}</div>
      </div>
      {isLoading ? (
        <div className="flex justify-start items-center py-12">
          <Skeleton  limit= {4}/>
        </div>
      ) : historyPresent && historyPresent.length > 0 ? (
        <>
          {singleHistory ? (
            <div className="my-2">
              <button onClick={() => setSingleHistory(false)}>
                <i className="fi fi-rr-angle-small-left"></i> Back
              </button>
              <SingleHistoryData serialNumber={selectedId} />
            </div>
          ) : (
            <>
             
              <div className="md:min-h-[65vh]">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {historyPresent.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-[#F5DCB2] to-[#E2EBDF] p-4 rounded-lg shadow-md min-h-52 space-y-4"
                    >
                      <div className="mb-2">
                        {item.serialNumbers.map((serial, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <div className="flex justify-between items-center w-full">
                              <p className="text-lg">{serial.serialNumber}</p>
                              <p
                                className={`font-semibold mt-2 ${serial.status === "completed"
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
                        <p className="text-lg text-black bg-white px-4 py-2 rounded-full w-12 h-12 flex justify-center items-center">
                          ₹{item.amount}
                        </p>
                        <p className="text-md text-black underline">{item.reason}</p>
                      </div>

                      <p className="text-md text-black">{item.place}</p>

                      <div className="flex justify-between items-center">
                        <p className="text-lg text-black">
                          <TimeConverter date={item.createdAt} />
                        </p>

                        <Link
                          onClick={() => handleView(item.serialNumbers[0].serialNumber)}
                          className="bg-gray-100 text-blue-500 px-3 py-1 rounded shadow-md hover:bg-green-500 hover:text-white transition duration-300"
                        >
                          View →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center items-center mt-6">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 mx-1 rounded ${currentPage === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                >
                  Previous
                </button>
                <p className="text-lg  mx-2">
                  <span className="text-green-500"> {currentPage} </span>  of {totalPages}
                </p>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 mx-1 rounded ${currentPage === totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </>
      ) : (
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
