import { Box, Button, Typography } from '@mui/material'
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from 'react'
import FormInput from '../components/FormInput';
import { useForm } from "react-hook-form";
import { useDispatch,useSelector } from 'react-redux';
import { LoginUser,reset } from '../features/authSlice';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {user,isError,isSuccess,isLoading,message} = useSelector((state) => state.auth)

  useEffect(() => {
    if(user || isSuccess){
      return navigate('/')
    }
  }, [user,isSuccess,dispatch,navigate])
  
  const onSubmit = async(data) => {
    dispatch(LoginUser(data))
  }
  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box 
                display="flex" 
                flexDirection="column"
                maxWidth="25%"
                alignItems="center"
                justifyContent="center"
                margin="auto"
                marginTop="10%"
                border="1px solid black"
                padding="20px"
                borderRadius={2}
            >
                <Typography variant='h4'>Login</Typography>
                {isError && (
                  <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error">{message}</Alert>
                  </Stack>
                )}
                {/* email */}
                <FormInput 
                  name="email" 
                  type="text" 
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  label="Email"
                  {...register("email", { 
                    required: "email tidak boleh kosong",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email tidak valid"
                    }
                  })} 
                />
                {/* password */}
                <FormInput 
                  name="password" 
                  type="password" 
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  label="Password"
                  {...register("password", { 
                    required: "password tidak boleh kosong",
                    minLength: {value: 3, message: "password minimal 8 huruf"}
                  })} 
                />
                <Typography width={"100%"} variant="caption">
                  Belum punya akun? 
                  <Link to="/register" style={{ textDecoration:"none" }}>daftar disini</Link>
                </Typography>
            <Button type="submit" fullWidth={true} disabled={isLoading} variant="contained" sx={{ marginTop: 2 }}>Login</Button>
            </Box>
        </form>
    </>
  )
}

export default Login