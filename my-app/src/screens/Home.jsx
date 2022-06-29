import React, { useEffect } from 'react'
import Banner from './Banner'
import Whyme from './Whyme'
import ServicePlans from './ServicePlans'
import Presentation from './Presentation'
import Portfolio from './Portfolio'
import Footer from './Footer'
import AOS from 'aos'
import AboutMe from '../screens/AboutMe'
import HireMe from './HireMe'
export default function Home()
{
    useEffect(() =>
    {
        AOS.init({
            duration: 2000
        });
    }, []);
    return (
        <>
            <Banner />
            <Whyme />
            <AboutMe />
            <HireMe />
            <ServicePlans />
            <Portfolio />
            {/* <Presentation /> */}
            <Footer />
        </>
    )
}
