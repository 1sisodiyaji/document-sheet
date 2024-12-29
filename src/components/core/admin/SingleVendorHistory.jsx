import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import TimeConverter from '../../../utils/TimeConverter';

const SingleVendorHistory = ({ vendorId }) => {
  const [vendorHistoryData, setVendorHistoryData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 4;



  useEffect(() => {
    const fetchVendorHistory = async (page = 1) => {
      try {
        setIsLoading(true);
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/admin/vendor-history`,
          { vendorID: vendorId, page, limit: itemsPerPage }
        );
  
        if (response.data.success) {
          setVendorHistoryData(response.data.result.sheets);
          const totalItems = response.data.result.count;
          setTotalPages(Math.ceil(totalItems / itemsPerPage));
          toast.success("Vendor History data fetched successfully!");
        } else {
          toast.error("No vendor history data found.");
        }
      } catch (error) {
        console.error("Error fetching vendor history data:", error);
        toast.error("Failed to fetch vendor history data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchVendorHistory(currentPage);
  }, [currentPage, vendorId]);

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

  if (isLoading) {
    return (
      <div>
        {Array.from({ length: itemsPerPage }, (_, index) => (
          <div
            key={index}
            className="bg-[#E2EBDF] my-2 p-3 rounded-md space-y-2"
          >
            <div className="flex justify-between items-center">
              <p className="w-[12vw] h-[4vh] animate-pulse bg-gray-400"></p>
              <p className="w-[12vw] h-[4vh] animate-pulse bg-gray-400"></p>
            </div>
  
            <ul>
              <li>
                <p className="w-[12vw] h-[4vh] animate-pulse bg-gray-400"></p>
              </li>
            </ul>
  
            <p className="w-[12vw] h-[4vh] animate-pulse bg-gray-400"></p>
            <p className="w-[12vw] h-[4vh] animate-pulse bg-gray-400"></p>
          </div>
        ))}
      </div>
    );
  }
  

  return (
    <div>
      <h2 className='text-xl text-center md:mt-0 mt-6'>Vendor History</h2>
      {vendorHistoryData && vendorHistoryData.length > 0 ? (
        <div>
          {vendorHistoryData.map((sheet) => (
            <div key={sheet._id} className='bg-[#E2EBDF] my-2 p-3 rounded-md space-y-2'>
              <div className="flex justify-between items-center">
                <h3 className='font-semibold'>{sheet.name}</h3>
                <p className='underline'>{sheet.reason}</p>
              </div>

              <ul>
                {sheet.serialNumbers.map((serial, index) => (
                  <li key={index} className='flex justify-between '>
                    <p>Serial: {serial.serialNumber}</p>
                    <p>Status: {serial.status}</p>
                    <p>Download: {serial.download ? "Yes" : "No"}</p>
                  </li>
                ))}
              </ul>

              <p>{sheet.place}</p>
              <p className='text-end'> <TimeConverter date={sheet.date} /></p>
            </div>
          ))}

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
        </div>
      ) : (
        <p>No vendor history available.</p>
      )}
    </div>
  );
};

export default SingleVendorHistory;
