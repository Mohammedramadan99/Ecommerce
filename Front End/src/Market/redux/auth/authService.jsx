import axios from 'axios'

const API_URL = '/api/v1/'

const register = async (userData) => {
    const response = await axios.post(API_URL + 'register',userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    console.log(response.data ? response.data  : 'no data' )
    return response.data.userInfo
}

const login = async (userData) => {
    const {data} = await axios.post(API_URL + 'login',userData)
    
    if (data) {
        localStorage.setItem('user', JSON.stringify(data))
    }
    console.log(data)
    return data.userInfo
}

const logout = async () => {
    localStorage.removeItem('user')
    const response = await axios.get(API_URL + 'logout')
    return response.data.message
}

const getAllUsers = async () => {
    const response = await axios.get(API_URL + 'admin/users')
    return response.data.users
}

const deleteUser = async (id) => {
    const response = await axios.delete(API_URL + `admin/user/${id}`)
    return response.data
}
const updateUser = async (data) => {
    const {userId,myForm} = data
    console.log(data)
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
    const response = await axios.put(API_URL + `admin/user/${userId}`,data,config)
    return response.data
}
const updateProfile = async (data) => {
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
    const response = await axios.put(API_URL + `me/update`,data,config)
    return response.data
}
const loadUser = async (data) => {
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
    const response = await axios.get(API_URL + `me`)
    return response.data.user
}
const getSingleUser = async (data) => {
    const response = await axios.get(API_URL + `admin/user/${data}`)
    return response.data
}
const forgotPassword = async (email) => {
    console.log(email)
    const config = { headers: { "Content-Type": "application/json"} };

    const response = await axios.post(API_URL + `password/forgot`,email,config)
    return response.data.message
}
const resetPassword = async (resetData) => {
    const {password,token} = resetData

    const config = { headers: { "Content-Type": "application/json"} };

    const header = { headers: { "Authorization": token} };


    const response = await axios.post(API_URL + `password/reset`,resetData,header,config)
    return response.data.message
}


const authService = {
    register,
    login,
    logout,
    getAllUsers,
    deleteUser,
    updateUser,
    getSingleUser,
    updateProfile,
    loadUser,
    forgotPassword,
    resetPassword
}


export default authService