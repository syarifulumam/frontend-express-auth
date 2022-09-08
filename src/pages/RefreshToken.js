import axios from 'axios';
import jwtDecode from 'jwt-decode'

const axiosJWT = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

axiosJWT.interceptors.request.use(async req => {
    const currentDate = new Date()
    const token = req.headers.authorization
    const decode = jwtDecode(token)
    if(decode.exp * 1000 < currentDate.getTime()){
        console.log('ss')
        const response = await axios.get('/token')
        req.headers.authorization = `Bearer ${response.data.accessToken}`
    }
    return req
}, (error) => {
    return Promise.reject(error)
})


export default axiosJWT  
