import React, { useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player"; 
import { toast } from "react-hot-toast"; 
import axios from "axios";
import QRCODEANIMATION from "../../../../data/QR_Code_Animation.json";

const ScanTabs = () => { 
  const [serialNumber, setSerialNumber] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!serialNumber) {
      toast.error("Please enter a serial number!");
      return;
    }

    setLoading(true);
    setError(null); // Reset error state before making a new request

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/search-sheet`, {
        serialNumber
      });

      // Assuming the response contains the data we need
      const data = response.data;
      toast.success("See Your Bill");

      // Process data here (e.g., set modal data or state)
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again.");
      toast.error("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after request completes
    }
  };

  return (
    <section className="my-24 p-1">
      <div className="max-w-xl mx-auto flex justify-center space-x-6 bg-orange-100 p-3 rounded-full py-4">
        <button className="md:px-6 py-2 px-3 font-semibold md:text-sm text-xs rounded-lg transition-all bg-orange-400 text-white hover:bg-orange-500">
          Search by Serial Number
        </button>
      </div>

      {/* Tab Content */}
      <div className="py-16 p-1">
        <div className="max-w-7xl mx-auto rounded-lg md:p-8 p-2 flex justify-center border-dashed border-2 border-orange-300">
          <div className="w-1/3 hidden md:block">
            <Player autoplay loop src={QRCODEANIMATION} style={{ height: "auto", width: "100%" }} />
          </div>
          <div className="flex flex-col items-center md:w-2/3">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Search by Serial Number
            </h3>
            <p className="text-gray-600 mb-8">
              Enter the serial number associated with your document to retrieve the relevant data.
            </p>

            <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col space-y-4 p-1">
              <input
                type="text"
                placeholder="Enter Serial Number"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-all"
              >
                Fetch Data
              </button>
            </form>

            {loading && <p className="text-orange-500 mt-4">Searching...</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScanTabs;
