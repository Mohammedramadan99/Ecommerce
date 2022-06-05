import React,{useEffect} from 'react'
import LandingPage from './sections/LandingPage'
import Features from './sections/Features'
import Categories from './sections/Categories'
import Products from './sections/Products'
import NewArrivals from './sections/NewArrivals'
import Footer from './sections/Footer'
import AOS from 'aos'
import CustomersSays from './sections/CustomersSays'
import Services from './sections/Services'


export default function HomeOne() {
  useEffect(() => {
      AOS.init({
        duration : 2000
      });
  }, []);
  return (
    <div className='home_one'>
          <LandingPage/>
          <Features/>
          <Categories/>
          <Products/>
          <NewArrivals/>
          <CustomersSays/>
          <Services/>
    </div>
  )
}
