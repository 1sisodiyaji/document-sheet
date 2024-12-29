import  { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AdminLoginChecker = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let token = Cookies.get("Admin-document-sheet-token-#ADST");
    if (!token) {
      navigate('/admin-login');

    }
  });
  
  return (
  <>
  <Component />
  </>
  )
};

export default AdminLoginChecker; 