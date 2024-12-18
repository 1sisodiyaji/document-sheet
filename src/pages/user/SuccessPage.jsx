import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import {toast} from 'react-hot-toast';
import axios from 'axios';

const SuccessPage = () => {
  const location = useLocation(); 
  const {sheetId } = location.state || {};
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
useEffect(() => {
  DownloadSheet(sheetId);
  DownloadBill(sheetId);
},[sheetId]);

  return (
    <div>SuccessPage</div>
  )
}

export default SuccessPage