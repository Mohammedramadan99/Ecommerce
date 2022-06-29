import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import data from '../data'
import SectionHeader from '../components/SectionHeader'
import { logout } from '../Redux/auth/authSlice'
import { Speed, ContactSupport, FmdGood, DoNotDisturbOnTotalSilenceTwoTone, SpeedOutlined } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import responsive from '../images/responsive-4.png'
import performance from '../images/performance-1.png'
import quality from '../images/quality_1.png'
import secure from '../images/secure_3.png'

export default function Whyme()
{
    const { isLoading, isSuccess, isError, message: mailMsg } = useSelector(state => state.mail)
    const { user, token } = useSelector(state => state.auth.userInfo)
    const whymeData = data.whymeData
    const [direction, setDirection] = useState("")
    const [listGroup, setListGroup] = useState([
        {
            name: 'performance',
            title: 'اداء عالي سريع'
        },
        {
            name: 'responsive',
            title: 'موقع متجاوب'
        },
        {
            name: 'speed',
            title: 'سرعة التنفيذ'
        },
    ])
    const [activeList, setActiveList] = useState("performance")
    const [activeFeat, setActiveFeat] = useState([])
    const listHandler = (title) =>
    {
        title === 'جودة العمل' ? setActiveList('جودة العمل') : setActiveList(title)
    }

    const directionHandler = (direc) =>
    {
        setDirection(direc)
    }

    const productFeats = [
        {
            num: "performance",
            title: "سرعة الاداء  ",
            element:
                <div className="feat__desc">
                    <p> اداء قوي للموقع لتجربة مستخدم رائعة  </p>
                </div>,
            icon: performance
        },
        {
            num: "performance",
            title: "الامان",
            element:
                <div className="feat__desc">
                    <p> امان قاعدة البيانات و الانظمة الخاصة بالموقع  </p>
                </div>,
            icon: secure
        },
        {
            num: "speed",
            title: "جودة التنفيذ",
            element:
                <div className="feat__desc">
                    <p> الكود يكون نظيف وسهل الفهم والتعديل عليه </p>
                </div>,
            icon: quality
        },
        {
            num: "responsive",
            title: "موقع متجاوب",
            element:
                <div className="feat__desc">
                    <p> الموقع يعمل علي جميغ انواع الاجهزة الكبيرة والصغيرة  </p>
                </div>,
            icon: responsive
        },
    ]
    useEffect(() =>
    {
        setActiveFeat(productFeats.filter(p => (
            p.num !== activeList
        )))
        console.log(activeFeat)
        console.log(activeList) 
    }, [activeList])

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [serviceType, setServiceType] = useState('')
    const [message, setMessage] = useState('')

    const [alert, setAlert] = useState('')

    return (
        <section className="why-me" id="about">
            <div className="container" data-aos="fade-down">
                <div className="features">
                    {productFeats.map(feat => (
                        <div className="feat">
                            <div className="feat__icon"> <img src={feat.icon} alt="" /> </div>
                            <div className="feat__name"> {feat.title} </div>
                            {feat.element}
                        </div>
                    ))}
                </div>
            </div>


        </section>
    )
}

// old component
{/* <div>
    <SectionHeader title="لماذا انا؟" />
    <div className="features">
        <ul className="list-items">
            {listGroup.map((item, i) => (
                <li key={i} className={activeList === item.name ? `item active` : `item`} data-filter={item} onClick={() => listHandler(item.name)} > {item.title} </li>
            ))}
        </ul>
        <div className="features__content">
            {productFeats.map(item => (
                <div className={`features__content__container ${item.num === activeList ? 'show' : ''}`}>
                    <div className="feat">
                        <div className="info">
                            <div className="title"> {item.title} </div>
                            <div className="text"> {item.element} </div>
                        </div>
                        <div className="icon">
                            {item.icon}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
</div> */}