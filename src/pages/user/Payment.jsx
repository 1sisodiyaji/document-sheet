import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error("Failed to load script."));
    document.body.appendChild(script);
  });
};

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { amount, name, sheetID, serialNumber } = location.state || {};
  const isPaymentInitialized = useRef(false);

  isPaymentInitialized.current = true;

  useEffect(() => {
    if (!amount || !name || !sheetID || !serialNumber) {
      toast.error("Missing or invalid payment details!");
      navigate("/create-new-sheet");
      return;
    }

    const loadRazorpay = async () => {
      try {
        if (!window.Razorpay) {
          await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        }
        displayRazorpay();
      } catch (error) {
        console.error("Error loading Razorpay:", error);
        toast.error("Failed to load Razorpay SDK!");
      }
    };

    const displayRazorpay = async () => {
      try {
        if (!window.Razorpay) {
          console.error("Razorpay SDK not loaded!");
          toast.error("Razorpay failed to initialize. Please try again.");
          return;
        }

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/user/create-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount, name, sheetID, serialNumber }),
        });

        const data = await response.json();
        console.log(data);
        if (!data || !data.orderID) {
          throw new Error("Order ID not received.");
        }
        const orderId = data.orderID;

        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Razorpay Key ID
          amount: amount * 100,
          currency: "INR",
          name: "Document Sheet",
          description: "Test Payment",
          order_id: orderId,
          handler: async (paymentResponse) => {

            // Pass payment response to the server for verification
            try {
              const verifyResponse = await fetch(
                `${process.env.REACT_APP_BASE_URL}/api/user/verify-payment`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    paymentID: paymentResponse.razorpay_payment_id,
                    orderID: paymentResponse.razorpay_order_id,
                    signature: paymentResponse.razorpay_signature,
                  }),
                }
              );

              const verifyResult = await verifyResponse.json();
              console.log(verifyResult);
              if (verifyResult.success) {
                toast.success("Payment successfully verified!");
                const sheetId = sheetID; 
                window.history.replaceState(null, "");
                navigate("/feedback", { state: { sheetId } });
              } else {
                toast.error("Payment verification failed!");
              }
            } catch (error) {
              console.error("Error verifying payment:", error.message);
              toast.error("Payment verification failed. Please contact support.");
            }
          },
          prefill: {
            name: "Customer Name",
            email: "customer@example.com",
            contact: "1234567890",
          },
          theme: { color: "#F37254" },
          modal: {
            ondismiss: () => {
              toast.error("Payment window closed!");
            },
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } catch (error) {
        console.error("Error in displayRazorpay:", error.message);
        toast.error("Failed to initiate payment. Please try again.");
      }
    };


    loadRazorpay();
  }, [amount, name, sheetID, serialNumber, navigate]);

  if (isPaymentInitialized.current) return ;

  return (
    <div className="h-screen overflow-hidden flex justify-center items-center p-1">
      <div className="bg-gradient-to-l from-[#D1E1D0] to-[#EFC989] md:py-24 md:px-40 py-6 px-12 animate-pulse rounded-xl">
        <p className="md:text-3xl text-xl flex">
          Processing your payment...
          <div className="flex items-center justify-center overflow-hidden">
            <div className="w-8 h-8 border-4 border-green-500 border-dotted rounded-full animate-spin"></div>
          </div>
        </p>
      </div>
    </div>
  );
};

export default Payment;
