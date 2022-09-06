import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import userReducer from '../features/userSlice'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
}

const reducer = combineReducers({
  auth:authReducer,
  user:userReducer
})

const persistedReducer = persistReducer(persistConfig,reducer)

export const store = configureStore({
  reducer: persistedReducer
})