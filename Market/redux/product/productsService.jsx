import axios from 'axios'

const API_URL = '/api/v1/'

const products = async (productsData) => {
    const response = await axios.get(API_URL + '/products')

    if (response.data.products) {
        localStorage.setItem('products', JSON.stringify(response.data.products))
    }
    return response.data
}
const productsFilter = async (productsData) => {
    
    const data = {
        keyword: productsData.keyword ? productsData.keyword : '',
        currentPage: productsData.currentPage ? productsData.currentPage : 1,
        price: productsData.price ? productsData.price : [0,25000],
        size: productsData.size ? productsData.size : '',
        ratings: productsData.ratings ? productsData.ratings : 0,
        category: productsData.category ? productsData.category : null
    }
    const {
        keyword,
        currentPage,
        price,
        size,
        ratings,
        category,
    } = data
    console.log(data)

    // with category
    let link = `products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&size=${size}&ratings[gte]=${ratings}`;
    if (category) {
        link = `products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&size=${size}&category=${category}&ratings[gte]=${ratings}`;
    }
    console.log(link)
    const response = await axios.get(API_URL + link)

    if (response.data.products) {
        localStorage.setItem('products', JSON.stringify(response.data.products))
    }

    return response.data
}

const productDetails = async (id) => {
    const { data } = await axios.get(API_URL + `product/${id}`)
    return data.product
}
const getAdminProducts = async () => {
    const { data } = await axios.get(API_URL + `admin/products`)
    return data.products
}
const deleteProduct = async (id) => {
    const { data } = await axios.delete(API_URL + `product/${id}`)
    return data.message
}
const createProduct = async (productData) => {
    // it's imp to make config because backend don't want to recieve an array but Json
    const config = {
        headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(API_URL + `product/new`, productData, config)
    return data
}

const newReview = async (review) => {
    const { data } = await axios.put(API_URL + 'review', review)

    return data.success
}

const productsReviews = async (id) => {
    const { data } = await axios.get(API_URL + `reviews?id=${id}`)
    return data.reviews
}
const deleteReview = async (reviewData) => {
    const { reviewId, productId } = reviewData
    // it's imp to make config because backend don't want to recieve an array but Json
    const { data } = await axios.delete(API_URL + `reviews?id=${reviewId}&productId=${productId}`)
    return data.success
}

const productsService = {
    products,
    productsFilter,
    getAdminProducts,
    deleteProduct,
    productDetails,
    newReview,
    createProduct,
    productsReviews,
    deleteReview
}


export default productsService