import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import {SearchOutlined,AccountCircleOutlined,FavoriteBorderOutlined,ShoppingCartOutlined} from '@mui/icons-material'
import {Badge} from '@mui/material'
import {useDispatch,useSelector} from 'react-redux'
import {logout} from '../../redux/auth/authSlice'
import {ShowLogin} from '../../redux/auth/authSlice'
import Logo from './Logo'

export default function Navbar() {
    const dispatch = useDispatch()
    const {userInfo,} = useSelector(state => state.auth)
    const {user,token} = userInfo
    const {cartQuantity} = useSelector(state => state.cart)
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
                <Logo/>
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
                                <Link to="/profile" className="item_wrap" >
                                        <div className="icon">
                                            {user?.name}
                                        </div>
                                        <div className="title">
                                            <div className="title_Wrap">
                                                profile
                                            </div>
                                        </div>
                                </Link>
                            </div>
                            <div className="item" onClick={logoutHandler} >
                                <Link to="/favorites" className="item_wrap">

                                    <div className="icon">
                                        <AccountCircleOutlined/>
                                    </div>
                                    <div className="title"> 
                                        <div className="title_Wrap">
                                            log out
                                        </div>
                                    </div>
                                </Link>
                            </div>

                        </>
                    ) : (
                        <div className="item" onClick={() => dispatch(ShowLogin(true))} >
                            <Link to="/favorites" className="item_wrap">
                                <div className="icon">
                                    <AccountCircleOutlined/>
                                </div>
                                <div className="title">
                                    <div className="title_Wrap">
                                         sign in
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )}
                    <div className="item">
                        <Link to="/favorites" className="item_wrap">
                            <div className="icon">
                                <FavoriteBorderOutlined/>
                            </div>
                            <div className="title"> 
                                <div className="title_Wrap">
                                    favorites
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="item">
                        <Link to="/cart" className="item_wrap">
                            <Badge badgeContent={cartQuantity} color="primary">
                                <ShoppingCartOutlined/>
                            </Badge>
                            <div className="title"> 
                                <div className="title_Wrap">
                                    cart
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="single-row">
                <ul className="links">
                    <li> 
                        <Link to="/"> 
                            <div className="link_wrap">
                                home
                            </div>
                        </Link>
                    </li>
                    <li> 
                        <Link to="/products"> 
                            <div className="link_wrap">
                                shop
                            </div>
                        </Link>
                    </li>
                    <li> 
                        <Link to="/"> 
                            <div className="link_wrap">
                                blog
                            </div>
                        </Link>
                    </li>
                    <li> 
                        <Link to="/"> 
                            <div className="link_wrap">
                                contact
                            </div>
                        </Link>
                    </li>
                    <li> 
                        <Link to="/"> 
                            <div className="link_wrap">
                                about
                            </div>
                        </Link>
                    </li>
                    <li> 
                        <Link to="/"> 
                            <div className="link_wrap">
                                FAQ
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}
