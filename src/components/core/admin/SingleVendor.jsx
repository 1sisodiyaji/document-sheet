import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import TimeConverter from "../../../utils/TimeConverter";
import SingleVendorHistory from "./SingleVendorHistory";

const SingleVendor = ({ vendorId }) => {
  const [vendorData, setVendorData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        setIsLoading(true); // Show loading state
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/admin/all-vendors/${vendorId}`);
        setVendorData(response.data.data); // Update vendor data
        toast.success("Vendor data fetched successfully!");
      } catch (error) {
        console.error("Error fetching vendor data:", error);
        toast.error("Failed to fetch vendor data.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchVendorData();
  }, [vendorId]);

  if (!vendorId) {
    toast.error("Vendor ID is missing.");
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      {isLoading ? (
         <>
         <div className="min-w-4xl p-6 min-h-96 space-y-6 border-2 border-green-200 rounded-xl shadow-md">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Vendor ID:</p>
            <p className="w-[12vw] h-[4vh] animate-pulse bg-gray-400"></p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Name:</p>
            <p className="w-[12vw] h-[4vh] animate-pulse bg-gray-400"></p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Email:</p>
            <p className="w-[12vw] h-[4vh] animate-pulse bg-gray-400"></p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Status:</p>
            <p className="w-[12vw] h-[4vh] animate-pulse bg-gray-400"></p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Total Sheets:</p>
            <p className="w-[12vw] h-[4vh] animate-pulse bg-gray-400"></p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Assigned Sheets:</p>
            <p className="w-[12vw] h-[4vh] animate-pulse bg-gray-400"></p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Allocated Left:</p>
            <p className="w-[12vw] h-[4vh] animate-pulse bg-gray-400"></p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Login Count:</p>
            <p className="w-[12vw] h-[4vh] animate-pulse bg-gray-400"></p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Created At:</p>
            <p className="w-[12vw] h-[4vh] animate-pulse bg-gray-400"></p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Updated At:</p>
            <p className="w-[12vw] h-[4vh] animate-pulse bg-gray-400"></p>
          </div>
        </div>
         </>
      ) : (
        <>
        <div className="flex md:flex-row flex-col justify-around w-full">
        <div className="min-w-4xl p-6 min-h-96 space-y-6 border-2 border-green-200 rounded-xl shadow-md">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Vendor ID:</p>
            <p className="text-lg">{vendorData.id}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Name:</p>
            <p className="text-lg">{vendorData.name}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Email:</p>
            <p className="text-lg">{vendorData.email}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Status:</p>
            <p className="text-lg">{vendorData.status}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Total Sheets:</p>
            <p className="text-lg">{vendorData.totalSheets}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Assigned Sheets:</p>
            <p className="text-lg">{vendorData.assignedSheets}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Allocated Left:</p>
            <p className="text-lg">{vendorData.allocatedLeft}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Login Count:</p>
            <p className="text-lg">{vendorData.loginCount}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Created At:</p>
            <p className="text-lg">
              <TimeConverter date={vendorData.createdAt} />
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Updated At:</p>
            <p className="text-lg">
              <TimeConverter date={vendorData.updatedAt} />
            </p>
          </div>
        </div> 
        <SingleVendorHistory vendorId ={ vendorId}/>
        </div>
        </>
      )}
    </div>
  );
};

export default SingleVendor;
