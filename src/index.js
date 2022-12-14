import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App';
import Login from './pages/Login';
import Register from './pages/Register';
import EditUser from './pages/EditUser';
import User from './pages/User'
import axios from 'axios';
import { store } from './app/store'
import { Provider } from 'react-redux'
import PrivateRoute from './utils/PrivateRoute'
import AdminOnly from './utils/AdminOnly'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true

let persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route element={<PrivateRoute />}>
                  <Route path="/" element={<App />}/>
                  <Route element={<AdminOnly />}>
                    <Route path="/user" element={<User />}/>
                    <Route path="/user/:id/edit" element={<EditUser />}/>
                  </Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </PersistGate>
        </Provider>
    </React.StrictMode>
);
