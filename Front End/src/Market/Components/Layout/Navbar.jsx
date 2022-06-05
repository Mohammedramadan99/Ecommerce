import React,{useEffect,useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {SearchOutlined,AccountCircleOutlined,FavoriteBorderOutlined,ShoppingCartOutlined} from '@mui/icons-material'
import {Badge} from '@mui/material'
import {useDispatch,useSelector} from 'react-redux'
import {logout} from '../../redux/auth/authSlice'
import {ShowLogin} from '../../redux/auth/authSlice'
import Logo from './Logo'
import {getFilterProducts,reset,getProducts} from '../../redux/product/productSlice'

export default function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {userInfo,} = useSelector(state => state.auth)
    const {user,token} = userInfo
    const {products} = useSelector(state => state.cart)
    const [keyword, setKeyword] = useState('');

    const logoutHandler = () => {
        dispatch(logout())
    }
    useEffect(() => {
        token && dispatch(ShowLogin(false))
    }, [token])
    const filterHandler = () =>{
        dispatch(getFilterProducts({keyword}))
        navigate(`/products`)
    }

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
                        <input type="text"  onChange={(e) => setKeyword(e.target.value)} />
                    </div>
                    <div className="icon" onClick={(e) => filterHandler(e)}> <SearchOutlined/> </div>
                </div>
                <div className="feats">
                    
                    {user._id ? (
                        <>
                            <div className="item">
                                <Link to="/profile" className="item_wrap" >
                                    hi
                                        <div className="icon">
                                            <strong> {user?.name} </strong>
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
                            <Badge badgeContent={products.length} color="primary">
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
                        <Link to="/blog"> 
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
