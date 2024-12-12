import  {useEffect, useState} from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import TimeConverter from "../../../utils/TimeConverter";

const SingleHistoryData = ({serialNumber}) => {
  const[sheetData, setSheetData]= useState("");

  const handleCopy = (serialNumber) => {
    navigator.clipboard.writeText(serialNumber)
      .then(() => {
        toast.success("Serial number copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy serial number. Please try again.");
      });
  };

  useEffect(() => {
    const fetchSheetDeatils = async () => {
      try {
        
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/vendor/search-sheet/${serialNumber}`);
        const data = response.data.SheetDetails;
        setSheetData(data);
        console.log(data);
        toast.success("Sheet Data Fetched Successfully");
      } catch (error) {
        console.error("Error fetching vendor details:", error);
        toast.error("Failed to fetch vendor details.");
      }
    };

    fetchSheetDeatils();
  }, [serialNumber]);
  return (
    <>
    <div className="flex  justify-between items-center py-6">
      <button className="px-4 py-2 rounded-md bg-[#F3DFCA]"><i className="fi fi-tr-shield-trust"></i> View Prof</button>
      <button className="px-4 py-2 rounded-md bg-[#C2E9DB] text-black"><i className="fi fi-tr-file-invoice"></i> Get Invoice </button>
    </div>

    <div className="flex  flex-col items-center ">
      <div className="min-w-4xl p-6  min-h-96 space-y-6 border-2 border-green-200 rounded-xl shadow-md">
        {sheetData.serialNumbers && sheetData.serialNumbers.map((serial, index) => (
          <div key={index} className="flex justify-between items-center">
            <p className="font-semibold text-xl">Serial Number {index + 1}:</p>
            <div className="flex items-center gap-2">
              <p className="text-lg">{serial.serialNumber}</p>
              <i
                className="fi fi-tr-copy-alt cursor-pointer"
                onClick={() => handleCopy(serial.serialNumber)}
              ></i>
            </div>
          </div>
        ))}

          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Name :</p>   <p className="text-lg">{sheetData.name} </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Reason :</p>   <p className="text-lg"> {sheetData.reason} </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Amount :</p>   <p className="text-lg">{sheetData.amount} </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Place :</p>   <p className="text-lg ps-2">{sheetData.place} </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Date :</p>   <p className="text-lg"> <TimeConverter date= {sheetData.date} /></p>
          </div>
          </div>
    </div> 
    </>
  )
}

export default SingleHistoryData