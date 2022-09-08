import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from '../services/User'

const initialState = {
    dataUser : null,
    isError : false,
    isSuccess : false,
    isLoading : false,
    message : ''
}

export const getUsers = createAsyncThunk("user/getUsers", async(token,thunkAPI) => {
    try {
        const response = await userService.getUsers(token)
        return response.data
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg
            return thunkAPI.rejectWithValue(message)
        }
    }
})
export const deleteUser = createAsyncThunk("user/deleteUser", async(data,thunkAPI) => {
    try {
        const response = await userService.deleteUser(data)
        return response.data
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg
            return thunkAPI.rejectWithValue(message)
        }
    }
})

export const useSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        reset: (state) => initialState
    },
    extraReducers:{
        [getUsers.pending] : (state) => {
            state.isLoading = true
        },
        [getUsers.fulfilled] : (state,action) => {
            state.isLoading = false
            state.isSuccess = true
            state.dataUser = action.payload
        },
        [getUsers.rejected] : (state,action) => {
            state.isError = true
            state.message = action.payload
        },
        [deleteUser.pending] : (state) => {
            state.isLoading = true
        },
        [deleteUser.fulfilled] : (state,action) => {
            state.isLoading = false
            state.isSuccess = true
        },
        [deleteUser.rejected] : (state,action) => {
            state.isError = true
            state.message = action.payload
        },
    }
})


export const {reset} = useSlice.actions
export default useSlice.reducer