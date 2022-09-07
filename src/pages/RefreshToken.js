import axios from 'axios';
import { useSelector } from 'react-redux';

const axiosJWT = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

axiosJWT.interceptors.request.use(async(config)=> {
    console.log('ss')
    const currentDate = new Date()
    const {user} = useSelector((state) => state.auth)
    if(user.exp * 1000 < currentDate.getTime()){
        const response = await axios.get('/token')
        config.headers.Authorization = `Bearer ${response.data.accessToken}`
    }
    return config 
    }, (error) => {
    return Promise.reject(error)
})

export default axiosJWT
