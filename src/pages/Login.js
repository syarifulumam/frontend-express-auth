import { Box, Button, Typography } from '@mui/material'
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react'
import FormInput from '../components/FormInput';
import { useForm } from "react-hook-form";
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function Login() {
  const navigate = useNavigate()
  const [message,setMessage] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async(data) => {
    try {
      await axios.post('/login',data)
      navigate('/')
    } catch (error) {
      if(error.response) return setMessage(error.response.data.msg)
    }
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
                {message !== "" && (
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
                <Button type="submit" fullWidth={true} variant="contained" sx={{ marginTop: 2 }}>Login</Button>
            </Box>
        </form>
    </>
  )
}

export default Login