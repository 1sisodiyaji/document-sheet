import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; 
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
import UserLayout from '../pages/user/UserLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import SuccessPage from '../pages/user/SuccessPage';
 

const Routess = () => { 
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });  
  }, [location]);

  return (
    <> 
      <Routes> 
            <Route path="/" element={<UserLayout><Home /></UserLayout>} />
            <Route path="/scan-qr" element={<UserLayout><ScanQr /></UserLayout>} />
            <Route path="/about" element={<UserLayout><About /></UserLayout>} />
            <Route path="/resources" element={<UserLayout><Resources /></UserLayout>} />
            <Route path="/resources/:slug" element={<UserLayout><SingleBlog /></UserLayout>} />
            <Route path="/pricing" element={<UserLayout><Pricing /></UserLayout>} />
            <Route path="/contact-us" element={<UserLayout><Contact /></UserLayout>} />
            <Route path="/create-new-sheet" element={<UserLayout><CreateNewSheet /></UserLayout>} />
            <Route path="/payment" element={<UserLayout><Payment /></UserLayout>} />
            <Route path="/privacy-policy" element={<UserLayout><PrivacyPolicy /></UserLayout>} />
            <Route path="/terms-condition" element={<UserLayout><TermsCondition /></UserLayout>} /> 
             <Route path="/feedback" element={<SuccessPage/>} />
 
          <Route path="/admin-login" element={<AdminLogin/>} />
          <Route path="/admin" element={<AdminLoginChecker Component={AdminDashboard} />} />
         
 
          <Route path="/vendor-login" element={<VendorLogin/>} />
          <Route path="/vendor" element={<VendorLoginChecker Component={VendorDashboard} />} />
          
         
      </Routes>
    </>
  );
};

export default Routess;
