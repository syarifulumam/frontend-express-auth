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

  return (
    <div className="App">
      <Navbar/>
      <Box>
        <Typography variant="h3" align="center">
          Selamat datang {user?.name}
        </Typography>
      </Box>
    </div>
  );
}

export default App;
