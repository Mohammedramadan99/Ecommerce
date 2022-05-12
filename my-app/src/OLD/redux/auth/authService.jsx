import axios from 'axios'

const API_URL = '/api/v1/'

const register = async (userData) => {
    const response = await axios.post(API_URL + 'register',userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    console.log(response.data ? response.data  : 'no data' )
    return response.data
}

const login = async (userData) => {
    const response = await axios.post(API_URL + 'login',userData)
    
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data.user
}

const logout = () => {
    localStorage.removeItem('user')
}

const getAllUsers = async (userData) => {
    const response = await axios.get(API_URL + 'admin/users')
    return response.data.users
}
const authService = {
    register,
    login,
    logout,
    getAllUsers
}


export default authService