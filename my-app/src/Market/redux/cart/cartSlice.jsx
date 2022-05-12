import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import cartServices from './cartService'

const allProducts = JSON.parse(localStorage.getItem('products'))


const initialState = {
    products:[],
    shippingAddress:{},
    quantity:0,
    total:0,
    isLoading: false,
    message:''
}

export const addProduct = createAsyncThunk('cart', async (product,thunkAPI) => {
    const {rejectWithValue,getState} = thunkAPI
    try {
        const getproduct = await cartServices.addItemsToCart(product)
        // const cartProducts = getState().cart.products
        return getproduct 
    } catch (error) {
        console.log(error.message);
        return rejectWithValue(error.message)   
    }
})
export const clearCart = createAsyncThunk('cart/clear', async (_,thunkAPI) => {
    const {rejectWithValue,getState} = thunkAPI
    try {
        return null
    } catch (error) {
        console.log(error.message);
        return rejectWithValue(error.message)   
    }
})
export const saveShippingAddress = createAsyncThunk('cart/shipping', async (shippingData,thunkAPI) => {
    const {rejectWithValue,getState} = thunkAPI
    try {
        return shippingData
    } catch (error) {
        console.log(error.message);
        return rejectWithValue(error.message)   
    }
})
// export const addReview = createAsyncThunk('products/review', async (review,thunkAPI) => {
//     return await productsService.newReview(review)
// })


export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        reset: state => {
            state.isLoading = false
            state.message = ''
        },
    },
    extraReducers: builder => {
        builder
        .addCase(addProduct.pending, state => {
            state.isLoading = true
        })
        .addCase(addProduct.fulfilled, (state,{payload}) => {
            state.isLoading = false 
            state.quantity += 1
            state.products.push(payload)
            state.total = payload.price * payload.quantity
        })
        .addCase(addProduct.rejected, (state,{payload}) => {
            state.isLoading = false
            state.message = payload
            state.products = []
        })
        .addCase(clearCart.pending, state => {
            state.isLoading = true
        })
        .addCase(clearCart.fulfilled, (state,{payload}) => {
            state.isLoading = false 
            state.quantity = 0
            state.products = []
            state.total = 0
        })
        .addCase(clearCart.rejected, (state,{payload}) => {
            state.isLoading = false
            state.message = payload
        })
        .addCase(saveShippingAddress.pending, state => {
            state.isLoading = true
        })
        .addCase(saveShippingAddress.fulfilled, (state,{payload}) => {
            state.isLoading = false 
            state.shippingInfo = payload
            
        })
        .addCase(saveShippingAddress.rejected, (state,{payload}) => {
            state.isLoading = false
            state.message = payload
            state.products = []
        })
    }
})


export const {reset} = cartSlice.actions 

export default cartSlice.reducer