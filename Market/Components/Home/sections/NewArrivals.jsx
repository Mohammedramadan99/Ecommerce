import React from 'react'
import {Link} from 'react-router-dom'
function NewArrivals() {

  return (
    <div className='arraivals'>
        <div className="container">
            <Link className="box" data-aos="fade-right" to="/product/62869d24aec8c3d64c746cf1">
                <div className="left">
                  <div className="info">
                    <p>new arraivals</p>
                    <div className="h3">Classic Sunglasses</div>
                  </div>
                  <div className="box-btn">
                    shop now
                  </div>
                </div>
                <div className="right">
                  <div className="img">
                    <img src="https://res.cloudinary.com/dtmjc8y9z/image/upload/v1652989219/ecommerce/vsdvpvqtxux0bibtticz.png" alt="" />
                  </div>
                </div>
            </Link>
            <Link className="box" data-aos="fade-left" to="/product/62869acfaec8c3d64c746a50">
                <div className="left">
                  <div className="info">
                    <p>new arraivals</p>
                    <div className="h3">Black leather Bag</div>
                  </div>
                  <div className="box-btn">
                    shop now
                  </div>
                </div>
                <div className="right">
                  <div className="img">
                    <img src="https://res.cloudinary.com/dtmjc8y9z/image/upload/v1652988621/ecommerce/e7hipxnks4fcewc9ysjx.png" alt="" />
                  </div>
                </div>
            </Link>
        </div>
    </div>
  )
}

export default NewArrivals