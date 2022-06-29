import React, { useEffect } from 'react'
import './sass/style.css'
import Navbar from './components/Navbar'
import { Route, Router, Routes } from 'react-router-dom'
import SignIn from './screens/SignIn'
import Home from './screens/Home'
import Register from './screens/Register'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import 'aos/dist/aos.css'
import AOS from "aos"
import PlanDetails from './screens/PlanDetails'
import ProjectDetails from './components/Portfolio/ProjectDetails'
import AboutMe from './screens/AboutMe'

function App()
{
    useEffect(() =>
    {
        AOS.init({
            duration: 2000
        });
    }, []);

    return (
        <div>
            <ToastContainer />
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutMe />} />
                <Route path="/service/:id" element={<PlanDetails />} />
                <Route path="/project/:id" element={<ProjectDetails />} />
                <Route path="/register" element={<Register />} />
                <Route path="/signIn" element={<SignIn />} />
            </Routes>
        </div>
    )
}

export default App