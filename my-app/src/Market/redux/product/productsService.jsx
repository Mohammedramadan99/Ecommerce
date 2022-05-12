import axios from 'axios'

const API_URL = '/api/v1/'

const products = async (category) => {
    // with category
    let link = `products`;
    if(category) {
        link = `products?category=${category}`;
    }
    // let link = `products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    const response = await axios.get(API_URL + link )

    if (response.data.products) {
        localStorage.setItem('products', JSON.stringify(response.data.products))
    }
    return response.data.products
}

const productDetails = async (id) => {
    const {data} = await axios.get(API_URL + `product/${id}`)
    return data.product
}
const getAdminProducts = async () => {
    const {data} = await axios.get(API_URL + `admin/products`)
    return data.products
}
const deleteProduct = async (id) => {
    const {data} = await axios.delete(API_URL + `product/${id}`)
    return data.message
}
const createProduct = async (productData) => {
    // it's imp to make config because backend don't want to recieve an array but Json
    const config = {
        headers: { "Content-Type": "application/json" },
      };
    const {data} = await axios.post(API_URL + `product/new`,productData,config)
    return data
}
const newReview = async (review) => {
    const {data} = await axios.put(API_URL + 'review',review )

    return data.success
}

const productsService = {
    products,
    getAdminProducts,
    deleteProduct,
    productDetails,
    newReview,
    createProduct
}


export default productsService