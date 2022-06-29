import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, reset } from '../Redux/auth/authSlice'
import { useNavigate } from 'react-router-dom'
export default function SignIn(props)
{
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { userInfo, isSuccess, isLoading, isError, message } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const { user, token } = userInfo
    const signInHandler = e =>
    {
        e.preventDefault()
        const data = { email, password }
        dispatch(login(data))
        dispatch(reset())

    }
    useEffect(() =>
    {
        if (isSuccess && token)
        {
            navigate('/')
        }
    }, [isSuccess, token])
    return (
        <section className="signIn">
            <div className="container">
                <h1>تسجيل الدخول</h1>
                <div className="error">
                    {message}
                </div>
                <form onSubmit={signInHandler} >
                    <div>
                        <label> البريد الالكتروني </label>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label> كلمة المرور </label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <input type="submit" value="تسجيل الدخول" />
                    </div>
                </form>
            </div>
        </section>
    )
}
