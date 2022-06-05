import axios from 'axios'

const API_URL = '/api/v1/'

const createPost = async (postData) => {
    const {data} = await axios.post(API_URL + `blog/new`,postData)
    return data
}
const getPost = async (id) => {
    const {data} = await axios.get(API_URL + `blog/${id}`)
    return data
}
const getAllPosts = async () => {
    const {data} = await axios.get(API_URL + `blog/`)
    return data
}
const updatePost = async (postData) => {
    console.log(postData)
    const {id,postInfo} = postData
    const {data} = await axios.put(API_URL + `blog/${id}`,postInfo)
    return data
}
const deletePost = async (id) => {
    const {data} = await axios.delete(API_URL + `blog/${id}`)
    return data
}

const blogServices = {
    createPost,
    getPost,
    getAllPosts,
    updatePost,
    deletePost
}


export default blogServices