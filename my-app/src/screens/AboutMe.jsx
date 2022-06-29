import React from 'react'
import { useState } from 'react'
import SectionHeader from '../components/SectionHeader'

import me_2 from '../images/me_2.jpeg'

export default function AboutMe()
{
    const [languages, setLanguages] = useState([
        {
            icon: '',
            name: "html"
        },
        {
            icon: '',
            name: "css / sass / bootstrap"
        },
        {
            icon: '',
            name: "react js"
        },
        {
            icon: '',
            name: "redux toolkit"
        },
        {
            icon: '',
            name: "node js"
        },
        {
            icon: '',
            name: "express"
        },
        {
            icon: '',
            name: "mongodb"
        },
    ])
    return (
        <section className='about'>
            <SectionHeader title="مين انا؟" />
            <div className="about_container container" data-aos="fade-down">
                <div className="about_container__img">
                    <img src={me_2} alt="" />
                </div>
                <div className="about_container__info">
                    <div className="nameabout_container__info__name"> <span> الاسم </span> :  محمد رمضان عبد المقصود  </div>
                    <div className="nameabout_container__info__country"> <span> بلدي </span> :  مصر  </div>
                    <div className="nameabout_container__info__education"> <span> تخصصي </span> :  full stack developer</div>
                    <div className="nameabout_container__info__programming">  يمكنني تصميم موقع كامل من الصفر وسوف اقوم بمساعدتك في اختيار الالوان المناسبة للموقع ولن اترك موقعك الا بعد رضاؤك عن التصميم </div>
                    <div className="languages">
                        <h3>سأقوم باستخدام : </h3>
                        <ul>
                            {languages.map(lang => (
                                <>
                                    <li className="name"> {lang.name} </li>
                                </>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}