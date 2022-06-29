import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Redux/auth/authSlice'
export default function Navbar()
{
    const { userInfo } = useSelector(state => state.auth)
    const { user, token } = userInfo
    const dispatch = useDispatch()

    const signOutHandler = () =>
    {
        dispatch(logout())
    }


    return (
        <nav className="navbar">
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <span className='Fname'> محمد </span>
                        <span className='Lname'>رمضان</span>
                    </Link>

                </div>
                <ul className="links">
                    <li>
                        <Link to="/">
                            الرئيسية
                        </Link>
                    </li>
                    <li>
                        <Link to="/about">
                            مين انا؟
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact">
                            التواصل
                        </Link>
                    </li>
                    {!token ? (
                        <>
                            <li>
                                <Link to="/signIn">
                                    تسجيل الدخول
                                </Link>
                            </li>
                            <li>
                                <Link to="/register">
                                    انشاء حساب
                                </Link>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link to="/" onClick={signOutHandler}>
                                الخروج
                            </Link>
                        </li>
                    )}

                </ul>
                {
                    token && (
                        <div className="userInfo" >
                            اهلا <div> {user.name} </div>
                        </div>
                    )
                }
            </div>
        </nav>
    )
}