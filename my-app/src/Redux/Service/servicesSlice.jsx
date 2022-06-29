import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const API_URL = '/api/v1/'

const initialState = {
    allServices: [],
    serviceDetails: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getAllServices = createAsyncThunk('services', async (_, thunkAPI) =>
{
    try
    {
        const { data } = await axios.get(API_URL + "services")
        console.log(data)
        return await data
    } catch (err)
    {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
export const getServiceDetails = createAsyncThunk('services/serviceDetails', async (id, thunkAPI) =>
{
    try
    {
        const { data } = await axios.get(API_URL + `service/${id}`)
        console.log(data)
        return await data
    } catch (err)
    {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const ServicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        reset: state =>
        {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        },
    },
    extraReducers: builder =>
    {
        builder
            .addCase(getAllServices.pending, state =>
            {
                state.isLoading = true
            })
            .addCase(getAllServices.fulfilled, (state, { payload }) =>
            {
                state.isLoading = false
                state.isSuccess = true
                state.allServices = payload.services
                state.message = payload.message
            })
            .addCase(getAllServices.rejected, (state, { payload }) =>
            {
                state.isLoading = false
                state.isError = true
                state.message = payload.message
            })
            .addCase(getServiceDetails.pending, state =>
            {
                state.isLoading = true
            })
            .addCase(getServiceDetails.fulfilled, (state, { payload }) =>
            {
                state.isLoading = false
                state.isSuccess = true
                state.serviceDetails = payload.service
            })
            .addCase(getServiceDetails.rejected, (state, { payload }) =>
            {
                state.isLoading = false
                state.isError = true
                state.message = payload.message
            })
    }
})

export const { reset } = ServicesSlice.actions

export default ServicesSlice.reducer