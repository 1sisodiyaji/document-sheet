import React from 'react';
import Routess from './routes/Routess'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <div>
        <ToastContainer/>
        <Routess />
      </div>
    </>
  );
};

export default App;
