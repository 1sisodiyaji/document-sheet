 import React, { useState } from "react";
import { toast } from 'react-hot-toast';

const ContactPageMessage = () => { 
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        message: "",
    }); 
    const [isLoading, setIsLoading] = useState(false); 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const { name, email, mobile, message } = formData;

        if (!name.trim()) {
            
            toast.error("Name is required!");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim() || !emailRegex.test(email)) {
            toast.error("Valid email is required!");
            return false;
        }

        if (!mobile.trim() || !/^\d{10}$/.test(mobile)) {
            toast.error("Valid 10-digit mobile number is required!");
            return false;
        }

        if (!message.trim()) {
            toast.error("Message cannot be empty!");
            return false;
        }

        return true;
    }; 

    const handleSubmit = async (e) => {
        e.preventDefault();
 
        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/user/feedback`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success("Feedback submitted successfully!");
                setFormData({ name: "", email: "", mobile: "", message: "" });
            } else {
                toast.error("Failed to submit feedback. Try again.");
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
            toast.error("An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="flex flex-col md:flex-row items-start space-y-4 md:py-6  md:pb-0 pb-20 md:space-y-0 md:space-x-4 ">
                <div className="w-full md:w-1/2 p-4">
                    <iframe
                        src="https://lottie.host/embed/d6822f26-b60e-4b30-a3dd-5684a85a6223/bBLzC6lflG.lottie"
                        className="w-full md:h-[50vh]"
                        frameBorder="0"
                        title="contact-animations"
                    ></iframe>
                </div>
                <div className="w-full md:w-1/2 p-4 bg-gray-50 rounded-lg shadow border-2">
                    <form className="max-w-3xl" onSubmit={handleSubmit}>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full mt-2 p-2 border border-gray-400 rounded-md"
                            required
                        />

                        <label>Email</label>
                        <input
                            type="email"
                            name="email"

                            value={formData.email}
                            onChange={handleChange}
                            className="w-full mt-2 p-2 border border-gray-400 rounded-md"
                            required
                        />

                        <label>Mobile Number</label>
                        <input
                            type="number"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            className="w-full mt-2 p-2 border border-gray-400 rounded-md"
                            required
                            maxLength={10}
                        />

                        <label>Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full mt-2 p-2 border border-gray-400 rounded-md"
                            rows="4"
                            required
                        />

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full mt-4 p-2 font-regular rounded-md ${isLoading
                                    ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                                    : "bg-[#219B9D] hover:bg-[#1A776F] text-white"
                                }`}
                        >
                            {isLoading ? (
                                <div className="flex justify-center items-center space-x-2">
                                    <span>Loading</span>
                                    <div role="status" className="overflow-y-hidden">
                                        <svg
                                            aria-hidden="true"
                                            className="w-6 h-5 text-gray-200 animate-spin fill-green-600"
                                            viewBox="0 0 100 101"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentFill"
                                            />
                                        </svg>
                                    </div>
                                </div>

                            ) : (
                                "Raise a Query"
                            )}

                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ContactPageMessage;
