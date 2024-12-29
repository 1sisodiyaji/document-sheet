import { ToastContainer } from 'react-toastify'
import Routess from './routes/Routess';
import { BrowserRouter } from "react-router-dom";
const App = () => {
  return (
    <>

      <BrowserRouter>
        <ToastContainer />
        <Routess />
      </BrowserRouter>
    </>
  )
}

export default App