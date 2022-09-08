import axios from "axios";
import axiosJWT from '../pages/RefreshToken'

const getUsers = (token) => {
    return axiosJWT.get('/user',{
        headers: {
            'authorization': 'Bearer ' + token,
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }
    })
}
const getUserById = (id) => {
    return axios.get(`/user/${id}`)
}
const updateUser = (data) => {
    return axios.patch(`/user/${data.id}`,data)
}
const deleteUser = (data) => {
    return axiosJWT.delete(`/user/${data.id}`,{
        headers: {
            'authorization': 'Bearer ' + data.token,
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

const userService = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}

export default userService