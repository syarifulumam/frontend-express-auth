import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwtDecode from 'jwt-decode'
import authService from '../services/auth'

const initialState = {
    user : null,
    isError : false,
    isSuccess : false,
    isLoading : false,
    message : '',
    token : null
}

export const LoginUser = createAsyncThunk("user/LoginUser", async(user,thunkAPI) => {
    try {
        const response = await authService.Login(user.email,user.password)
        const decode = jwtDecode(response.data.accessToken)
        return {user: decode, token : response.data.accessToken}
    } catch (error) {
        if(error.response){
            const message = error.response.data.msg
            return thunkAPI.rejectWithValue(message)
        }
    }
})
export const RegisterUser = createAsyncThunk("user/RegisterUser", async(user,thunkAPI) => {
    try {
        const response = await authService.Register(user)
        return response.data
    } catch (error) {
        if(error.response){
            const message = error.response.data.msg
            return thunkAPI.rejectWithValue(message)
        }
    }
})

export const RefreshToken = createAsyncThunk("user/RefreshToken", async(_,thunkAPI) => {
    try {
        const response = await authService.RefreshToken()
        const decode = jwtDecode(response.data.accessToken)
        return {user: decode, token : response.data.accessToken}
    } catch (error) {
        if(error.response){
            const message = error.response.data.msg
            return thunkAPI.rejectWithValue(message)
        }
    }
})

export const Logout = createAsyncThunk("user/Logout", async() => {
    await authService.Logout()
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: {
        [LoginUser.pending] : (state) => {
            state.isLoading = true
        },
        [LoginUser.fulfilled] : (state,action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload.user
            state.token = action.payload.token
        },
        [LoginUser.rejected] : (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        },
        // Register
        [RegisterUser.pending] : (state) => {
            state.isLoading = true
        },
        [RegisterUser.fulfilled] : (state) => {
            state.isLoading = false
            state.isSuccess = true
        },
        [RegisterUser.rejected] : (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        },
        // Refresh Token
        [RefreshToken.pending] : (state) => {
            state.isLoading = true
        },
        [RefreshToken.fulfilled] : (state,action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload.user
            state.token = action.payload.token
        },
        [RefreshToken.rejected] : (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        },

    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer