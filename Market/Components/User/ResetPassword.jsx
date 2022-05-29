import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {resetPassword,reset} from '../../redux/auth/authSlice'
import {toast} from 'react-toastify'

export default function ResetPassword() {
    const dispatch = useDispatch()
    const { token } = useParams()
    const [password, setPassword] = useState('')
    const [Cf_Password, setCfPassword] = useState('')
    const {isSuccess,isError,message} = useSelector(state => state.auth)
    const submitHandler = (e) => {
        e.preventDefault()
        const data = {
            password,token
        }
        if (password === Cf_Password) {
            dispatch(resetPassword(data))
        } else {
            toast.error('password not the same')
        }
    }
    useEffect(() => {
        if (isError) {
            toast.error(message)
            dispatch(reset())
        }
        if (isSuccess) {
            toast.success(message)
            dispatch(reset())
        }
    }, [isError,isSuccess,message])
    

    return (
        <div className='reset'>
            <div className="container">
                <div className="cardForm">
                    <div className="h3">reset password</div>
                    <form className="form" onSubmit={submitHandler}>
                        <div className="item">
                            <label>password</label>
                            <input type="text" placeholder='enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="item">
                            <label>confirm password</label>
                            <input type="text" placeholder='confirm password' value={Cf_Password} onChange={(e) => setCfPassword(e.target.value)} />
                        </div>
                        <input type="submit" />
                    </form>
                </div>
            </div>
        </div>
    )
}