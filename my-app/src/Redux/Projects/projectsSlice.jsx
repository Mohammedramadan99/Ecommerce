import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import projectsServices from './projectsServices'

const initialState = {
    projects: [],
    projectDetails: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const allProjects = createAsyncThunk('projects', async (_, thunkAPI) =>
{
    try
    {
        return await projectsServices.allProjects()
    } catch (err)
    {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
export const singleProject = createAsyncThunk('project/details', async (id, thunkAPI) =>
{
    try
    {
        return await projectsServices.getProjectDetails(id)
    } catch (err)
    {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: 'projects',
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
            .addCase(allProjects.pending, state =>
            {
                state.isLoading = true
            })
            .addCase(allProjects.fulfilled, (state, { payload }) =>
            {
                state.isLoading = false
                state.isSuccess = true
                state.projects = payload.projects
            })
            .addCase(allProjects.rejected, (state, { payload }) =>
            {
                state.isLoading = false
                state.isError = true
                state.message = payload.message
            })
            .addCase(singleProject.pending, state =>
            {
                state.isLoading = true
            })
            .addCase(singleProject.fulfilled, (state, { payload }) =>
            {
                state.isLoading = false
                state.isSuccess = true
                state.projectDetails = payload.project
            })
            .addCase(singleProject.rejected, (state, { payload }) =>
            {
                state.isLoading = false
                state.isError = true
                state.message = payload.message
            })
    }
})

export const { reset } = authSlice.actions

export default authSlice.reducer