import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import Skeleton from "../../common/Skeleton";
import TimeConverter from "../../../utils/TimeConverter";
import { Link } from "react-router-dom";
import SinglePayment from "./SinglePayment";

const Payment = () => {
  const [transcationPresent, setTranscationPresent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [singleTranscation, setSingleTranscation] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [count, setCount] = useState('0');
  const limit = 4;

  const handleView = (id) => {
    setSelectedId(id);
    setSingleTranscation(true);
  };

  const fetchTranscation = async (page) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/get-payments?page=${page}&limit=${limit}`,);
      if (response.data.success === false) {
        toast.error("Failed to fetch transaction.");
      } else {
        const { data, count } = response.data.result;
        setTranscationPresent(data);
        setCount(count);
        setTotalPages(Math.ceil(count / limit));
      }
    } catch (error) {
      console.error("Error fetching transaction:", error.response?.data || error.message);
      toast.error("Failed to fetch transaction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchTranscation(currentPage);
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
       <div className="flex justify-between items-center">
      <div>
        <img
          src="https://res.cloudinary.com/dlgyf2xzu/image/upload/v1734194029/image_16_iokvq8.png"
          alt="history"
          loading="lazy"
          className="h-8"
        />
        <h2 className="text-2xl font-semibold mb-1">Payments</h2>
      </div>
      <div className="md:text-xl text-md mb-2 bg-green-200 w-12 h-12 rounded-full flex justify-center items-center shadow-md"> {count}</div>
      </div>
     
    {isLoading ? (
      <div className="flex justify-center items-center py-12">
        <Skeleton />
      </div>
    ) : transcationPresent && transcationPresent.length > 0 ? (
      <>
        {singleTranscation ? (
          <div className="my-2">
            <button onClick={() => setSingleTranscation(false)}>
              <i className="fi fi-rr-angle-small-left"></i> Back
            </button>
            <SinglePayment paymentID={selectedId} />
          </div>
        ) : (
          <>

            <div className="md:min-h-[65vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {transcationPresent.map((item, index) => (
                  <div
                    key={index}
                    className={`${item.role === 'VENDOR' ? 'bg-[#E2EBDF]' : 'bg-gradient-to-r from-[#F5DCB2] to-[#E2EBDF]'} p-4 rounded-lg shadow-md min-h-52 space-y-4`}
                  >
                    <div className="mb-2">
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex justify-between items-center w-full">
                          <p className="text-lg">{item.transactionID}</p>
                          <p
                            className={`font-semibold mt-2 ${item.status === "success"
                                ? "text-green-600"
                                : item.status === "Pending"
                                  ? "text-orange-500"
                                  : "text-red-600"
                              }`}
                          >
                            {item.status.charAt(0).toUpperCase() +
                              item.status.slice(1)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="text-md text-black">{item.Name}</p>
                      <p className="text-lg text-black bg-white px-4 py-2 rounded-full w-12 h-12 flex justify-center items-center">
                        ₹{item.amount}
                      </p>
                      <p className="text-md text-black underline">{item.serialNumber[0]}</p>
                    </div>

                    <p className="text-md text-black">{item.place}</p>

                    <div className="flex justify-between items-center">
                      <p className="text-lg text-black">
                        <TimeConverter date={item.createdAt} />
                      </p>

                      <Link
                        onClick={() => handleView(item._id)}
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
        <p className="text-gray-600 mt-4 text-xl capitalize">
          <span style={{ color: "#EFA153" }}>No Transcation yet!</span> Look like No one had done any Tanscation
        </p>
        <p className="text-gray-600 mt-4 text-xl capitalize">
          Let's make your first one <span style={{ color: "#2AC288" }}>special</span>.
        </p>
        <div>
          <img
            src="https://res.cloudinary.com/dlgyf2xzu/image/upload/v1734194030/Simplification_6_yerh38.png"
            alt="No Transcation Found"
            className="mx-auto mb-6"
          />
          <h1 className="text-center text-2xl">No Transcation Found</h1>
        </div>
      </div>
    )
  }
    </div >
  );
};

export default Payment;
