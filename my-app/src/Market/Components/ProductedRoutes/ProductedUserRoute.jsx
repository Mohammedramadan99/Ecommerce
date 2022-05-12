import {useNavigate} from 'react-router-dom'
import {Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'
const useAuth = () => {
    const {user} = useSelector(state => state.auth.userInfo)
    
    return user && user._id
}

const ProductedUserRoute = () => {
    const isAuth = useAuth()
    return isAuth ? <Outlet/> : <h1>you have to login to access this page</h1>
}
export default ProductedUserRoute