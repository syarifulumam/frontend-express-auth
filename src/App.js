import { Box, Button, Typography } from "@mui/material";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from "react";
import { RefreshToken } from "./features/authSlice";

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user,isError,isSuccess,isLoading,message} = useSelector((state) => state.auth)

  useEffect(() => {
    if(user === null){
      dispatch(RefreshToken())
    }
  }, [user])

  const onSubmit = () => {
    dispatch(RefreshToken())
  }

  // const axiosJWT = axios.create()
  // axiosJWT.interceptors.request.use(async(config)=> {
  //   const currentDate = new Date()
  //   if(expire * 1000 < currentDate.getTime()){
  //     const response = await axios.get('/token')
  //     config.headers.Authorization = `Bearer ${response.data.accessToken}`
  //     setToken(response.data.accessToken)
  //     const decode = jwtDecode(response.data.accessToken)
  //     setName(decode.name)
  //     setExpire(decode.exp)
  //   }
  //   return config 
  // }, (error) => {
  //   return Promise.reject(error)
  // })

  return (
    <div className="App">
      <Navbar/>
      <Box>
        <Typography variant="h3" align="center">
          Selamat datang {user?.name}
        </Typography>
        <Button fullWidth={true} onClick={onSubmit} disabled={isLoading} variant="contained" sx={{ marginTop: 2 }}>Refresh Token</Button>
      </Box>
    </div>
  );
}

export default App;
