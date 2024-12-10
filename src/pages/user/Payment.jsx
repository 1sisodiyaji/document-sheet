import React, { useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const amount = location.state?.amount;
  const name = location.state?.name;
  const sheetID = location.state?.sheetID; 

  useEffect(() => {
    if (!amount || amount <= 0) {
      toast.error("Invalid payment amount!");
      navigate("/create-new-sheet");
    }

    const loadRazorpay = async () => {
      try {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = displayRazorpay;
        script.onerror = () => toast.error("Failed to load Razorpay SDK!");
        document.body.appendChild(script);
      } catch (error) {
        console.error("Error loading Razorpay:", error);
      }
    };

    const displayRazorpay = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/user/create-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount,name,sheetID }),
        });

        if (!res.ok) throw new Error("Failed to create order.");
        const { id: orderId } = await res.json();

        const options = {
          key: `${process.env.REACT_APP_RAZORPAY_KEY_ID}`,
          amount: amount * 100,
          currency: "INR",
          name: "Document Sheet",
          description: "Test Payment",
          order_id: orderId,
          handler: (response) => {
            toast.success("Payment successful!");
            console.log("Payment details:", response);
            navigate("/feedback");
          },
          prefill: {
            name: "Customer Name",
            email: "customer@example.com",
            contact: "1234567890",
          },
          theme: {
            color: "#F37254",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } catch (error) {
        console.error("Error during payment:", error);
        toast.error("Payment failed! Please try again.");
      }
    };

    loadRazorpay();
  }, [name,sheetID,amount, navigate]);

  return <div className="h-screen overflow-hidden  flex justify-center items-center p-1">
    <div className="bg-gradient-to-l from-[#D1E1D0] to-[#EFC989]  md:py-24 md:px-40 py-6 px-12 animate-pulse rounded-xl">
     <p className="md:text-3xl text-xl flex">Processing your payment...<div className="flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-green-500 border-dotted rounded-full animate-spin"></div>
    </div> </p>
    </div>
   
    
    </div>;
};

export default Payment;
