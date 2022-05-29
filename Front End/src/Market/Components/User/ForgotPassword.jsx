import React, { useState,useEffect } from 'react'
import {forgotPassword,reset} from '../../redux/auth/authSlice'
import {toast} from 'react-toastify'
import {useSelector,useDispatch} from 'react-redux'
export default function ForgotPassword() {
    const dispatch = useDispatch()
    const {isLoading,isError,message,isSuccess} = useSelector(state => state.auth)
    const [email,setEmail] = useState('')
    
    const submitHandler = (e) => {
        e.preventDefault()
        const data = {email}
        dispatch(forgotPassword(data))
        dispatch(reset())
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
    <div className='forgot'>
        <div className="container">
            <div className="cardForm">
            {isLoading ? <h1>loading</h1> : isSuccess && message ?
                <div className="message">
                    {message}
                </div>
             :
                <>
                    <div className="h3">forgot password</div>
                    <form className="form" onSubmit={submitHandler}>
                        <div className="item">
                            <label>email</label>
                            <input type="text" placeholder='enter your email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <input type="submit" />
                    </form>
                </>
             }
             </div>
        </div>
    </div>
  )
}
