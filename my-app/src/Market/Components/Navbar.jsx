import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import {SearchOutlined,AccountCircleOutlined,FavoriteBorderOutlined,ShoppingCartOutlined} from '@mui/icons-material'
import {Badge} from '@mui/material'
import {useDispatch,useSelector} from 'react-redux'
import {logout} from '../redux/auth/authSlice'
import {ShowLogin} from '../redux/auth/authSlice'

export default function Navbar() {
    const dispatch = useDispatch()
    const {userInfo,} = useSelector(state => state.auth)
    const {user,token} = userInfo
    const {quantity} = useSelector(state => state.cart)
    const logoutHandler = () => {
        dispatch(logout())
    }
    useEffect(() => {
        token && dispatch(ShowLogin(false))
    }, [token])
    
  return (
    <nav className="main-navbar">
        <div className="single-row">
            <div className="container">
                <div className="sayhello">
                    Welcome to Market ! Wrap new offers / gift every single day on Weekends – New Coupon code: Happy2022
                </div>
            </div>
        </div>
        <div className="container">
            <div className="single-row">
                <div className="logo">
                    <Link to="/"> 
                        Market
                    </Link>
                </div>
                <div className="search">
                    <div className="input">
                        <input type="text"/>
                    </div>
                    <div className="icon"> <SearchOutlined/> </div>
                </div>
                <div className="feats">
                    
                    {user._id ? (
                        <>
                            <div className="item">
                                <div className="name">
                                    {user?.name}
                                </div>
                            </div>
                            <div className="item" onClick={logoutHandler} >
                                <div className="icon">
                                    <AccountCircleOutlined/>
                                </div>
                                <Link to="/" className="title"> log out </Link>
                            </div>

                        </>
                    ) : (
                        <div className="item" onClick={() => dispatch(ShowLogin(true))} >
                            <div className="icon">
                                <AccountCircleOutlined/>
                            </div>
                            <Link to="/" className="title"> sign in </Link>
                        </div>
                    )}
                    <div className="item">
                        <div className="icon">
                            <FavoriteBorderOutlined/>
                        </div>
                        <Link to="#" className="title"> favorites </Link>
                    </div>
                    <div className="item">
                        <Link to="/cart" className="icon">
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartOutlined/>
                            </Badge>
                        </Link>
                        <Link to="#" className="title"> cart </Link>
                    </div>
                </div>
            </div>
            <div className="single-row">
                <ul className="links">
                    <li> <Link to="/"> home </Link> </li>
                    <li> <Link to="/"> shop </Link> </li>
                    <li> <Link to="/"> blog </Link> </li>
                    <li> <Link to="/"> contact us </Link> </li>
                    <li> <Link to="/"> about us </Link> </li>
                    <li> <Link to="/"> FAQ </Link> </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}
