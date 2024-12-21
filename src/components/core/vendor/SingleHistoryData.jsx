import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import TimeConverter from "../../../utils/TimeConverter";

const SingleHistoryData = ({ serialNumber }) => {
  const [sheetData, setSheetData] = useState("");
  const [isloading,setIsloading]= useState(false);
  const handleCopy = (serialNumber) => {
    navigator.clipboard.writeText(serialNumber)
      .then(() => {
        toast.success("Serial number copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy serial number. Please try again.");
      });
  };

  const handleGetInvoice = async (sheetId) => {
    if (!sheetId) {
      toast.error("Sheet Not Found");
      return;
    }
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/genrate-bill/${sheetId}`,
        {
          responseType: "blob",
        }
      );
      if (response.status === 200) {
        const fileBlob = new Blob([response.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(fileBlob);
        const link = document.createElement("a");
        link.href = fileURL;
        link.download = `Invoice_${sheetId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(fileURL);
        toast.success("Your Invoice get Downloaded")
      } else {
        toast.error("Failed to Download Invoice");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to Download Invoice");
    }
  }
  
  useEffect(() => {
    const fetchSheetDeatils = async () => {
      try {
        setIsloading(true);
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/vendor/search-sheet/${serialNumber}`);
        const data = response.data.SheetDetails;
        setSheetData(data);
        toast.success("Sheet Data Fetched Successfully");
        setIsloading(false);
      } catch (error) {
        console.error("Error fetching vendor details:", error);
        toast.error("Failed to fetch vendor details.");
        setIsloading(false);
      }
    };

    fetchSheetDeatils();
  }, [serialNumber]);

  return (
    <>
      <div className="flex  justify-end items-center py-6">
         <button
          onClick={() => handleGetInvoice(sheetData._id)}
          className="px-4 py-2 rounded-md bg-[#C2E9DB] text-black">
          <i className="fi fi-tr-file-invoice"></i> Get Invoice
        </button>
      </div>

      <div className="flex  flex-col items-center ">
      {isloading 
        ?
      <>
      <div className="min-w-4xl p-6  min-h-96 space-y-6 border-2 border-green-200 rounded-xl shadow-md">
          {sheetData.serialNumbers && sheetData.serialNumbers.map((serial, index) => (
            <div key={index} className="flex justify-between items-center">
              <p className="font-semibold text-xl">Serial Number {index + 1}:</p>
              <div className="flex items-center gap-2">
              <p className="w-[12vw] h-[4vh] animate-pulse bg-gray-400"></p>
                <i
                  className="fi fi-tr-copy-alt cursor-pointer"
                  onClick={() => handleCopy(serial.serialNumber)}
                ></i>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Name :</p>   <p className="w-[12vw] h-[4vh] animate-pulse bg-gray-400"></p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Reason :</p>  <p className="w-[12vw] h-[4vh] animate-pulse bg-gray-400"></p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Amount :</p>   <p className="w-[12vw] h-[4vh] animate-pulse bg-gray-400"></p>
          </div>
          <div className="flex flex-wrap justify-between items-center">
            <p className="font-semibold text-xl">Place :</p>   <p className="w-[12vw] h-[4vh] animate-pulse bg-gray-400"></p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Date :</p>  <p className="w-[12vw] h-[4vh] animate-pulse bg-gray-400"></p>
          </div>
        </div>
      </>
      :
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
          <div className="flex flex-wrap justify-between items-center">
            <p className="font-semibold text-xl">Place :</p>   <p className="text-lg ps-2">{sheetData.place} </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Date :</p>   <p className="text-lg"> <TimeConverter date={sheetData.date} /></p>
          </div>
        </div>
}
      </div>
    </>
  )
}

export default SingleHistoryData