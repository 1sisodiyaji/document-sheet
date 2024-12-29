import React, { useState } from "react";
import { toast } from "react-toastify";

const Sheet = () => {
  const [serialSearch, setSerialSearch] = useState("");
  const [serialNumbersData, setSerialNumbersData] = useState([]);
  const [selectedSerialNumbers, setSelectedSerialNumbers] = useState([]);
  const [sheetId, setSheetId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!serialSearch.trim()) {
      toast.error("Please enter a serial number to search.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/admin/search-serial-number/${serialSearch.trim()}`
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: Unable to fetch data.`);
      }

      const data = await response.json();

      if (data.success && data.response) {
        const { serialNumbers, _id: sheetId, name, place } = data.response;

        if (serialNumbers && serialNumbers.length > 0) {
          setSerialNumbersData(serialNumbers);
          setSheetId(sheetId); // Store sheet ID in state
          toast.success(`Sheet found for ${name} at ${place}.`);
        } else {
          toast.error("No serial numbers found in the sheet.");
        }
      } else {
        toast.error(data.message || "No sheet found for the entered serial number.");
      }
    } catch (error) {
      console.error("Error fetching serial numbers:", error);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckboxChange = (serialNumber) => {
    setSelectedSerialNumbers((prev) =>
      prev.includes(serialNumber)
        ? prev.filter((sn) => sn !== serialNumber)
        : [...prev, serialNumber]
    );
  };

  const handleCancel = async () => {
    if (!sheetId || selectedSerialNumbers.length === 0) {
      toast.error("Please select serial numbers to cancel.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/admin/cancel-sheet`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sheetId,
            serialNumbers: selectedSerialNumbers,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel the sheet.");
      }

      const data = await response.json();
      toast.success(data.message || "Sheet canceled successfully.");
      setSerialNumbersData([]); // Clear the UI
      setSelectedSerialNumbers([]);
      setSheetId(null);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">

      {serialNumbersData.length > 0 ?
        <>
          <div className="w-full max-w-md ">
            <h1 className="text-lg font-bold text-green-500 mb-4">Select Serial Numbers to Cancel</h1>
            <ul>
              {serialNumbersData.map((serial, index) => (
                <li key={index} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`serial-${index}`}
                    checked={selectedSerialNumbers.includes(serial.serialNumber)}
                    onChange={() => handleCheckboxChange(serial.serialNumber)}
                    className="mr-2 cursor-pointer"
                  />
                  <label htmlFor={`serial-${index}`} className="text-sm text-gray-700">
                    {serial.serialNumber}
                  </label>
                </li>
              ))}
            </ul>
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className={`w-full mt-4 py-2 rounded-lg ${isLoading ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
                } text-white font-semibold`}
            >
              {isLoading ? "Processing..." : "Cancel Selected"}
            </button>
          </div>
        </>
        :
        <>
          <div className="w-full max-w-md  mb-6">
            <h1 className="text-lg font-bold text-green-500 mb-4">Search Serial Number</h1>
            <div className="mb-4 p-1">
              <input
                type="text"
                value={serialSearch}
                onChange={(e) => setSerialSearch(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:outline-none"
                placeholder="Enter Serial Number to Search"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className={`w-full py-2 rounded-lg ${isLoading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
                } text-white font-semibold`}
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div> 
        </>
      }

    </div>
  );
};

export default Sheet;
