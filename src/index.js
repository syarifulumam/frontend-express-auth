import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App';
import Login from './pages/Login';
import Register from './pages/Register';
import User from './pages/User'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/user" element={<User />}/>
          </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

