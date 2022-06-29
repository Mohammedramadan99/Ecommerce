import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendMail, reset } from '../Redux/Mail/MailSlice'
import { toast } from 'react-toastify'

function HireMe()
{
    const dispatch = useDispatch()
    const { isLoading, isSuccess, isError, message: mailMsg } = useSelector(state => state.mail)
    const { user, token } = useSelector(state => state.auth.userInfo)

    const [name, setName] = useState('')
    const [email, setEmail] = useState(user.email ? user.email : '')
    const [serviceType, setServiceType] = useState('')
    const [message, setMessage] = useState('')


    const [alert, setAlert] = useState('')


    const submitHandler = (e) =>
    {
        const data = {
            name, email, message, serviceType
        }

        e.preventDefault()
        if (!email || !name || !message || !serviceType)
        {
            toast.error('ملاحظة: يجب كتابة الاسم والايميل ونوع الخدمة والرسالة')
            // setAlert('please fill name ,email ,type of service and message')
        } else
        {
            dispatch(sendMail(data))
            dispatch(reset())
        }
    }
    useEffect(() =>
    {
        if (isError)
        {
            toast.error(mailMsg)
            dispatch(reset())
        }
        if (isSuccess)
        {
            setName('')
            setEmail('')
            setMessage('')
            setServiceType('')
            toast.success(mailMsg)
            dispatch(reset())
        }
    }, [isSuccess, isError])

    return (
        <div className="order">
            <div className="container" data-aos="fade-left">

                <div className="info">
                    <h1> اطلب اي خدمة الان وسوف تحصل علي  <span> خصم 20% </span> مقابل  الخدمة التي تريدها  </h1>
                    <div className="countdown">
                        <div className=" count days">
                            <div className="num">
                                2
                            </div>
                            <div className="txt"> يوم </div>
                        </div>
                        <div className=" count hours">
                            <div className="num">
                                16
                            </div>
                            <div className="txt"> ساعة </div>
                        </div>
                        <div className=" count minutes">
                            <div className="num">
                                53
                            </div>
                            <div className="txt"> دقيقة </div>
                        </div>
                        <div className=" count second">
                            <div className="num">
                                15
                            </div>
                            <div className="txt"> ثانية </div>
                        </div>
                    </div>
                </div>
                <div className="form">
                    <div className="head">
                        <h3>للتواصل معي </h3>
                    </div>
                    <form onSubmit={submitHandler}>
                        {alert !== '' && (
                            <div className="formAlert">
                                {alert}
                            </div>
                        )}
                        <div>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='اسم حضرتك' />
                        </div>
                        <div>
                            <input type="text" value={user?.email ? user.email : email} onChange={(e) => setEmail(e.target.value)} placeholder='بريدك الالكتروني' />
                        </div>
                        <div>
                            <input type="text" value={serviceType} onChange={(e) => setServiceType(e.target.value)} placeholder='نوع الخدمة' />
                        </div>
                        <div>
                            <textarea type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder='رسالة' />
                        </div>
                        <div>
                            <input type="submit" className='submit' value={isLoading ? 'انتظر' : 'تم'} />
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default HireMe