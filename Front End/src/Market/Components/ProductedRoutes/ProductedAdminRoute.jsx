import {useNavigate} from 'react-router-dom'
import {Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'
const useAuth = () => {
    const {user} = useSelector(state => state.auth.userInfo)
    
    return user && user.role === 'admin'
}

const ProductedAdminRoute = () => {
    const isAuth = useAuth()
    return isAuth ? <Outlet/> : <h1>only admin can access pages like this </h1>
}
export default ProductedAdminRoute