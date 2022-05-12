import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import productsService from './productsService'

const myProducts = JSON.parse(localStorage.getItem('products'))

const initialState = {
    products: myProducts ? myProducts : [],
    allProducts:[],
    newProduct:{},
    productDetails: {},
    reviewSuccess:false,
    isError: false,
    isSuccess: false ,
    isLoading: false,
    isDeleted: false,
    message:''
}

export const getProducts = createAsyncThunk('products', async (category,thunkAPI) => {
    return await productsService.products(category)
})
export const getAdminProducts = createAsyncThunk('products/admin', async (_,thunkAPI) => {
    return await productsService.getAdminProducts()
})
export const removeProduct = createAsyncThunk('products/deleteProduct', async (id,thunkAPI) => {
    return await productsService.deleteProduct(id)
})

export const getProductDetails = createAsyncThunk('products/productDetails', async (id,thunkAPI) => {
    return await productsService.productDetails(id)
})

export const addReview = createAsyncThunk('products/review', async (review,thunkAPI) => {
    return await productsService.newReview(review)
})
export const createProduct = createAsyncThunk('products/createProduct', async (productData,thunkAPI) => {
    return await productsService.createProduct(productData)
})


export const authSlice = createSlice({
    name:'products',
    initialState,
    reducers:{
        reset: state => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.reviewSuccess = false
            state.message = ''
        },
    },
    extraReducers: builder => {
        builder
        .addCase(getProducts.pending, state => {
            state.isLoading = true
        })
        .addCase(getProducts.fulfilled, (state,action) => {
            state.isLoading = false 
            state.isSuccess = true 
            state.products = action.payload
            console.log(state.products)
        })
        .addCase(getProducts.rejected, (state,action) => {
            state.isLoading = false 
            state.isError = true
            state.message = action.payload
            state.products = []
        })
        .addCase(getAdminProducts.pending, state => {
            state.isLoading = true
        })
        .addCase(getAdminProducts.fulfilled, (state,action) => {
            state.isLoading = false 
            state.isSuccess = true 
            state.allProducts = action.payload
        })
        .addCase(getAdminProducts.rejected, (state,action) => {
            state.isLoading = false 
            state.isError = true
            state.message = action.payload
            state.allProducts = []
        })
        .addCase(getProductDetails.pending, (state,action) => {
            state.isLoading = true
            state.isError = false
            state.productDetails = {}
        })
        .addCase(getProductDetails.fulfilled, (state,action) => {
            state.isLoading = false
            state.isSuccess=true
            state.productDetails = action.payload
        })
        .addCase(getProductDetails.rejected, (state,action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(addReview.pending,(state,action) => {
            state.isLoading = true
            state.reviewSuccess = false
        })
        .addCase(addReview.fulfilled,(state,action) => {
            state.isLoading = false
            state.reviewSuccess = action.payload
        })
        .addCase(addReview.rejected,(state,action) => {
            state.isLoading = false
            state.isError = true
            state.reviewSuccess = false
            state.message = action.payload
        })
        .addCase(removeProduct.pending,(state,action) => {
            state.isLoading = true
        })
        .addCase(removeProduct.fulfilled,(state,action) => {
            state.isLoading = false
            state.isDeleted = true
            state.message = action.payload
        })
        .addCase(removeProduct.rejected,(state,action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(createProduct.pending,(state,action) => {
            state.isLoading = true
        })
        .addCase(createProduct.fulfilled,(state,action) => {
            state.isLoading = false
            state.newProduct = action.payload.product
        })
        .addCase(createProduct.rejected,(state,action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset} = authSlice.actions

export default authSlice.reducer