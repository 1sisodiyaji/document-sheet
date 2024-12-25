import React, { useState } from 'react';
import CreateSheet from '../../data/CreateSheet.json';
import { Player } from '@lottiefiles/react-lottie-player';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import StatesData from '../../data/AddressData.json';
import Banner from '../../components/common/Banner';
import { useNavigate } from 'react-router-dom';

const CreateNewSheet = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [docData, setDocData] = useState({
    UserName: '',
    Reason: '',
    Village: '',
    Post: '',
    state: '',
    District: '',
    Date: '',
    NumberOfSheet: '',
  });

  const [errors, setErrors] = useState({
    UserName: '',
    Reason: '',
    Village: '',
    Post: '',
    state: '',
    District: '',
    Date: '',
    NumberOfSheet: '',
  });

  const validateFields = () => {
    const tempErrors = {};
    let isValid = true;

    Object.entries(docData).forEach(([key, value]) => {
      if (!value) {
        tempErrors[key] = `${key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())} is required`;
        isValid = false;
      }
    });

    setErrors(tempErrors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDocData({
      ...docData,
      [name]: value,
      ...(name === 'state' && { District: '' }), // Reset District if state changes
    });
  };

  const districts = docData.state
    ? StatesData.find((state) => state.state === docData.state)?.districts || []
    : [];

  const generateRange = (start, end) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const onHandleDocCreated = async () => {
    if (!validateFields()) {
      toast.error('Please fill all the fields');
      return;
    }

    const today = new Date();
    const todayFormatted = today.toISOString().split('T')[0];

    if (docData.Date < todayFormatted) {
      toast.error('Please do not select past dates.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/create-sheet`, docData);

      if (response.success === false) {
        toast.error('Failed to Create Sheet');
        return;
      }

      const sheetID = response.data.data._id;
      const amount = response.data.data.amount;
      const name = docData.UserName;
      const serialNumber = response.data.data.serialNumbers.map((item) => item.serialNumber);
      navigate('/payment', { state: { amount, name, sheetID, serialNumber } });
    } catch (error) {
      console.error('Error creating sheet:', error.response?.data || error.message);
      toast.error('Failed to create sheet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Banner title="Create Your Sheet" text="Fill your information correctly and get your sheet" />
      <div className="max-w-7xl mx-auto">

        <div className="flex md:flex-row flex-col-reverse justify-center items-center py-6 md:mb-0 mb-16 px-2 mx-auto w-full">
          <div className="md:w-2/3 w-full space-y-4">
            {/* Input fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col p-4 border-2 border-gray-200 rounded-lg">
                <label className="mb-2 font-medium text-gray-700" htmlFor="UserName">
                  Your Name
                </label>
                <input
                  type="text"
                  name="UserName"
                  value={docData.UserName}
                  onChange={handleInputChange}
                  id="UserName"
                  placeholder="Enter Your Name"
                  className="py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500 ring-4 ring-green-100"
                />
                {errors.UserName && <p className="text-red-500 text-xs">{errors.UserName}</p>}
              </div>

              <div className="flex flex-col p-4 border-2 border-gray-200 rounded-lg">
                <label className="mb-2 font-medium text-gray-700" htmlFor="Reason">
                  Reason
                </label>
                <input
                  type="text"
                  name="Reason"
                  value={docData.Reason}
                  onChange={handleInputChange}
                  id="Reason"
                  placeholder="Enter Reason"
                  className="py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500 ring-4 ring-green-100"
                />
                {errors.Reason && <p className="text-red-500 text-xs">{errors.Reason}</p>}
              </div>
            </div>

            {/* Village and Post */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col p-4 border-2 border-gray-200 rounded-lg">
                <label className="mb-2 font-medium text-gray-700" htmlFor="Village">
                  Village
                </label>
                <input
                  type="text"
                  name="Village"
                  value={docData.Village}
                  onChange={handleInputChange}
                  id="Village"
                  placeholder="Enter Your Village"
                  className="py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500 ring-4 ring-green-100"
                />
                {errors.Village && <p className="text-red-500 text-xs">{errors.Village}</p>}
              </div>

              <div className="flex flex-col p-4 border-2 border-gray-200 rounded-lg">
                <label className="mb-2 font-medium text-gray-700" htmlFor="Post">
                  Post
                </label>
                <input
                  type="text"
                  name="Post"
                  value={docData.Post}
                  onChange={handleInputChange}
                  id="Post"
                  placeholder="Enter Post"
                  className="py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500 ring-4 ring-green-100"
                />
                {errors.Post && <p className="text-red-500 text-xs">{errors.Post}</p>}
              </div>
            </div>

            {/* State, District, and Date */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col p-4 border-2 border-gray-200 rounded-lg">
                <label className="mb-2 font-medium text-gray-700" htmlFor="state">
                  Select State
                </label>
                <select
                  id="state"
                  name="state"
                  value={docData.state}
                  onChange={handleInputChange}
                  className="py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500 ring-4 ring-green-100"
                >
                  <option value="">Select State</option>
                  {StatesData.map((state, index) => (
                    <option key={index} value={state.state}>
                      {state.state}
                    </option>
                  ))}
                </select>
                {errors.state && <p className="text-red-500 text-xs">{errors.state}</p>}
              </div>

              {docData.state && (
                <div className="flex flex-col p-4 border-2 border-gray-200 rounded-lg">
                  <label className="mb-2 font-medium text-gray-700" htmlFor="District">
                    Select District
                  </label>
                  <select
                    id="District"
                    name="District"
                    value={docData.District}
                    onChange={handleInputChange}
                    className="py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500 ring-4 ring-green-100"
                  >
                    <option value="">Select District</option>
                    {districts.map((district, index) => (
                      <option key={index} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                  {errors.District && <p className="text-red-500 text-xs">{errors.District}</p>}
                </div>
              )}

              <div className="flex flex-col p-4 border-2 border-gray-200 rounded-lg">
                <label className="mb-2 font-medium text-gray-700" htmlFor="Date">
                  Select Date
                </label>
                <input
                  type="date"
                  name="Date"
                  value={docData.Date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={handleInputChange}
                  id="Date"
                  className="py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500 ring-4 ring-green-100"
                />
                {errors.Date && <p className="text-red-500 text-xs">{errors.Date}</p>}
              </div>
            </div>

            <div className="flex md:flex-row flex-col gap-4">
              {/* Number of Sheets */}
              <div className="flex flex-col p-4 border-2 border-gray-200 rounded-lg w-full ">
                <label className="mb-2 font-medium text-gray-700" htmlFor="NumberOfSheet">
                  Number Of Sheets
                </label>
                <select
                  id="NumberOfSheet"
                  name="NumberOfSheet"
                  value={docData.NumberOfSheet}
                  onChange={handleInputChange}
                  className="py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500 ring-4 ring-green-100"
                >
                  <option value="">Select Number</option>
                  {generateRange(1, 5).map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
                {errors.NumberOfSheet && <p className="text-red-500 text-xs">{errors.NumberOfSheet}</p>}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center items-center p-1">
                <button
                  disabled={loading}
                  onClick={onHandleDocCreated}
                  className={`w-80 h-12 py-3 rounded-xl focus:outline-none ring-2 transition-all duration-700 ring-green-100 bg-green-300 text-black hover:bg-green-400 ${loading ? 'cursor-not-allowed opacity-50' : ''
                    }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-t-transparent border-black rounded-full animate-spin"></div>
                      <span className="ml-2">Creating...</span>
                    </div>
                  ) : (
                    'Create Sheet'
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="hidden md:block md:w-1/3 w-full">
            <Player autoplay loop src={CreateSheet} style={{ height: 'auto', width: '100%' }} />
          </div>
        </div>

      </div>
    </>
  );
};

export default CreateNewSheet;
