import axios from 'axios'

const API_URL = '/api/v1/'

const addItemsToCart = async ({id,quantity,avtiveSize}) => {
    const {data} = await axios.get(API_URL + `product/${id}`)
    const { _id,name,price,images,Stock } = data.product
    return {
        product:_id,
        name,
        price,
        image:images[0].url,
        stock:Stock,
        size:avtiveSize,
        quantity,
    }
}

  const productsService = {
    addItemsToCart
}


export default productsService