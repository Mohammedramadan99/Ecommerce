import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getServiceDetails } from '../Redux/Service/servicesSlice'
import { createOrder, reset } from '../Redux/order/orderSlice'
import { toast } from 'react-toastify'

export default function PlanDetails()
{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const { serviceDetails, isLoading, isSuccess, isError, message } = useSelector(state => state.services)
    const { userInfo } = useSelector(state => state.auth)
    const { isLoading: orderLoading, isSuccess: orderSuccess, isError: orderError, message: orderMsg } = useSelector(state => state.orders.newOrder)
    const [customerMsg, setCustomerMsg] = useState('')
    const { title, price, features } = serviceDetails

    // functionallity
    const orderSubmit = () =>
    {
        const orderData = {
            email: userInfo.user.email, type: title, price, features, customerMsg,
        }
        dispatch(createOrder(orderData))
        dispatch(reset())
    }

    useEffect(() =>
    {
        dispatch(getServiceDetails(id))
        if (orderSuccess)
        {
            toast.success('order sended')
            dispatch(reset())

            navigate('/')
        }
    }, [orderSuccess])

    return (
        <div className='service'>
            <div className="page_title">
                تفاصيل الخدمة
            </div>
            <div className="container">
                <div className="title">
                    <span> نوع الخدمة </span>
                    <div className='special-color'>{title}</div>
                </div>
                <div className="price">
                    <span> السعر </span>
                    <p>${price}</p>
                </div>

                <div className="features">
                    <span> مميزات الخدمة </span>
                    <ul>
                        {features?.map(feat => <li> - {feat} </li>)}
                    </ul>
                </div>
                <div className="message">
                    <span>هل تريد ان تقول شيئا ؟ </span>
                    <textarea onChange={(e) => setCustomerMsg(e.target.value)}></textarea>
                </div>
                <button className="btn" onClick={orderSubmit}>
                    طلب الخدمة
                </button>
            </div>
        </div>
    )
}