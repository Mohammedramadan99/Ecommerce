import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import blogServices from './blogServices'


const initialState = {
    posts:[],
    postDetails:{},
    isLoading: false,
    isError:false,
    isSuccess:false,
    isDeleted:false,
    message:''
}

export const createPost = createAsyncThunk('blog/create', async (data,thunkAPI) => {
    const {rejectWithValue,getState} = thunkAPI
    try {
        const getproduct = await blogServices.createPost(data)
        return getproduct 
    } catch (error) {
        console.log(error.message);
        return rejectWithValue(error.message)   
    }
})
export const getPostDetails = createAsyncThunk('blog/post', async (id,thunkAPI) => {
    const {rejectWithValue,getState} = thunkAPI
    try {
        const getproduct = await blogServices.getPost(id)
        return getproduct 
    } catch (error) {
        console.log(error.message);
        return rejectWithValue(error.message)   
    }
})
export const allPosts = createAsyncThunk('blog/posts', async (_,thunkAPI) => {
    const {rejectWithValue,getState} = thunkAPI
    try {
        const getproduct = await blogServices.getAllPosts()
        return getproduct 
    } catch (error) {
        console.log(error.message);
        return rejectWithValue(error.message)   
    }
})
export const updatePost = createAsyncThunk('blog/update', async (postData,thunkAPI) => {
    const {rejectWithValue,getState} = thunkAPI
    try {
        const getproduct = await blogServices.updatePost(postData)
        return getproduct 
    } catch (error) {
        console.log(error.message);
        return rejectWithValue(error.message)   
    }
})
export const deletePost = createAsyncThunk('blog/delete', async (id,thunkAPI) => {
    const {rejectWithValue,getState} = thunkAPI
    try {
        const getproduct = await blogServices.deletePost(id)
        return getproduct 
    } catch (error) {
        console.log(error.message);
        return rejectWithValue(error.message)   
    }
})

export const blogSlice = createSlice({
    name:'blog',
    initialState,
    reducers:{
        reset: state => {
            state.isLoading = false
            state.message = ''
            state.isDeleted = false
            state.isError = false
            state.isSuccess = false
        },
    },
    extraReducers: builder => {
        builder
        // CREATE POST
        .addCase(createPost.pending, state => {
            state.isLoading = true
        })
        .addCase(createPost.fulfilled, (state,{payload}) => {
            state.isLoading = false 
            state.isSuccess = true 
            state.posts.push(payload.savedPost)
        })
        .addCase(createPost.rejected, (state,{payload}) => {
            state.isLoading = false
            state.message = payload.message
        })

        // POST DETAILS
        .addCase(getPostDetails.pending, state => {
            state.isLoading = true
        })
        .addCase(getPostDetails.fulfilled, (state,{payload}) => {
            state.isLoading = false
            state.isSuccess = true 
            state.postDetails = payload.post
        })
        .addCase(getPostDetails.rejected, (state,{payload}) => {
            state.isLoading = false
            state.message = payload.message
        })

        // ALL POSTS
        .addCase(allPosts.pending, state => {
            state.isLoading = true
        })
        .addCase(allPosts.fulfilled, (state,{payload}) => {
            state.isLoading = false
            state.isSuccess = true 
            state.posts = payload.posts
        })
        .addCase(allPosts.rejected, (state,{payload}) => {
            state.isLoading = false
            state.message = payload.message
        })
        // ALL POSTS
        .addCase(deletePost.pending, state => {
            state.isLoading = true
        })
        .addCase(deletePost.fulfilled, (state,{payload}) => {
            state.isLoading = false 
            state.isDeleted = true
        })
        .addCase(deletePost.rejected, (state,{payload}) => {
            state.isLoading = false
            state.isDeleted = false
            state.isError = false
            state.message = payload.message
        })
    }
})


export const {reset} = blogSlice.actions 

export default blogSlice.reducer