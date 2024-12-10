import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const VendorLoginChecker = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let token = Cookies.get("Vendor-document-sheet-token-#VDST");
    if (!token) {
      navigate('/vendor-login');

    }
  });
  return (
    <div> 
      <Component />
    </div>
  )
};

export default VendorLoginChecker; 