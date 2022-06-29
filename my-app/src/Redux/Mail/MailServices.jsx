import axios from 'axios'

const API_URL = '/api/v1/'

const Send = async (userData) =>
{
    const { data } = await axios.post(API_URL + "sendMsg", userData)
    console.log(data)
    return data
}


const sendMailService = {
    Send,
}


export default sendMailService