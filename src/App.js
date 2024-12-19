import React from 'react'
import Routess from './routes/Routess'
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
   <>
  <Toaster position="bottom-center"/>
   <Routess/>
   </>
  )
}

export default App