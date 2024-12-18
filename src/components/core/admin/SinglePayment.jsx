import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import TimeConverter from "../../../utils/TimeConverter";

const SinglePayment = ({ paymentID }) => { 
  const [transcationData, setTranscationData] = useState("");
  
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
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/get-payments/${paymentID}`);
        console.log(response);
        const data = response.data.data;
        setTranscationData(data);
        toast.success("Payment Fetched Successfully");
      } catch (error) {
        console.error("Error fetching Payment details:", error);
        toast.error("Failed to fetch Payment details.");
      }
    };

    fetchSheetDeatils();
  }, [paymentID]);

  if(!paymentID){
    return toast.error("No Payment ID Found");
  }

  return (
    <>
    
      <div className="flex  flex-col items-center ">
        <div className="min-w-4xl p-6  min-h-96 space-y-6 border-2 border-green-200 rounded-xl shadow-md">
              
              <div className="flex  justify-between items-center gap-2">
                <p className="text-lg"> ID :{transcationData.transactionID}</p>
                <i
                  className="fi fi-tr-copy-alt cursor-pointer"
                  onClick={() => handleCopy(transcationData.transactionID)}
                ></i>
              </div>  
              
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Name :</p>   <p className="text-lg">{transcationData.Name} </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Status :</p>   <p className="text-lg"> {transcationData.status} </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Amount :</p>   <p className="text-lg">{transcationData.amount} </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Serial Number :</p>   <p className="text-lg ps-2">{transcationData.serialNumber} </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Date :</p>   <p className="text-lg"> <TimeConverter date={transcationData.createdAt} /></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SinglePayment