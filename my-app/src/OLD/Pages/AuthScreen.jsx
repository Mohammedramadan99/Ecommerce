import React,{useState,useEffect} from 'react'
import SignIn from '../Components/Auth/SignIn'
import SignUp from '../Components/Auth/SignUp'
import{useSelector} from 'react-redux'

export default function AuthScreen({setShowSignup}) {
  const [signIn,setSignin] = useState(true)
  const authHandler = (type) => {
    type==='signIn' ? setSignin(true) : setSignin(false)
  }
  const {user} = useSelector(state => state.auth)
  useEffect(() => {
    user?.user?._id && setShowSignup(false)
  }, [user])
  return (
    <div className="auth">
      <div className="auth_container">
        <div className="close">
          <div className="lines" onClick={() => setShowSignup(false)} >
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
        </div>
      </div>
        
    </div>
  )
}
