import React, { useState } from 'react'
import data from '../data'
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'
import Loading from '../components/Loading'
import webDesign from '../images/develop-2.svg'

export default function Banner()
{
    const [bannerData, setBannerData] = useState(data.bannerData)
    const [current, setCurrent] = useState(0)
    const arrowLeftHandler = () =>
    {
        setCurrent(current < 1 ? bannerData.length - 1 : current - 1)
    }
    const arrowRightHandler = () =>
    {
        setCurrent(current === bannerData.length - 1 ? 0 : current + 1)
    }
    return (
        <section className="banner">
            <div className="banner__container container" data-aos="fade-down">
                <div className="banner__container--img">
                    <img src={webDesign} alt="" />
                </div>
                <div className="banner__container--content">
                    <span className='welcome'>
                        السلام عليكم , انا محمد
                    </span>
                    <div>
                        <span className='jop_title'>  full stack developer </span>
                    </div>
                    <p className="paragraph">
                        سأقوم بتصميم وتطوير موقعك الالكتروني من الصفر باستخدام احدث اللغات البرمجية والوصول الي ما يناسب عملك ويحقق اهدافك ويرضيك , انا جاهز الان لمساعدتك
                    </p>
                </div>
            </div>
        </section>
    )
}

{/* <div className="slider">
    <FaArrowCircleLeft className="leftArrow" onClick={arrowLeftHandler} />
    <FaArrowCircleRight className="rightArrow" onClick={arrowRightHandler} />
    {bannerData.map((slide, index) => ( // index => 1,2,3,....
        !slide.img ? <Loading /> : (
            <div className={index === current ? "slide active" : "slide"}>
                <div className="intro">
                    <span> {slide.smallTitle} </span>
                    <h1> {slide.title} </h1>
                    <p>
                        {slide.text}
                    </p>
                </div>
                <div className="img">
                    {index === current && (
                        <img src={slide.img} alt="" />
                    )}
                </div>
            </div>
        )
    ))}
</div> */}