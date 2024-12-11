import React from 'react'

const Admin = () => {
  return (
    <div className="flex justify-around items-center h-[80vh]">
              <div className="min-h-80 min-w-72 border-4 border-dashed border-[#FED7AA] flex flex-col justify-center items-center rounded-md">
                <i className="fi fi-rr-circle-phone text-2xl"></i>
                 <h1 className="text-3xl">6371790702</h1> 
              </div>

              <div className="min-h-80 min-w-72 bg-[#FFDDA6] flex flex-col justify-center items-center rounded-md"> 
                 <h1 className="text-lg mb-4">Request  Access for sheets</h1>
                 <button className="px-4 py-2 bg-green-200 rounded-lg">Request Now</button>
                </div>

              <div className="min-h-80 min-w-72 border-4 border-dashed border-[#FED7AA] flex flex-col justify-center items-center rounded-md"> 
                <i className="fi fi-rr-envelope text-2xl"></i>
                 <h1 className="text-xl">637golusingh@gmail.com</h1> 
                </div>
            </div>
  )
}

export default Admin