import axios from "axios";

const Login = (email,password) => {
    return axios.post('/login',{
        email: email,
        password: password
    })
}
const Register = (data) => {
    return axios.post('/register',data)
}
const Logout = () => {
    return axios.delete('/logout')
}
const RefreshToken = () => {
    return axios.get('/token')
}

const authService = {
    Login,
    Register,
    RefreshToken,
    Logout
}

export default authService