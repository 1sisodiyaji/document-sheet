import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const Sheet = () => {
    const [sheetId, setSheetId] = useState('');
    const [serialNumbers, setSerialNumbers] = useState([]);
    const [currentSerial, setCurrentSerial] = useState('');
    const [updatedSheet, setUpdatedSheet] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && currentSerial.trim() !== '') {
            e.preventDefault();
            if (!serialNumbers.includes(currentSerial.trim())) {
                setSerialNumbers([...serialNumbers, currentSerial.trim()]);
                setCurrentSerial('');
            } else {
                toast.error('This serial number is already added.');
            }
        }
    };

    const handleRemoveTag = (index) => {
        const updatedSerials = serialNumbers.filter((_, i) => i !== index);
        setSerialNumbers(updatedSerials);
    };

    const handleSubmit = async () => {
        if (!sheetId || serialNumbers.length === 0) {
            toast.error('Please provide both Sheet ID and at least one Serial Number.');
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/cancel-sheet`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sheetId,
                    serialNumbers,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to cancel the sheet');
            }

            const data = await response.json();
            toast.success(data.message || 'Sheet canceled successfully');
            setUpdatedSheet(data.updatedSheet); // Save the updated sheet
            setSheetId('');
            setSerialNumbers([]);
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
        <div className='flex  items-center'>
            <img src="https://res.cloudinary.com/dlgyf2xzu/image/upload/v1733941760/image_19_gsh3ic.png" alt="sheet" className='w-16' loading='lazy' />
           <h1 className='text-2xl font-semibold mx-4 '> Cancel Yor Sheet at ease. </h1> 
        </div>
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
                <h1 className="text-lg font-bold text-red-400 mb-4">Cancel Sheet</h1>

                {/* Sheet ID Field */}
                <div className="mb-4 p-1">
                    <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="sheetId">
                        Sheet ID
                    </label>
                    <input
                        id="sheetId"
                        type="text"
                        value={sheetId}
                        onChange={(e) => setSheetId(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:outline-none"
                        placeholder="Enter Sheet ID"
                    />
                </div>

                {/* Serial Numbers Input */}
                <div className="mb-4 p-1">
                    <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="serialNumbers">
                        Serial Numbers
                    </label>
                    <input
                        id="serialNumbers"
                        type="text"
                        value={currentSerial}
                        onChange={(e) => setCurrentSerial(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:outline-none"
                        placeholder="Enter Serial Number and press Enter"
                    />
                    <div className="mt-2 flex flex-wrap">
                        {serialNumbers.map((serial, index) => (
                            <div
                                key={index}
                                className="flex items-center bg-green-100 px-3 py-1 mr-2 mb-2 text-sm rounded-lg shadow-sm"
                            >
                                <span className="mr-2">{serial}</span>
                                <button
                                    className="text-red-500 focus:outline-none"
                                    onClick={() => handleRemoveTag(index)}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className={`w-full py-2 rounded-lg ${isLoading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
                        } text-white font-semibold`}
                >
                    {isLoading ? 'Processing...' : 'Cancel Sheet'}
                </button>

                {/* Display Updated Sheet */}
                {updatedSheet && (
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold text-gray-700">Updated Sheet:</h2>
                        <p><strong>Name:</strong> {updatedSheet.name}</p>
                        <p><strong>Place:</strong> {updatedSheet.place}</p>
                        <p><strong>Reason:</strong> {updatedSheet.reason}</p>
                        <p><strong>Amount:</strong> {updatedSheet.amount}</p>
                        <p><strong>Status:</strong> {updatedSheet.payment ? 'Paid' : 'Not Paid'}</p>
                        <p><strong>Updated Serial Numbers:</strong></p>
                        <ul className="list-disc ml-6">
                            {updatedSheet.serialNumbers.map((sn, index) => (
                                <li key={index}>
                                    <img src={sn.qrcodes} alt="qr code" className="w-12 h-12" />
                                    {sn.serialNumber} - <span className={sn.status === 'cancelled' ? 'text-red-300' : 'text-gray-700'}> {sn.status}</span> - download {sn.download ? 'true' : 'false'}
                                </li>
                            ))}
                        </ul>

                    </div>
                )}
            </div>
        </div>
        </>
    );
};

export default Sheet;
