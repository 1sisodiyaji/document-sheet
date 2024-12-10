import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Home from '../pages/user/Home';
import ScanQr from '../pages/user/ScanQr';
import Resources from '../pages/user/Resources';
import About from '../pages/user/About';
import Pricing from '../pages/user/Pricing';
import Contact from '../pages/user/Contact';
import CreateNewSheet from '../pages/user/CreateNewSheet';
import PrivacyPolicy from '../pages/user/PrivacyPolicy';
import TermsCondition from '../pages/user/TermsCondition';
import SingleBlog from '../pages/user/SingleBlog';
import AdminLoginChecker from '../utils/AdminLoginChecker';
import VendorLoginChecker from '../utils/VendorLoginChecker';
import VendorDashboard from '../pages/vendor/VendorDashboard';
import VendorLogin from '../pages/vendor/VendorLogin';
import AdminLogin from '../pages/admin/AdminLogin';
import Payment from '../pages/user/Payment';


const AdminDashboard = () => <h1>Welcome to the Admin Dashboard</h1>;

const Routess = () => {

  const location = useLocation(); 
  const hostname =location.pathname;
  let role = "user";
  
  if (hostname.includes("admin")) {
    role = "admin";
  } else if (hostname.includes("vendor")) {
    role = "vendor";
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });  
  }, [location]);

  return (
    <>
      {role === "user" && <Navbar />}

      <Routes>
        {role === "user" && (
          <>
            <Route path="/" element={<Home/>} />
            <Route path="/scan-qr" element={<ScanQr/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/resources" element={<Resources/>} />
            <Route path="/resources/:slug" element={<SingleBlog/>} />
            <Route path="/pricing" element={<Pricing/>} />
            <Route path="/contact-us" element={<Contact/>} />
            <Route path="/create-new-sheet" element={<CreateNewSheet/>} />
            <Route path="/payment" element={<Payment/>} />
            <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
            <Route path="/terms-condition" element={<TermsCondition/>} />
          </>
        )}

        {role === "admin" && (
          <>
          <Route path="/admin-login" element={<AdminLogin/>} />
          <Route path="/admin" element={<AdminLoginChecker Component={AdminDashboard} />} />
          </>
        )}

        {role === "vendor" && (
          <>
          <Route path="/vendor-login" element={<VendorLogin/>} />
          <Route path="/vendor" element={<VendorLoginChecker Component={VendorDashboard} />} />
          </>
        )}
      </Routes>

      {role === "user" && <Footer />}
    </>
  );
};

export default Routess;
