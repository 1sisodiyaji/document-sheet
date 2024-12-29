import React from 'react'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'

const UserLayout = ({children}) => {
  return (
    <>
    <Navbar/>
    {children}
    <Footer/>
    </>
  )
}

export default UserLayout