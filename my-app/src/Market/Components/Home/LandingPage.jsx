import React from 'react'
import {Link} from 'react-router-dom'
import LandingImg from '../../Imgs/coat_2.png'
export const LandingPage = () => {
  return (
    <section className="landing">
        <div className="container">
            <div className="intro">
                <p>deal of today</p>
                <h1>don't waste the chances, great deals. for you.</h1>
                <div className="links">
                    <Link to="#"> explore </Link>
                    <Link to="#"> shop now </Link>
                </div>
            </div>
            <div className="img">
                <img src={LandingImg} alt="" />
            </div>
        </div>
    </section>
  )
}

export default LandingPage