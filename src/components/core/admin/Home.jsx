import React, { useEffect, useState } from "react";
import ChartComponent from "../../common/Chart";
import axios from "axios";
import toast from "react-hot-toast";
import Skeleton from "../../common/Skeleton";

const Home = () => {
  const [userGraphData, setUserGraphData] = useState(null);
  const [paymentGraphData, setPaymentGraphData] = useState(null);
  const [vendorGraphData, setVendorGraphData] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [count, setCount] = useState('0');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        setLoading(true);

        // Fetch data for user and vendor in parallel
        const [userResponse, vendorResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/graph-data-for-user`),
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/graph-data-for-vendor`),
        ]);

        // Process data into chart-friendly format
        const processedUserData = processGraphData(userResponse.data.data);
        const processedVendorData = processGraphData(vendorResponse.data.data);

        setUserGraphData(processedUserData);
        setVendorGraphData(processedVendorData);
      } catch (error) {
        console.error("Error fetching graph data:", error);
        toast.error("Failed to fetch graph data.");
      } finally {
        setLoading(false);
      }
    };
    const fetchPaymentStats = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/graph-data-for-payments`);
        const data = processPaymentGraphData(response.data.data);
        setPaymentGraphData(data);
      } catch (error) {
        console.error("Error fetching payment stats:", error.message);
        toast.error("Failed to fetch payment stats.");
      } finally {
        setLoading(false);
      }
    };

    const getFeedback = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/get-feedback`);
        console.log(response);
        if (response.data.success === true) {
          setFeedback(response.data.data);
          setCount(response.data.count);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getFeedback();
    fetchPaymentStats();
    fetchGraphData();
  }, []);

  const processGraphData = (data) => {
    if (!data || data.length === 0) {
      return null; // Handle empty data
    }

    // Month names for better readability
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Extract labels and counts
    const labels = data.map(
      (item) => `${monthNames[item._id.month - 1]} ${item._id.year}` // Convert month number to name
    );
    const counts = data.map((item) => item.count);

    return {
      labels,
      datasets: [
        {
          label: "Sheets Processed",
          data: counts,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          tension: 0.4, // Smooth line for line chart
        },
      ],
    };
  };

  const processPaymentGraphData = (data) => {
    const labels = data.map((item) => item.month); // Month names
    const counts = data.map((item) => item.count); // Transaction counts
    const amounts = data.map((item) => item.totalAmount); // Total amounts

    return {
      labels,
      datasets: [
        {
          label: "Transactions",
          data: counts,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Total Amount (₹)",
          data: amounts,
          backgroundColor: "rgba(255, 159, 64, 0.2)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  if (loading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <Skeleton/>
        <p>Loading graphs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border-2 border-green-400 shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">User Activity (Monthly)</h2>
          {userGraphData ? (
            <ChartComponent chartType="line" chartData={userGraphData} chartOptions={{ responsive: true }} />
          ) : (
            <p>No data available for users.</p>
          )}
        </div>

        {/* Bar Chart for Vendors */}
        <div className="bg-white border-2 border-orange-400 shadow-2xl rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Vendor Activity (Monthly)</h2>
          {vendorGraphData ? (
            <ChartComponent chartType="bar" chartData={vendorGraphData} chartOptions={{ responsive: true }} />
          ) : (
            <p>No data available for vendors.</p>
          )}
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border-2 border-orange-300 shadow-2xl shadow-orange-100 rounded-lg p-4">
          <h1 className="text-2xl font-bold">Payment Stats</h1>
          {paymentGraphData ? (
            <ChartComponent
              chartType="bar"
              chartData={paymentGraphData}
              chartOptions={{ responsive: true }}
            />
          ) : (
            <p>No payment data available.</p>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-semibold">Feedbacks</h1>
            <p className="w-8 h-8 rounded-full bg-green-200 flex justify-center items-center">{count}</p>
          </div>

          <div className="flex flex-wrap justify-end gap-4">

            {feedback  && feedback.map((feedback, index) => (
              <div
                key={feedback._id}
                className={`p-4 bg-white border border-orange-200 shadow rounded-lg w-full ${index === 2 ? 'md:w-full' : 'md:w-64'}`}
              >
                <h3 className="text-lg font-semibold text-gray-800 text-center">{feedback.name}</h3>
                <p className="text-sm text-gray-500"><i className="fi fi-sr-envelope text-gray-900"></i> {feedback.email}</p>
                <p className="text-sm text-gray-500"><i className="fi fi-sr-phone-call text-gray-900"></i> {feedback.mobile}</p>
                <p className="mt-2 text-gray-600 bg-orange-100 p-2 rounded-md"><i className="fi fi-sr-messages text-gray-900"></i>  {feedback.message}</p>
                <p className="mt-2 text-xs text-gray-400 text-end">
                  {new Date(feedback.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
