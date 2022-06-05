import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productsService from './productsService'

const myProducts = JSON.parse(localStorage.getItem('products'))

const initialState = {
    products: myProducts ? myProducts : [],
    filterProducts:{
        products: [],
        filteredProductsCount:1,
        productsCount:0,
        resultPerPage:1,
        isLoading:false,
        isError:false,
        isSuccess:false,
        message:''
    },
    allProducts: [],
    newProduct: {},
    productDetails: {},
    productReviews: {
        isError: false, reviews: [], isLoading: false, message: ''
    },
    review: {
        isLoading: false,
        isDeleted: false,
        isError: false,
        message: ''
    },
    reviewSuccess: false,
    isError: false,
    isSuccess: false,
    isLoading: false,
    isDeleted: false,
    isUpdated: false,
    resultPerPage:1,
    productsCount:1,
    message: ''
}

export const getProducts = createAsyncThunk('products', async (productsData, thunkAPI) => {
    console.log(productsData)
    return await productsService.products(productsData)
})
export const getFilterProducts = createAsyncThunk('products/filter', async (productsData, thunkAPI) => {
    console.log(productsData)
    return await productsService.productsFilter(productsData)
})
export const getAdminProducts = createAsyncThunk('products/admin', async (_, thunkAPI) => {
    return await productsService.getAdminProducts()
})
export const removeProduct = createAsyncThunk('products/deleteProduct', async (id, thunkAPI) => {
    return await productsService.deleteProduct(id)
})

export const getProductDetails = createAsyncThunk('products/productDetails', async (id, thunkAPI) => {
    return await productsService.productDetails(id)
})

export const addReview = createAsyncThunk('products/review', async (review, thunkAPI) => {
    return await productsService.newReview(review)
})
export const createProduct = createAsyncThunk('products/createProduct', async (productData, thunkAPI) => {
    return await productsService.createProduct(productData)
})
export const updateProduct = createAsyncThunk('products/updateProduct', async (productData, thunkAPI) => {
    return await productsService.updateProduct(productData)
})
export const getProductReviews = createAsyncThunk('products/productReviews', async (id, thunkAPI) => {
    const result = await productsService.productsReviews(id)
    return result
})
export const deleteReview = createAsyncThunk('products/deleteReview', async (data, thunkAPI) => {
    return await productsService.deleteReview(data)
})


export const authSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        reset: state => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.reviewSuccess = false
            state.message = ''
            state.productReviews.isError = false
            state.productReviews.isLoading = false
            state.productReviews.message = false
            state.review.isDeleted = false
            state.review.isError = false
            state.filterProducts.isLoading = false
            state.filterProducts.isError = false
            state.filterProducts.isSuccess = false
            state.filterProducts.message = ''
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getProducts.pending, state => {
                state.isLoading = true
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.products = action.payload.products
                state.resultPerPage = action.payload.resultPerPage
                state.productsCount = action.payload.productsCount
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.products = []
            })
            .addCase(getFilterProducts.pending, state => {
                state.filterProducts.isLoading = true
            })
            .addCase(getFilterProducts.fulfilled, (state, action) => {
                state.filterProducts.isLoading = false
                state.filterProducts.isSuccess = true
                state.filterProducts.products = action.payload.products
                state.filterProducts.filteredProductsCount = action.payload.filteredProductsCount
                state.filterProducts.resultPerPage = action.payload.resultPerPage
                state.filterProducts.productsCount = action.payload.productsCount
            })
            .addCase(getFilterProducts.rejected, (state, action) => {
                state.filterProducts.isLoading = false
                state.filterProducts.isSuccess = false
                state.filterProducts.isError = true
                state.message = action.payload.message
            })
            .addCase(getAdminProducts.pending, state => {
                state.isLoading = true
            })
            .addCase(getAdminProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.allProducts = action.payload
            })
            .addCase(getAdminProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.allProducts = []
            })
            .addCase(getProductDetails.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.productDetails = {}
            })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.productDetails = action.payload
            })
            .addCase(getProductDetails.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(addReview.pending, (state, action) => {
                state.isLoading = true
                state.reviewSuccess = false
            })
            .addCase(addReview.fulfilled, (state, action) => {
                state.isLoading = false
                state.reviewSuccess = action.payload
            })
            .addCase(addReview.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.reviewSuccess = false
                state.message = action.payload
            })
            .addCase(removeProduct.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(removeProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isDeleted = true
                state.message = action.payload
            })
            .addCase(removeProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createProduct.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.newProduct = action.payload.product
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            // get all reviews of the products
            .addCase(getProductReviews.pending, (state, action) => {
                state.productReviews.isLoading = true
            })
            .addCase(getProductReviews.fulfilled, (state, action) => {
                state.productReviews.isLoading = false
                state.productReviews.reviews = action.payload
            })
            .addCase(getProductReviews.rejected, (state, action) => {
                state.productReviews.isLoading = false
                state.productReviews.isError = true
                state.productReviews.message = action.payload
            })

            // delete a review 
            .addCase(deleteReview.pending, (state, action) => {
                state.review.isLoading = true
            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                state.review.isLoading = false
                state.review.isDeleted = action.payload
            })
            .addCase(deleteReview.rejected, (state, action) => {
                state.review.isLoading = false
                state.review.isError = true
                state.review.message = action.payload
            })
            //  update product
            .addCase(updateProduct.pending, (state, action) => {
                state.review.isLoading = true
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isUpdated = true
                state.message = action.payload.message
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = authSlice.actions

export default authSlice.reducer