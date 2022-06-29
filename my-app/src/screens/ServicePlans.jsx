import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import data from '../data'
import { FaRegCheckCircle, FaStar } from 'react-icons/fa'
import SectionHeader from '../components/SectionHeader'
import { useSelector, useDispatch } from 'react-redux'
import { getAllServices } from "../Redux/Service/servicesSlice"

export default function WorkPlans()
{
    const dispatch = useDispatch()
    const { allServices } = useSelector(state => state.services)
    const [plans, setPlans] = useState(data.plansData)
    useEffect(() =>
    {
        dispatch(getAllServices())
    }, [])

    return (
        <section className='services'>
            <div className="container">
                <SectionHeader title="خدماتي" />
                <div className="plans">
                    {allServices?.map(item => (
                        <Link to={`/service/${item._id}`} className="plan" data-aos="zoom-out">
                            <div className="icon">

                            </div>
                            <div className="title">
                                {item.title}
                            </div>
                            <div className="price">
                                ${item.price}
                            </div>
                            <ul className='feats'>
                                {item.features.map(feat => (
                                    <li>
                                        <FaRegCheckCircle />
                                        {feat}
                                    </li>
                                ))}
                            </ul>
                            <div className="btn">اختر</div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
