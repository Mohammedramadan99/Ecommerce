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
    myOrders:[],
    isLoading:false,
    isError:false,
    message:'',
    orderDetails:{
        order:{},
        isLoading:false,
        isError:false,
        message:''
    },
    order:{
        isLoading:false,
        isError:false,
        isUpdate:false,
        isDeleted:false,
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
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
export const getAdminOrders = createAsyncThunk('order/allorders', async (_,thunkAPI) => {
    const {rejectWithValue,getState} = thunkAPI
    try {
        return await orederServices.getAllOrders()
    } catch (error) {
        console.log(error.message);
        return rejectWithValue(error.message)   
    }
})
export const getMyOrders = createAsyncThunk('order/myOrders', async (_,thunkAPI) => {
    const {rejectWithValue,getState} = thunkAPI
    try {
        return await orederServices.getMyOrder()
    } catch (error) {
        console.log(error.message);
        return rejectWithValue(error.message)   
    }
})
export const updateOrder = createAsyncThunk('order/update', async (data,thunkAPI) => {
    const {rejectWithValue,getState} = thunkAPI
    console.log(data)
    try {
        const order = await orederServices.updateOrder(data)
        return order
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
export const getOrderDetails = createAsyncThunk('order/admin/details', async (id,thunkAPI) => {
    const {rejectWithValue,getState} = thunkAPI
    try {
        const order = await orederServices.singleOrder(id)
        return order
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
export const deleteOrder = createAsyncThunk('order/delete', async (id,thunkAPI) => {
    const {rejectWithValue,getState} = thunkAPI
    try {
        const status = await orederServices.deleteOrder(id)
        return status
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const orderSlice = createSlice({
    name:'order',
    initialState,
    reducers:{
        reset: state => {
            state.newOrder.message = ''
            state.orderDetails.message = ''
            state.allOrders.message = ''
            state.order.message = ''
            state.order.isDeleted = false
            state.order.isError = false
        },
    }, 
    extraReducers: builder => {
        builder
        // create order
        .addCase(createOrder.pending, state => {
            state.newOrder.isLoading = true
        })
        .addCase(createOrder.fulfilled, (state,{payload}) => {
            state.newOrder.isLoading = false 
            state.newOrder.isError = false
            state.newOrder.shippingInfo = payload.shippingInfo
            state.newOrder.paymentInfo = payload.paymentInfo
            state.newOrder.orderItems = payload.orderItems
            state.newOrder.taxPrice = payload.taxPrice
            state.newOrder.totalPrice = payload.totalPrice
            state.newOrder.shippingPrice = payload.shippingPrice
            state.newOrder.itemsPrice = payload.itemsPrice
            state.myOrders.push(payload)
        })
        .addCase(createOrder.rejected, (state,{payload}) => {
            state.newOrder.isLoading = false
            state.newOrder.isError = true
            state.newOrder.message = payload
        })

        // get admin orders
        .addCase(getAdminOrders.pending, (state,{payload}) => {
            state.allOrders.isLoading = true
        })
        .addCase(getAdminOrders.fulfilled, (state,{payload}) => {
            state.allOrders.isLoading = false
            state.allOrders.isError = false
            state.allOrders.orders = payload.orders
            state.allOrders.totalAmount = payload.totalAmount
            state.allOrders.ordersLength = payload.ordersLength
        })
        .addCase(getAdminOrders.rejected, (state,{payload}) => {
            state.allOrders.isLoading = false
            state.allOrders.isError = true
            state.allOrders.message = payload
            state.allOrders.orders = []
            state.allOrders.totalAmount = 0
            state.allOrders.ordersLength = 0
            
        })

        // get single order
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
        // get user's order
        .addCase(getMyOrders.pending, (state,{payload}) => {
            state.isLoading = true
        })
        .addCase(getMyOrders.fulfilled, (state,{payload}) => {
            state.isLoading = false
            state.isError = false
            state.myOrders = payload

        })
        .addCase(getMyOrders.rejected, (state,{payload}) => {
            state.isLoading = false
            state.isError = true
            state.message = payload
        })

        // update order
        .addCase(updateOrder.pending, (state,{payload}) => {
            state.order.isLoading = true
        })
        .addCase(updateOrder.fulfilled, (state,{payload}) => {
            state.order.isLoading = false
            state.order.isError = false
            state.order.isUpdate = payload
        })
        .addCase(updateOrder.rejected, (state,{payload}) => {
            state.order.isUpdate = false
            state.order.isLoading = false
            state.order.isError = true
            state.order.message = payload
        })
        // delete order
        .addCase(deleteOrder.pending, (state,{payload}) => {
            state.order.isLoading = true
        })
        .addCase(deleteOrder.fulfilled, (state,{payload}) => {
            state.order.isLoading = false
            state.order.isError = false
            state.order.isDeleted = payload
        })
        .addCase(deleteOrder.rejected, (state,{payload}) => {
            state.order.isLoading = false
            state.order.isError = true
            state.order.isDeleted = false
            state.order.message = payload
        })
    }
})


export const {reset} = orderSlice.actions 

export default orderSlice.reducer