import { Box, Button, Typography } from '@mui/material'
import { Link } from "react-router-dom";
import React from 'react'
import FormInput from '../components/FormInput';
import { useForm } from "react-hook-form";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    console.log(data)
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
                {/* email */}
                <FormInput 
                  name="email" 
                  type="text" 
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  label="Email"
                  {...register("email", { required: "email tidak boleh kosong" })} 
                />
                {/* password */}
                <FormInput 
                  name="password" 
                  type="text" 
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  label="Password"
                  {...register("password", { required: "password tidak boleh kosong" })} 
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