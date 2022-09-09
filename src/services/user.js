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
const getUserById = ({id,token}) => {
    return axiosJWT.get(`/user/${id}`,{
        headers: {
            'authorization': 'Bearer ' + token,
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }
    })
}
const updateUser = ({id,token,data}) => {
    return axiosJWT.patch(`/user/${id}`,data,{
        headers: {
            'authorization': 'Bearer ' + token,
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }
    })
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