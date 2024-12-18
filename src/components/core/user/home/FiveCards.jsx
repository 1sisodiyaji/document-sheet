import React from 'react'

const FiveCards = () => {
  return (
    <>
    <h1 className='text-center text-2xl my-4'>Some test will be here </h1>
    <div className="max-w-7xl mx-auto flex md:flex-row flex-col justify-between gap-4">
        <div className="flex w-96 min-h-48 bg-green-200 rounded-md">
            HEY
        </div>
        <div className="flex w-96 min-h-48 bg-orange-200 rounded-md">
            HEY
        </div>
        <div className="flex w-96 min-h-48 bg-slate-200 rounded-md">
            HEY
        </div>
    </div> 
    <div className="max-w-7xl mx-auto flex md:flex-row flex-col justify-between gap-4 my-2">
        <div className="flex w-96 min-h-48 bg-green-200 rounded-md">
            HEY
        </div>
        
        <div className="flex w-96 min-h-48 bg-slate-200 rounded-md">
            HEY
        </div>
    </div> 
    </>
  )
}

export default FiveCards