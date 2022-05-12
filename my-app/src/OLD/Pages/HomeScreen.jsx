import React from 'react'
import LandingPage from '../Components/Home/LandingPage'
import Features from '../Components/Home/Features'
import Categories from '../Components/Home/Categories'
import Products from '../Components/Home/Products'

export default function HomeScreen() {
  return (
    <div>
        <LandingPage/>
        <Features/>
        <Categories/>
        <Products/>
    </div>
  )
}
