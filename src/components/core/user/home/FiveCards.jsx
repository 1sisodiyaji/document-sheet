import React from 'react'
import { Link } from 'react-router-dom'

const FiveCards = () => {
    return (
        <>
            <div className="my-24">
                <h1 className='text-center md:text-2xl text-xl my-6 font-semibold'>We Made Your journey So Simple and innovative for better experience. </h1>
                <div className="max-w-7xl mx-auto flex md:flex-row flex-col justify-between items-center gap-4">
                    <div className="flex flex-col justify-center items-center w-96 min-h-48 bg-green-200 rounded-md">
                        <h1 className='w-8 h-8 bg-orange-200 flex justify-center items-center rounded-full'>1</h1>
                        <img src="https://res.cloudinary.com/dlgyf2xzu/image/upload/v1733941760/image_19_gsh3ic.png" alt="creating" className='w-24 h-24' loading='lazy' />
                        Create Your Sheet
                    </div>
                    <div className="flex flex-col justify-center items-center w-96 min-h-48 bg-orange-200 rounded-md">
                        <h1 className='w-8 h-8 bg-white flex justify-center items-center rounded-full'>2</h1>
                        <img src="https://res.cloudinary.com/dlgyf2xzu/image/upload/v1734194029/image_16_iokvq8.png" alt="payment" className='w-24 h-24' loading='lazy' />
                        Pay Online
                    </div>
                    <div className="flex flex-col justify-center items-center w-96 min-h-48  border-2 border-slate-200 rounded-md">
                        <h1 className='w-8 h-8 bg-orange-200 flex justify-center items-center rounded-full'>3</h1>
                        <img src="https://res.cloudinary.com/dlgyf2xzu/image/upload/v1734190122/Simplification_2_agko2f.png" alt="feedback" className='w-24 h-24' loading='lazy' />
                        Share your Experience
                    </div>
                </div>
                <div className="max-w-7xl mx-auto flex md:flex-row flex-col justify-between items-center  gap-4 my-2">
                    <div className="flex flex-col justify-center space-y-2 items-center w-96 min-h-48 border-2 border-green-200 rounded-md">
                        <h1 className='w-8 h-8 bg-orange-200 flex justify-center items-center rounded-full'>4</h1>
                        <img src="https://res.cloudinary.com/dlgyf2xzu/image/upload/v1734025428/Simplification_mlxmlr.png" alt="history" className='w-24 h-24' loading='lazy' />
                        See Your Sheet Details By search or Scan
                    </div>

                    <Link  to = {'/create-new-sheet'}className="flex flex-col justify-center items-center w-96 min-h-48 bg-orange-400 rounded-md">
                        <i class="fi fi-rr-add text-2xl text-white"></i>
                       <h1 className='text-white'>Create your sheet</h1>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default FiveCards