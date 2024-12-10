import React from 'react'  
import { Link } from 'react-router-dom' 

const Testimonials = ({ text, name, location }) => {
    return (
        <>
            <Link to="#" className=" md:max-w-sm flex-shrink-0 w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-orange-50">
                <figure className="max-w-screen-md">
                    <div className="flex items-center justify-center mb-4 text-yellow-300">
                        <svg className="w-5 h-5 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg className="w-5 h-5 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg className="w-5 h-5 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg className="w-5 h-5 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                    </div>
                    <blockquote>
                        <p className="text-xl font-regular text-gray-900 text-center">{text}</p>
                    </blockquote>
                    <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
                        <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-300 ">
                            <cite className="pe-3 font-medium text-gray-900 ">{name}</cite>
                            <cite className="ps-3 text-sm text-gray-500">{location}</cite>
                        </div>
                    </figcaption>
                </figure>

            </Link>
        </>
    )
}
 
const Testimonial = () => {
  return (
    <>
     <section className='my-12 p-1'>

<article>
  <h1 className='md:text-4xl text-xl font-semibold text-center overflow-y-hidden capitalize'>Let&apos;s hear What our Customers Saying . . </h1>
</article>

<section className="relative flex  md:flex-row flex-col my-12 max-w-full mx-auto bg-gray-50 py-6 p-1 gap-6 justify-center">

  <Testimonials text={'ಭೂ ವಿವಾದಕ್ಕೆ ಸಂಬಂಧಿಸಿದ ದಾಖಲೆಗಳನ್ನು ತ್ವರಿತವಾಗಿ ಮತ್ತು ವಿಶ್ವಾಸಾರ್ಹವಾಗಿ ಪಡೆದುಕೊಳ್ಳಲು ಈ ಸೇವೆ ನಮಗೆ ಬಹಳ ಸಹಾಯ ಮಾಡಿತು!"'} name="Raghavendra Kumar" location="Bengaluru" />
  <Testimonials text={'"ನಾನೇ ವರ್ಷಗಳಿಂದ ಭೂ ದಾಖಲೆಗಳೊಂದಿಗೆ ಹೋರಾಟ ಮಾಡುತ್ತಿದ್ದೆ. ಅವರ ಸೇವೆಯಿಂದ, ಎಲ್ಲವೂ ಈಗ ಸುಗಮವಾಗಿದೆ!'} name="Shanthi Gowda" location="Mysuru" />
  <Testimonials text={'ಭೂ ದಾಖಲೆಗಳಲ್ಲಿ ಅವರ ಪರಿಣತಿ ನನಗೆ ಹೆಚ್ಚಿನ ಸಮಯ ಮತ್ತು ಒತ್ತಡವನ್ನು ಉಳಿಸಿತು. ಅವರ ಸೇವೆಯನ್ನು ಉತ್ಸಾಹದಿಂದ ಶಿಫಾರಸು ಮಾಡುತ್ತೇನೆ.'} name="Vijay Prasad" location="Hubballi" />

</section>

</section>

    </>
  )
}

export default Testimonial