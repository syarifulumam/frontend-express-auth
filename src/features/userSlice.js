// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import userService from '../services/User'

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

export const updateUser = createAsyncThunk("user/updateUser", async(data,thunkAPI) => {
    try {
        const response = await userService.updateUser(data)
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

const usersEntity = createEntityAdapter({
    selectId: (user) => user.id
})

export const useSlice = createSlice({
    name: 'user',
    initialState: usersEntity.getInitialState(),
    extraReducers:{
        [getUsers.fulfilled] : (state, action) => {
            usersEntity.setAll(state, action.payload)
        },
        [deleteUser.fulfilled] : (state, action) => {
            usersEntity.removeOne(state, action.payload)
        },
        [updateUser.fulfilled] : (state, action) => {
            usersEntity.updateOne(state, {id: action.payload.id, updates: action.payload})
        },
    }
})


export const {reset} = useSlice.actions
export const usersSelectors = usersEntity.getSelectors(state => state.user)
export default useSlice.reducer