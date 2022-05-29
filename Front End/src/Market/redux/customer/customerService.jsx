import axios from 'axios'

const API_URL = '/api/v1/'

const newRev = async (revData) => {
    const config = {
        headers: { "Content-Type": "application/json" },
    };
    const response = await axios.post(API_URL + '/customerRev/new',revData,config)

    return response.data.customerRev
}

const allRev = async () => {
    
    const response = await axios.get(API_URL + '/customerRevs')

    return response.data
}

const productsService = {
    newRev,
    allRev
}


export default productsService