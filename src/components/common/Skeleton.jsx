import React from 'react'

const Skeleton = ({limit}) => {
  return (
    <> 
     <div className="flex flex-wrap gap-2 w-full">
            {[...Array(limit)].map((_, index) => (
                <div key={index} className="w-full md:w-[35vw] rounded-md">
                  <div className="w-full">  
    <div className="h-[300px] w-full bg-gray-300 animate-pulse"></div>
                  </div>
                </div>
            ))}
        </div>
    </>
  )
}

export default Skeleton