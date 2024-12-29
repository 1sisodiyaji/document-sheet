import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import Skeleton from "../../common/Skeleton";

const RecentsSheet = () => {
    const [recents, setRecents] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const token = Cookies.get("Vendor-document-sheet-token-#VDST");
        if (!token) {
            toast.error("Token not found.");
            return;
        }

        const fetchHistory = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/api/vendor/all-history`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.success === false) {
                    setLoading(false);
                    toast.error("Failed to fetch history.");
                } else {
                    setLoading(false);
                    setRecents(response.data.result.sheets);
                }
            } catch (error) {
                console.error("Error fetching history:", error.response?.data || error.message);
                toast.error("Failed to fetch history. Please try again.");
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);


    return (
        <>
            {loading ? <Skeleton limit={3} /> :
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        {recents ? recents.slice(0, 3).map((item, index) => (
                            <div key={index}
                                className="bg-gradient-to-r from-[#F5DCB2] to-[#E2EBDF] p-4 rounded-lg shadow-md space-y-4"
                            >
                                {item.serialNumbers.map((serial, idx) => (
                                    <div key={idx} className="flex justify-between items-center">
                                        <p className="text-md font-semibold">{serial.serialNumber}</p>
                                        <p
                                            className={`font-semibold ${serial.status === "completed"
                                                ? "text-green-600"
                                                : serial.status === "pending"
                                                    ? "text-orange-500"
                                                    : "text-red-600"
                                                }`}
                                        >
                                            {serial.status.charAt(0).toUpperCase() + serial.status.slice(1)}
                                        </p>
                                    </div>
                                ))}
                                <div className="flex justify-between items-center">
                                    <p className="text-lg font-bold">{item.name}</p>
                                    <p className="text-sm text-gray-700">Amount: ₹{item.amount}</p>
                                </div>
                            </div>
                        ))
                            :
                            <>
                                <div className="capitalize"> Hey you Have not Created any sheet Yet ?</div>
                            </>
                        }
                    </div>
                </>}
        </>
    )
}

export default RecentsSheet