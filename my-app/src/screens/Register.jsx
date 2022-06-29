import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../Redux/auth/authSlice'

import { useNavigate } from 'react-router-dom'
export default function Register()
{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userInfo, isLoading, isSuccess, isError, message } = useSelector(state => state.auth)


    const [firstName, setFirstName] = useState('')
    const [secondName, setSecondName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() =>
    {
        if (isSuccess)
        {
            navigate('/')
        }
    }, [isSuccess])
    const registerHandler = (e) =>
    {
        e.preventDefault()
        const userData = {
            name: firstName + secondName,
            email,
            password
        }
        dispatch(register(userData))
        dispatch(reset())
        setFirstName('')
        setSecondName('')
        setEmail('')
        setPassword('')
    }
    return (
        <section className="register">
            <div className="container">
                <h1>انشاء حساب جديد</h1>
                <div className="error">
                    {message}
                </div>
                <form onSubmit={registerHandler}>
                    <div>
                        <label> الاسم الاول </label>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div>
                        <label> الاسم الثاني </label>
                        <input type="text" value={secondName} onChange={(e) => setSecondName(e.target.value)} />
                    </div>
                    <div>
                        <label> البريد الالكتروني </label>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label> كلمة المرور </label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <input type="submit" value="انشاء" />
                    </div>
                </form>
            </div>
        </section>
    )
}
