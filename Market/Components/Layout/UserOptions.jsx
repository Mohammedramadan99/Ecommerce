import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {logout} from '../../redux/auth/authSlice'
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Profile from '../../Imgs/Profile.png'

function UserOptions() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(state => state.auth.userInfo)
    const {products} = useSelector(state => state.cart)

    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        {
          icon: (
            <ShoppingCartIcon
              style={{ color: products.length > 0 ? "tomato" : "unset" }}
            />
          ),
          name: `Cart(${products.length})`,
          func: cart,
        },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
      ];
      if (user.role === "admin") {
        options.unshift({
          icon: <DashboardIcon />,
          name: "Dashboard",
          func: dashboard,
        });
      }
    
      function dashboard() {
        navigate("/admin/dashboard");
      }
    
      function orders() {
        navigate("/orders");
      }
      function account() {
        navigate("/account");
      }
      function cart() {
        navigate("/cart");
      }
      function logoutUser() {
        dispatch(logout());
        alert.success("Logout Successfully");
      }
    const [show,setShow] = useState(false)
    const showOptions = () =>{
        setShow(!show)
    }
  return (
    <div className={`overlay ${show && 'active'} `}>
        <div className="userOptions">
            <div className="img" onClick={showOptions}>
                <img src={Profile} alt="" />
            </div>
            <div className={`options ${show && 'active'}`}>
                {options.map((item) => (
                    <div className="option" onClick={item.func}>
                        <div className="icon">
                            {item.icon}
                            <div className="name">
                                {item.name}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default UserOptions