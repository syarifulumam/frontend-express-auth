import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App';
import Login from './pages/Login';
import Register from './pages/Register';
import User from './pages/User'
import axios from 'axios';
import { store } from './app/store'
import { Provider } from 'react-redux'
import RequestLogin from './pages/RequestLogin'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />}/>
              <Route path="/register" element={<Register />}/>
              <Route element={<RequestLogin />}>
                <Route path="/" element={<App />}/>
                <Route path="/user" element={<User />}/>
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

