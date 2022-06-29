import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'
const userInfo = JSON.parse(localStorage.getItem('user'))

const initialState = {
    userInfo: {
        user: {}
    },
    users: [],
    user: {},
    profile: {
        isLoading: false,
        isDeleted: false,
        isUpdated: false,
        isError: false,
        message: ''
    },
    isError: false,
    LogInShow: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) =>
{
    try
    {
        return await authService.register(user)
    } catch (err)
    {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) =>
{
    try
    {
        const data = await authService.login(user)
        console.log(data)
        return data
    } catch (err)
    {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        console.log(err)
        return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk('auth/logout', async () =>
{
    return await authService.logout()
})
export const ShowLogin = createAsyncThunk('auth/showLogin', async (showCase, thunkAPI) =>
{
    return showCase
})

export const allUsers = createAsyncThunk('auth/allUsers', async (_, thunkAPI) =>
{
    try
    {
        return await authService.getAllUsers()
    } catch (err)
    {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteUser = createAsyncThunk('auth/delete', async (id, thunkAPI) =>
{
    try
    {
        return await authService.deleteUser(id)
    } catch (err)
    {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
export const updateUser = createAsyncThunk('auth/user/update', async (data, thunkAPI) =>
{
    try
    {
        return await authService.updateUser(data)
    } catch (err)
    {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
export const updateProfile = createAsyncThunk('auth/profile/update', async (data, thunkAPI) =>
{
    try
    {
        return await authService.updateProfile(data)
    } catch (err)
    {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
export const loadUser = createAsyncThunk('auth/loadUser', async (_, thunkAPI) =>
{
    try
    {
        return await authService.loadUser()
    } catch (err)
    {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getSingleUser = createAsyncThunk('auth/singleUser', async (id, thunkAPI) =>
{
    try
    {
        return await authService.getSingleUser(id)
    } catch (err)
    {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
export const forgotPassword = createAsyncThunk('auth/forgot_password', async (email, thunkAPI) =>
{
    try
    {
        return await authService.forgotPassword(email)
    } catch (err)
    {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
export const resetPassword = createAsyncThunk('auth/resetpassword', async (resetData, thunkAPI) =>
{
    try
    {
        console.log(resetData)
        return await authService.resetPassword(resetData)
    } catch (err)
    {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: state =>
        {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.profile.isUpdated = false
            state.profile.isLoading = false
            state.profile.isSuccess = false
            state.message = ''
        },
    },
    extraReducers: builder =>
    {
        builder
            .addCase(register.pending, state =>
            {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) =>
            {
                state.isLoading = false
                state.isSuccess = true
                state.userInfo = action.payload
            })
            .addCase(register.rejected, (state, action) =>
            {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.userInfo = null
                console.log(action.payload)
            })
            .addCase(login.pending, state =>
            {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) =>
            {
                state.isLoading = false
                state.isSuccess = true
                state.userInfo = action.payload
            })
            .addCase(login.rejected, (state, action) =>
            {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.userInfo.user = {}
                console.log(action.payload)
            })
            .addCase(logout.fulfilled, state =>
            {
                state.userInfo.user = {}
                state.userInfo.token = null
            })
            .addCase(allUsers.pending, state =>
            {
                state.isLoading = true
            })
            .addCase(allUsers.fulfilled, (state, { payload }) =>
            {
                state.isLoading = false
                state.users = payload
            })
            .addCase(allUsers.rejected, (state, { payload }) =>
            {
                state.isError = true
                state.isLoading = false
                state.message = payload
            })
            .addCase(ShowLogin.pending, state =>
            {
                state.isLoading = true
            })
            .addCase(ShowLogin.fulfilled, (state, { payload }) =>
            {
                state.isLoading = false
                state.LogInShow = payload
            })
            .addCase(ShowLogin.rejected, (state, { payload }) =>
            {
                state.isError = true
                state.isLoading = false
                state.message = payload
            })

            // delete User
            .addCase(deleteUser.pending, state =>
            {
                state.isLoading = true
            })
            .addCase(deleteUser.fulfilled, (state, { payload }) =>
            {
                state.isLoading = false
                state.profile.isDeleted = payload.success
                state.profile.message = payload.message
            })
            .addCase(deleteUser.rejected, (state, { payload }) =>
            {
                state.isLoading = false
                state.profile.isError = true
                state.profile.isDeleted = false
                state.profile.message = payload.message
            })

            // update User
            .addCase(updateUser.pending, state =>
            {
                state.isLoading = true
            })
            .addCase(updateUser.fulfilled, (state, { payload }) =>
            {
                state.isLoading = false
                state.profile.isUpdated = payload.success
            })
            .addCase(updateUser.rejected, (state, { payload }) =>
            {
                state.isLoading = false
                state.profile.isError = true
                state.profile.isUpdated = false
                state.profile.message = payload.message
            })

            // update Profile
            .addCase(updateProfile.pending, state =>
            {
                state.isLoading = true
            })
            .addCase(updateProfile.fulfilled, (state, { payload }) =>
            {
                state.isLoading = false
                state.profile.isUpdated = payload.success
            })
            .addCase(updateProfile.rejected, (state, { payload }) =>
            {
                state.isLoading = false
                state.profile.isError = true
                state.profile.isUpdated = false
                state.profile.message = payload.message
            })

            // load user
            .addCase(loadUser.pending, state =>
            {
                state.isLoading = true
            })
            .addCase(loadUser.fulfilled, (state, { payload }) =>
            {
                state.isLoading = false
                state.userInfo.user = payload
            })
            .addCase(loadUser.rejected, (state, { payload }) =>
            {
                state.isLoading = false
                state.profile.isError = true
                state.profile.isUpdated = false
                state.profile.message = payload.message
            })
            // single user
            .addCase(getSingleUser.pending, state =>
            {
                state.isLoading = true
            })
            .addCase(getSingleUser.fulfilled, (state, { payload }) =>
            {
                state.isLoading = false
                state.user = payload.user
            })
            .addCase(getSingleUser.rejected, (state, { payload }) =>
            {
                state.isLoading = false
                state.isError = true
                state.message = payload.message
            })
            // forgotPassword 
            .addCase(forgotPassword.pending, state =>
            {
                state.isLoading = true
            })
            .addCase(forgotPassword.fulfilled, (state, { payload }) =>
            {
                state.isLoading = false
                state.message = payload
                state.isSuccess = true
            })
            .addCase(forgotPassword.rejected, (state, { payload }) =>
            {
                state.isLoading = false
                state.isError = true
                state.message = payload
            })
            // resetPassword
            .addCase(resetPassword.pending, state =>
            {
                state.isLoading = true
            })
            .addCase(resetPassword.fulfilled, (state, { payload }) =>
            {
                state.isLoading = false
                state.isSuccess = true
                state.message = payload
            })
            .addCase(resetPassword.rejected, (state, { payload }) =>
            {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = payload
            })
    }
})

export const { reset } = authSlice.actions

export default authSlice.reducer