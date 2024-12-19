import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";

const Feedback = () => {
    const [feedback, setFeedback] = useState([]);
    const [feedbackCount, setFeedbackCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [singleFeedback, setSingleFeedback] = useState(false);
    const [singleFeedbackData, setSingleFeedbackData] = useState([]);
    const feedbackPerPage = 3;

    useEffect(() => {
        const getFeedback = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/get-feedback`, {
                    params: { page: currentPage, limit: feedbackPerPage },
                });

                if (response.data.success === true) {
                    toast.success("Feedback fetched");
                    setFeedback(response.data.data);
                    setFeedbackCount(response.data.count);
                }
            } catch (error) {
                console.log(error);
                toast.error("Failed to fetch feedback");
            }
        };

        getFeedback();
    }, [currentPage]);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(feedbackCount / feedbackPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };


    const getSingleFeedback = async (id) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/get-feedback/${id}`);

            if (response.data.success === true) {
                toast.success("Feedback fetched");
                setSingleFeedbackData(response.data.data)
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch feedback");
        }
    };


    const handleToogleFeedback = (id) => {
        getSingleFeedback(id);
        setSingleFeedback(!singleFeedback);
    }
    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-2xl font-semibold">Feedbacks</h1>
                <p className="w-8 h-8 rounded-full bg-green-200 flex justify-center items-center">{feedbackCount}</p>
            </div>
            {singleFeedback
                ?
                <>
                    <div className="my-2">
                    <button onClick={() => setSingleFeedback(false)}>
                        <i className="fi fi-rr-angle-small-left"></i> Back
                    </button>
                    </div>
                    <div className="p-4 bg-white border border-orange-200 shadow rounded-lg w-full md:w-96 cursor-pointer" >
                        <h3 className="text-lg font-semibold text-gray-800">{singleFeedbackData.name}</h3>
                        <p className="text-sm text-gray-500">{singleFeedbackData.email}</p>
                        <p className="text-sm text-gray-500">{singleFeedbackData.mobile}</p>
                        <p className="mt-2 text-gray-600">{singleFeedbackData.message}</p>
                        <p className="mt-2 text-xs text-gray-400">
                            {new Date(singleFeedbackData.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </>
                :
                <>
                    <div className="flex justify-center flex-wrap gap-4 md:my-24">
                        {feedback.map((feedbackItem) => (
                            <div
                                onClick={() => handleToogleFeedback(feedbackItem._id)}
                                key={feedbackItem._id}
                                className={`p-4 ${feedback.feedbackType === 'testimonial' ? 'bg-green-400' : 'bg-white'}border border-orange-200 shadow rounded-lg w-full md:w-80 cursor-pointer`}
                            >   
                            {feedback.feedbackType}
                            {feedback.feedbackType === "testimonial" ?
                            <>
                            Hey
                            </>
                            : 
                            <>
                             <h3 className="text-lg font-semibold text-gray-800">{feedbackItem.name}</h3>
                                <p className="text-sm text-gray-500">{feedbackItem.email}</p>
                                <p className="text-sm text-gray-500">{feedbackItem.mobile}</p>
                                <p className="mt-2 text-gray-600">{feedbackItem.message}</p>
                                <p className="mt-2 text-xs text-gray-400">
                                    {new Date(feedbackItem.createdAt).toLocaleDateString()}
                                </p>
                            </>
                            }
                               
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 bg-gray-200 rounded-lg ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-300'}`}
                        >
                            Previous
                        </button>

                        <p className="text-sm">
                            Page {currentPage} of {Math.ceil(feedbackCount / feedbackPerPage)}
                        </p>

                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === Math.ceil(feedbackCount / feedbackPerPage)}
                            className={`px-4 py-2 bg-gray-200 rounded-lg ${currentPage === Math.ceil(feedbackCount / feedbackPerPage) ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-300'}`}
                        >
                            Next
                        </button>
                    </div>
                </>
            }
        </>
    );
};

export default Feedback;
