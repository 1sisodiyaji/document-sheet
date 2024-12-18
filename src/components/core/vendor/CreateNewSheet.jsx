import React, { useContext, useState } from 'react';
import CreateSheet from '../../../data/CreateSheet.json';
import { Player } from '@lottiefiles/react-lottie-player';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import axios from 'axios';
import { creatformContext } from '../../../pages/vendor/VendorDashboard';
import StatesData from '../../../data/AddressData.json';

const DownloadSheet = async (sheetId) => {
  if (!sheetId) {
    toast.error('Sheet Not Found');
    return;
  }
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/user/genrate-Sheet/${sheetId}`,
      {
        responseType: 'blob',
      }
    );
    if (response.status === 200) {
      const fileBlob = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(fileBlob);
      const link = document.createElement('a');
      link.href = fileURL;
      link.download = `Document-Sheet${sheetId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(fileURL);
      toast.success('Your Sheet has been downloaded');
    } else {
      toast.error('Failed to Download Sheet');
    }
  } catch (error) {
    console.error(error);
    toast.error('Failed to Download Sheet');
  }
};

const DownloadBill = async (sheetId) => {
  if (!sheetId) {
    toast.error('Sheet Not Found');
    return;
  }
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/user/genrate-bill/${sheetId}`,
      {
        responseType: 'blob',
      }
    );
    if (response.status === 200) {
      const fileBlob = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(fileBlob);
      const link = document.createElement('a');
      link.href = fileURL;
      link.download = `Invoice-${sheetId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(fileURL);
      toast.success('Your Invoice has been downloaded');
    } else {
      toast.error('Failed to Download Invoice');
    }
  } catch (error) {
    console.error(error);
    toast.error('Failed to Download Invoice');
  }
};

const CreateNewSheet = () => {
  const [loading, setLoading] = useState(false);
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

  const [errors, setErrors] = useState({});
  const { createsheet, setCreatesheet } = useContext(creatformContext);

  const validateFields = () => {
    const tempErrors = {};
    let isValid = true;

    Object.keys(docData).forEach((field) => {
      if (!docData[field]) {
        tempErrors[field] = `${field} is required`;
        isValid = false;
      }
    });

    setErrors(tempErrors);
    return isValid;
  };

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

    const token = Cookies.get('Vendor-document-sheet-token-#VDST');
    if (!token) {
      toast.error('Token not found.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/vendor/CreateSheetByVendor`,
        docData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.success === false) {
        toast.error('Failed to Create Sheet');
        return;
      }

      toast.success('Sheet created successfully!');

      setDocData({
        UserName: '',
        Reason: '',
        Village: '',
        Post: '',
        state: '',
        District: '',
        Date: '',
        NumberOfSheet: '',
      });

      const sheetID = response.data.data._id;
      await DownloadSheet(sheetID);
      await DownloadBill(sheetID);
      setCreatesheet(!createsheet);
    } catch (error) {
      console.error('Error creating sheet:', error.response?.data || error.message);
      toast.error('Failed to create sheet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDocData({ ...docData, [name]: value });
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setDocData({
      ...docData,
      state: selectedState,
      District: '', // Reset district when state changes
    });
  };

  const districts =
    StatesData.find((state) => state.state === docData.state)?.districts || [];

  return (
    <>
      <h1 className="text-3xl bg-gradient-to-r from-orange-400 via-green-500 to-teal-500 bg-clip-text text-transparent">
        Please Fill the details of Customer
      </h1>

      <div className="flex md:flex-row flex-col-reverse justify-center items-center pt-6 mx-auto w-full">
        <div className="md:w-2/3 w-full space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col p-4 border-2 border-gray-200 rounded-lg">
              <label className="mb-2 font-medium text-gray-700" htmlFor="name">
                Your Name
              </label>
              <input
                type="text"
                name="UserName"
                value={docData.UserName}
                onChange={handleInputChange}
                id="name"
                placeholder="Enter Your Name"
                className="py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500 ring-4 ring-green-100"
              />
              {errors.UserName && <p className="text-red-500 text-xs">{errors.UserName}</p>}
            </div>

            <div className="flex flex-col p-4 border-2 border-gray-200 rounded-lg">
              <label className="mb-2 font-medium text-gray-700" htmlFor="reason">
                Reason
              </label>
              <input
                type="text"
                name="Reason"
                value={docData.Reason}
                onChange={handleInputChange}
                id="reason"
                placeholder="Enter Reason"
                className="py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500 ring-4 ring-green-100"
              />
              {errors.Reason && <p className="text-red-500 text-xs">{errors.Reason}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col p-4 border-2 border-gray-200 rounded-lg">
              <label className="mb-2 font-medium text-gray-700" htmlFor="village">
                Village
              </label>
              <input
                type="text"
                name="Village"
                value={docData.Village}
                onChange={handleInputChange}
                id="village"
                placeholder="Enter Your Village"
                className="py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500 ring-4 ring-green-100"
              />
              {errors.Village && <p className="text-red-500 text-xs">{errors.Village}</p>}
            </div>

            <div className="flex flex-col p-4 border-2 border-gray-200 rounded-lg">
              <label className="mb-2 font-medium text-gray-700" htmlFor="post">
                Post
              </label>
              <input
                type="text"
                name="Post"
                value={docData.Post}
                onChange={handleInputChange}
                id="post"
                placeholder="Enter Post"
                className="py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500 ring-4 ring-green-100"
              />
              {errors.Post && <p className="text-red-500 text-xs">{errors.Post}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4">
            <div className="flex flex-col p-4 border-2 border-gray-200 rounded-lg">
              <label className="mb-2 font-medium text-gray-700" htmlFor="state">
                Select State
              </label>
              <select
                id="state"
                name="state"
                value={docData.state}
                onChange={handleStateChange}
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

            <div className="flex flex-col p-4 border-2 border-gray-200 rounded-lg">
              <label className="mb-2 font-medium text-gray-700" htmlFor="district">
                Select District
              </label>
              <select
                id="district"
                name="District"
                value={docData.District}
                onChange={handleInputChange}
                className="py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500 ring-4 ring-green-100"
                disabled={!docData.state}
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

            <div className="flex flex-col p-4 border-2 border-gray-200 rounded-lg md:mt-0 mt-4">
              <label className="mb-2 font-medium text-gray-700" htmlFor="date">
                Select Date
              </label>
              <input
                type="date"
                name="Date"
                value={docData.Date}
                min={(() => {
                  const today = new Date();
                  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
                  return today.toISOString().split('T')[0];
                })()}
                onChange={handleInputChange}
                id="date"
                className="py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500 ring-4 ring-green-100"
              />
              {errors.Date && <p className="text-red-500 text-xs">{errors.Date}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6">
            <div className="flex flex-col p-4 border-2 border-gray-200 rounded-lg col-span-2">
              <label className="mb-2 font-medium text-gray-700" htmlFor="noOfSheets">
                Number Of Sheets
              </label>
              <select
                id="noOfSheets"
                name="NumberOfSheet"
                value={docData.NumberOfSheet}
                onChange={handleInputChange}
                className="py-3 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500 ring-4 ring-green-100"
              >
                <option value="">Select Number</option>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              {errors.NumberOfSheet && <p className="text-red-500 text-xs">{errors.NumberOfSheet}</p>}
            </div>
            <div className="flex justify-center items-center md:mt-0 mt-4">
              <button
                disabled={loading}
                onClick={onHandleDocCreated}
                className={`w-80 py-3 rounded-xl focus:outline-none ring-2 transition-all duration-700 ring-green-100 bg-green-300 text-black hover:bg-green-400 ${
                  loading ? 'cursor-not-allowed opacity-50' : ''
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center overflow-y-hidden">
                    <div className="w-6 h-6 border-2 border-t-transparent border-black rounded-full animate-spin"></div>
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
    </>
  );
};

export default CreateNewSheet;
