import React from 'react'

const Admin = () => {
  return (
    <div className="flex md:flex-row flex-col justify-around items-center md:h-[80vh] space-y-2">
      <a href='tel:+6371790702' className="min-h-80 w-80 border-4 border-dashed border-[#FED7AA] flex flex-col justify-center items-center rounded-xl">
        <img src="https://res.cloudinary.com/dlgyf2xzu/image/upload/v1734366067/telephone_zj4lyx.png" loading='lazy' alt="phone" className='h-28' />
        <h1 className="text-3xl mt-4">6371790702</h1>
      </a>

      <a href='mailto:637golusingh@gmail.com' className="min-h-80 w-80 border-4 border-dashed border-[#FED7AA] flex flex-col justify-center items-center rounded-xl">
       
      <img src="https://res.cloudinary.com/dlgyf2xzu/image/upload/v1734366172/email_acowt8.png" loading='lazy' alt="phone" className='h-28' />
        <h1 className="text-xl mt-4">637golusingh@gmail.com</h1>
      </a>
    </div>
  )
}

export default Admin