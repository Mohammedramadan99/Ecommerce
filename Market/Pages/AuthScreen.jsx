import React,{useState,useEffect} from 'react'
import{useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import SignIn from '../Components/User/SignIn'
import SignUp from '../Components/User/SignUp'
import {ShowLogin} from '../redux/auth/authSlice'

export default function AuthScreen() {
  const dispatch = useDispatch()
  const [signIn,setSignin] = useState(true)
  const authHandler = (type) => {
    type==='signIn' ? setSignin(true) : setSignin(false)
  }
  const {userInfo,} = useSelector(state => state.auth)
  const {user} = userInfo
  useEffect(() => {
    user._id && dispatch(ShowLogin(false))
  }, [user])
  const showHide = () => {
    dispatch(ShowLogin(false))
  }
  return (
    <div className="auth">
      <div className="auth_container">
        <div className="close">
          <div className="lines" onClick={() => dispatch(ShowLogin(false))}>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
        <div className="selection">
            <div className={!signIn ? `item active` : 'item'} onClick={() => authHandler('signUp')}>
                sign up
            </div>
            <div className={signIn ? `item active` : 'item'} onClick={() => authHandler('signIn')}>
                sign in
            </div>
        </div>
        <div className="content">
          {signIn ? <SignIn/> : <SignUp/> }
          <div className="links">
            <p> 
              <Link to="/password/forgot" onClick={showHide}> forgot password?  </Link>{" "}    
            </p>
            <p>
                if you don't have an account,
                <Link to="/signUp"> create an account </Link>{" "}
            </p>
          </div>
        </div>
      </div>
        
    </div>
  )
}
