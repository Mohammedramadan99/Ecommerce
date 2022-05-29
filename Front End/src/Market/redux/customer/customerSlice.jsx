import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import customerService from './customerService'

const initialState = {
    customerRevs:[],
    allCustomerRevs:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:''
}

export const newCustomerRev = createAsyncThunk('customerRev/new', async (revData, thunkAPI) => {
    console.log(revData)
    return await customerService.newRev(revData)
})
export const getAllCustomerRevs = createAsyncThunk('customerRev/all', async (_, thunkAPI) => {
    return await customerService.allRev()
})

export const customerRevSlice = createSlice({
    name: 'customerRev',
    initialState,
    reducers: {
        reset: state => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
            
        },
    },
    extraReducers: builder => {
        builder
            .addCase(newCustomerRev.pending, state => {
                state.isLoading = true
            })
            .addCase(newCustomerRev.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.customerRevs.push(action.payload)
            })
            .addCase(newCustomerRev.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getAllCustomerRevs.pending, state => {
                state.isLoading = true
            })
            .addCase(getAllCustomerRevs.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.allCustomerRevs = action.payload.revs
            })
            .addCase(getAllCustomerRevs.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.message
            })
    }
})

export const { reset } = customerRevSlice.actions

export default customerRevSlice.reducer