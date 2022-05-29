import axios from 'axios'

const API_URL = '/api/v1/'

const newOrder = async (orderData) => {
    const response = await axios.post(API_URL + 'order/new',orderData)

    if (response.data) {
        localStorage.setItem('order', JSON.stringify(response.data))
    }
    console.log(response.data ? response.data  : 'no data' )
    return response.data
}
const singleOrder = async (id) => {
    const response = await axios.get(API_URL + `order/${id}`)
    return response.data.order
}
const getAllOrders = async () => {
    const response = await axios.get(API_URL + `admin/orders`)
    return response.data
}
const getMyOrder = async () => {
    const response = await axios.get(API_URL + `orders/me`)
    return response.data.orders
}
const updateOrder = async (data) => {
    const {id,status} = data
    const orderStatus = {status}
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
    const response = await axios.put(API_URL + `/admin/order/${id}`,data,config)
    return response.data.success
}
const deleteOrder = async (id) => {
    const response = await axios.delete(API_URL + `/admin/order/${id}`)
    return response.data.success
}

const orderService = {
    newOrder,
    singleOrder,
    getAllOrders,
    getMyOrder,
    updateOrder,
    deleteOrder
}
export default orderService