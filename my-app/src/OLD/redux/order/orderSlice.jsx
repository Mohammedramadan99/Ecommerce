import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import orederServices from '../order/orderService'

const initialState = {
    newOrder:{
        orderItems:[],
        itemsPrice:0,
        taxPrice:0,
        shippingPrice:0,
        totalPrice:0,
        isLoading: false,
        message:''
    },
    orders:[],
    orderDetails:{
        order:{},
        isLoading:false,
        isError:false,
        message:''
    },
    allOrders:{
        orders:[],
        totalAmount:0,
        ordersLength:0,
        isLoading:false,
        isError:false,
        message:'',
    }
}

export const createOrder = createAsyncThunk('order/new', async (shippingData,thunkAPI) => {
    const {rejectWithValue,getState} = thunkAPI
    try {
        const newOrder = await orederServices.newOrder(shippingData)
        console.log(newOrder)
        return newOrder.order
    } catch (error) {
        console.log(error.message);
        return rejectWithValue(error.message)   
    }
})
export const getOrder = createAsyncThunk('order/get', async (id,thunkAPI) => {
    const {rejectWithValue,getState} = thunkAPI
    try {
        const myOrder = await orederServices.singleOrder(id)
        console.log(myOrder)
        
        return myOrder
    } catch (error) {
        console.log(error.message);
        return rejectWithValue(error.message)   
    }
})
export const getOrders = createAsyncThunk('order/allorders', async (_,thunkAPI) => {
    const {rejectWithValue,getState} = thunkAPI
    try {
        return await orederServices.getAllOrders()
    } catch (error) {
        console.log(error.message);
        return rejectWithValue(error.message)   
    }
})

export const orderSlice = createSlice({
    name:'order',
    initialState,
    reducers:{
        reset: state => {
            // state.newOrder.message = ''
            state.orderDetails.message = ''
            // state.allOrders.message = ''
        },
    }, 
    extraReducers: builder => {
        builder
        .addCase(createOrder.pending, state => {
            state.newOrder.isLoading = true
        })
        .addCase(createOrder.fulfilled, (state,{payload}) => {
            state.newOrder.isLoading = false 
            state.newOrder.shippingInfo = payload.shippingInfo
            state.newOrder.paymentInfo = payload.paymentInfo
            state.newOrder.orderItems = payload.orderItems
            state.newOrder.taxPrice = payload.taxPrice
            state.newOrder.totalPrice = payload.totalPrice
            state.newOrder.shippingPrice = payload.shippingPrice
            state.newOrder.itemsPrice = payload.itemsPrice
            state.orders.push(payload)
        })
        .addCase(createOrder.rejected, (state,{payload}) => {
            state.newOrder.isLoading = false
            state.newOrder.isError = true
            state.newOrder.message = payload
        })

        .addCase(getOrders.pending, (state,{payload}) => {
            state.allOrders.isLoading = true
        })
        .addCase(getOrders.fulfilled, (state,{payload}) => {
            state.allOrders.isLoading = false
            state.allOrders.orders = payload.orders
            state.allOrders.totalAmount = payload.totalAmount
            state.allOrders.ordersLength = payload.ordersLength


        })
        .addCase(getOrders.rejected, (state,{payload}) => {
            state.allOrders.isLoading = false
            state.allOrders.isError = true
            state.allOrders.message = payload
            state.allOrders.orders = []
            state.allOrders.totalAmount = 0
            state.allOrders.ordersLength = 0
            
        })

        .addCase(getOrder.pending, (state,{payload}) => {
            state.orderDetails.isLoading = true
        })
        .addCase(getOrder.fulfilled, (state,{payload}) => {
            state.orderDetails.isLoading = false
            state.orderDetails.isError = false
            state.orderDetails.order = payload


        })
        .addCase(getOrder.rejected, (state,{payload}) => {
            state.orderDetails.isLoading = false
            state.orderDetails.isError = true
            state.orderDetails.message = payload
            
        })
    }
})


export const {reset} = orderSlice.actions 

export default orderSlice.reducer