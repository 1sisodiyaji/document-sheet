import React from 'react'
import Hero from '../../components/core/user/home/Hero'
import Cards from '../../components/core/user/home/Cards'
import Scan from '../../components/core/user/home/Scan'
import Empowering from '../../components/core/user/home/Empowering'
import Testimonial from '../../components/common/Testimonial'
import FAQ from '../../components/core/user/home/FAQ'

const Home = () => {
    return (
        <>
        <Hero />
        <Cards/>
        <Scan/>
        <Empowering/>
        <Testimonial/>
        <FAQ/>
        </>
    )
}

export default Home