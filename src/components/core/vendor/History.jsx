import React from 'react'

const History = () => {
  return (
    <>
    <div>
    <h2 className="text-2xl font-semibold">History</h2>
    <p className="text-gray-600 mt-4 text-xl"> <span  style={{ color: "#EFA153" }}>No records yet !  </span>Your transaction history will appear here -</p>
    <p className="text-gray-600 mt-4 text-xl">once you start <span  style={{ color: "#2AC288" }}>  ready to begin?</span>.</p>

    <div>
      <img src="https://res.cloudinary.com/dlgyf2xzu/image/upload/v1733943460/Simplification_3_louxwv.png" 
      alt="No History Found"
      className="mx-auto mb-6"
      />
      <h1 className="text-center text-2xl">No History Found</h1>
    </div>
    </div>
    </>
  )
}

export default History