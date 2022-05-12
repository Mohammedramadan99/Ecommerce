import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'
const userInfo = JSON.parse(localStorage.getItem('user'))

const initialState = {
    userInfo:{
        user:{}
    },
    users:[],
    isError: false ,
    LogInShow:false,
    isSuccess: false ,
    isLoading: false,
    message:''
}

export const register = createAsyncThunk('auth/register', async (user,thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const login = createAsyncThunk('auth/login', async (user,thunkAPI) => {
    try {
        const data =  await authService.login(user)
        console.log(data)
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        console.log(err)
        return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk('auth/logout', async () => {
    return await authService.logout()
})
export const ShowLogin = createAsyncThunk('auth/showLogin', async (showCase,thunkAPI) => {
    return showCase
})

export const allUsers = createAsyncThunk('auth/allUsers', async (_,thunkAPI) => {
    try {
        return await authService.getAllUsers()
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        reset: state => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        },
    },
    extraReducers: builder => {
        builder
        .addCase(register.pending, state => {
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state,action) => {
            state.isLoading = false 
            state.isSuccess = true 
            state.userInfo = action.payload
        })
        .addCase(register.rejected, (state,action) => {
            state.isLoading = false 
            state.isError = true
            state.message = action.payload
            state.userInfo = null
            console.log(action.payload)
        })
        .addCase(login.pending, state => {
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state,action) => {
            state.isLoading = false 
            state.isSuccess = true 
            state.userInfo = action.payload.userInfo
        })
        .addCase(login.rejected, (state,action) => {
            state.isLoading = false 
            state.isError = true
            state.message = action.payload
            state.userInfo.user = {}
            console.log( action.payload )
        })
        .addCase(logout.fulfilled, state => {
            state.userInfo.user = {}
            state.userInfo.token = null
        })
        .addCase(allUsers.pending, state => {
            state.isLoading = true
        })
        .addCase(allUsers.fulfilled, (state,{payload}) => {
            state.isLoading = false
            state.users = payload
        })
        .addCase(allUsers.rejected, (state,{payload}) => {
            state.isError = true 
            state.isLoading = false
            state.message = payload 
        })
        .addCase(ShowLogin.pending, state => {
            state.isLoading = true
        })
        .addCase(ShowLogin.fulfilled, (state,{payload}) => {
            state.isLoading = false
            state.LogInShow = payload
        })
        .addCase(ShowLogin.rejected, (state,{payload}) => {
            state.isError = true 
            state.isLoading = false
            state.message = payload 
        })
    }
})

export const {reset} = authSlice.actions

export default authSlice.reducer