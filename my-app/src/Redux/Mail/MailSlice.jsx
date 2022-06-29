import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import sendMailService from './MailServices'

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const sendMail = createAsyncThunk('mail', async (data, thunkAPI) =>
{
    try
    {
        console.log(data)
        return await sendMailService.Send(data)
    } catch (err)
    {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: 'mail',
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
            .addCase(sendMail.pending, state =>
            {
                state.isLoading = true
            })
            .addCase(sendMail.fulfilled, (state, action) =>
            {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
            })
            .addCase(sendMail.rejected, (state, action) =>
            {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.message
            })
    }
})

export const { reset } = authSlice.actions

export default authSlice.reducer