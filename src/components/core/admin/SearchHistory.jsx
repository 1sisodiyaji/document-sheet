import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import TimeConverter from "../../../utils/TimeConverter";

const SearchHistory = ({ serialNumber }) => {
  const [sheetData, setSheetData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCopy = (serial) => {
    navigator.clipboard
      .writeText(serial)
      .then(() => toast.success("Serial number copied to clipboard!"))
      .catch(() => toast.error("Failed to copy serial number. Please try again."));
  };

  const handleGetInvoice = async (sheetId) => {
    if (!sheetId) {
      toast.error("Sheet Not Found");
      return;
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/user/genrate-bill/${sheetId}`,
        { responseType: "blob" }
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
        toast.success("Your Invoice has been downloaded");
      } else {
        toast.error("Failed to download invoice");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to download invoice");
    }
  };

  useEffect(() => {
    const fetchSheetDetails = async () => { 
      try {
        setIsLoading(true);
        const response = await axios.get( 
          `${import.meta.env.VITE_BASE_URL}/api/admin/search-serial-number/${serialNumber}`
        );
        const data = response.data.response;
        setSheetData(data);
        toast.success("Sheet data fetched successfully");
      } catch (error) {
        console.error("Error fetching sheet details:", error);
        toast.error("Failed to fetch sheet details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSheetDetails();
  }, [serialNumber]);

  return (
    <div>
      <div className="flex justify-between items-center rounded-md mb-2">
        <button className="px-4 py-2 rounded-md bg-[#F3DFCA]">
          <i className="fi fi-tr-shield-trust"></i> View Proof
        </button>
        <button
          onClick={() => handleGetInvoice(sheetData?._id)}
          className="px-4 py-2 rounded-md bg-[#C2E9DB] text-black"
        >
          <i className="fi fi-tr-file-invoice"></i> Get Invoice
        </button>
      </div>

      <div className="flex flex-col items-center">
        <div className="min-w-4xl p-4 min-h-96 space-y-2 border-2 border-green-200 rounded-xl shadow-md">
          {isLoading ? (
            <>
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex justify-between items-center"> 
                  <p className="w-[12vw] h-[4vh] animate-pulse bg-gray-400"></p>
                </div>
              ))}
            </>
          ) : (
            sheetData && (
              <>
                {sheetData.serialNumbers.map((serial, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <p className="font-semibold text-xl">
                      Serial Number {index + 1} :
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-md">{serial.serialNumber}</p>
                      <i
                        className="fi fi-tr-copy-alt cursor-pointer"
                        onClick={() => handleCopy(serial.serialNumber)}
                      ></i>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-xl">Name :</p>
                  <p className="text-md">{sheetData.name || "N/A"}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-xl">Reason :</p>
                  <p className="text-md">{sheetData.reason || "N/A"}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-xl">Amount :</p>
                  <p className="text-md">{sheetData.amount || "N/A"}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-xl">Role :</p>
                  <p className="text-md">{sheetData.role || "N/A"}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-xl">payment :</p>
                  <p className={`text-md ${sheetData.payment ? 'text-green-500' : 'text-red-500'}`}>{sheetData.payment ? 'Completed' : 'Failed' || "N/A"}</p>
                </div>
                <div className="flex flex-wrap justify-between items-center">
                  <p className="font-semibold text-xl">Place :</p>
                  <p className="text-md">{sheetData.place || "N/A"}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-xl">Date :</p>
                  <p className="text-md">
                    <TimeConverter date={sheetData.date} />
                  </p>
                </div>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchHistory;
