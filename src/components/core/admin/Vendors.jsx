import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios"; 
import { Link } from "react-router-dom";
import SingleVendor from "./SingleVendor";

const Vendors = () => {
  const [vendorPresent, setVendorPresent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [singleVendor, setSingleVendor] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [count, setCount] = useState('0');
  const limit = 8;

  const handleView = (id) => {
    setSelectedId(id);
    setSingleVendor(true);
  };

  const fetchVendor = async (page) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/admin/all-vendors?page=${page}&limit=${limit}`,);
      console.log(response);
      if (response.data.success === false) {
        toast.error("Failed to fetch Vendor.");
      } else {
        const { data, count } = response.data.result;
        setVendorPresent(data);
        setCount(count);
        setTotalPages(Math.ceil(count / limit));
      }
    } catch (error) {
      console.error("Error fetching Vendors:", error.response?.data || error.message);
      toast.error("Failed to fetch Vendors. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchVendor(currentPage);
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

  const handleUpdateVendorDetails = async (vendorID) => {
    if (!vendorID) {
      toast.error("Vendor ID not found");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/admin/update-vendor`,
        { vendorID } // Pass vendorID in the request body
      );

      if (response.data.success) {
        toast.success("Vendor details updated successfully!");
        setCurrentPage(1);
      } else {
        toast.error(response.data.message || "Failed to update vendor details.");
      }
    } catch (error) {
      console.error("Error updating vendor details:", error.message);
      toast.error(
        error.response?.data?.message || "An error occurred while updating vendor details."
      );
    }
  };


  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <img
            src="https://res.cloudinary.com/dlgyf2xzu/image/upload/v1734190122/Simplification_2_agko2f.png"
            alt="history"
            loading="lazy"
            className="h-8"
          />
          <h2 className="text-2xl font-semibold mb-1">Vendors</h2>
        </div>
        <div className="md:text-2xl bg-green-200 w-12 h-12 rounded-full flex justify-center items-center shadow-md text-sm "> {count}</div>
      </div>
      {isLoading ? (
        <div className="flex  flex-wrap gap-3 py-12">
          {[...Array(limit)].map((_, index) => (
                <div key={index} className="w-full  rounded-md">
                  <div className="w-full">  
    <div className="h-[8vh] w-full bg-gray-300 animate-pulse"></div>
                  </div>
                </div>
            ))}
        </div>
      ) : vendorPresent && vendorPresent.length > 0 ? (
        <>
          {singleVendor ? (
            <div className="my-2">
              <button onClick={() => setSingleVendor(false)}>
                <i className="fi fi-rr-angle-small-left"></i> Back
              </button>
              <SingleVendor vendorId={selectedId} />
            </div>
          ) : (
            <>

              <div className="md:min-h-[65vh]">
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex md:justify-between items-center">
                    <div className="flex md:justify-between justify-end md:gap-4 w-4/12 space-x-2">
                      <p className="md:w-8 hidden md:block">Si</p>
                      <p className="md:text-sm text-xs">District</p>
                      <p className="md:text-sm text-xs">Vendor ID</p>
                    </div>
                    <div className="flex md:justify-end justify-center gap-4 md:w-7/12 w-5/12">
                      <p className="md:text-sm text-xs">Total</p>
                      <p className="md:text-sm text-xs">Assigned</p>
                      <p className="md:text-sm text-xs">Sheet Left</p>
                    </div>
                    <div className="flex justify-center md:gap-6 gap-2 w-2/12">
                      <p className="md:text-sm text-xs">View</p>
                      <p className="md:text-sm text-xs">Reset</p>
                    </div>
                  </div>
                  {vendorPresent.map((item, index) => (
                    <div key={index}
                      className={`bg-gradient-to-r from-[#F5DCB2] to-[#E2EBDF] md:p-2 p-1 md:px-4 px-2 rounded-lg shadow-md  flex justify-between items-center`}>

                      <div className="flex md:gap-4 gap-2 w-5/12">
                        <h1 className="md:text-lg text-xs font-bold"> {index + 1}.</h1>
                        <h2 className="md:text-md text-xs font-semibold">{item.name}</h2>
                        <h1 className="md:text-lg text-xs  font-bold">{item.id}</h1>
                      </div>

                      <div className="flex justify-end md:gap-4 space-x-1 w-7/12">
                        <div className="md:w-12 md:h-12 w-8 h-8 rounded-full bg-green-200 text-black flex justify-center items-center md:text-xl text-xs font-semibold">{item.totalSheets}</div>

                        <div className="md:w-12 md:h-12 w-8 h-8 rounded-full bg-orange-200 text-black flex justify-center items-center md:text-xl text-xs font-semibold">{item.assignedSheets}</div>

                        <div className={`md:w-12 md:h-12 w-8 h-8 rounded-full ${item.allocatedLeft === 0 ? 'bg-red-400' : 'bg-gray-100'}  text-black flex justify-center items-center md:text-xl text-xs font-semibold`}>{item.allocatedLeft}</div>



                        <div className="flex justify-between items-center md:gap-4 gap-2">
                          <Link
                            onClick={() => handleView(item._id)}
                            className="bg-gray-100 text-blue-500 md:px-3 px-1  md:text-sm text-xs py-1 rounded shadow-md hover:bg-green-500 hover:text-white transition duration-300"
                          >
                            View →
                          </Link>

                          <p onClick={() => handleUpdateVendorDetails(item._id)} className="hover:underline cursor-pointer hover:text-orange-400 md:text-sm text-xs">Reset <i className="fi fi-rr-rotate-right"></i> </p>

                        </div>

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
            <span style={{ color: "#EFA153" }}>No Vendors yet!</span> Your transaction history will appear here -
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

export default Vendors;
