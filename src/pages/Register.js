import { Box, Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import { useForm } from "react-hook-form";
import FormInput from '../components/FormInput';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useDispatch,useSelector } from 'react-redux';
import { RegisterUser, reset } from '../features/authSlice';

function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user,isError,isSuccess,isLoading,message} = useSelector((state) => state.auth)
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  useEffect(() => {
    if(user || isSuccess) {
      dispatch(reset()) 
      return navigate('/login')
    }
    // dispatch(reset()) 
  }, [user,isSuccess,dispatch,navigate])

  const onSubmit = async (data) => {
    dispatch(RegisterUser(data))
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
                marginTop="5%"
                border="1px solid black"
                padding="20px"
                borderRadius={2}
            >
                <Typography variant='h4'>Register</Typography>
                {isError && (
                  <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error">{message}</Alert>
                  </Stack>
                )}
                {/* Name */}
                <FormInput 
                  name="name" 
                  type="text" 
                  error={!!errors.name}
                  helperText={errors?.name?.message}
                  label="Name"
                  {...register("name", { 
                    required: "nama tidak boleh kosong",
                    minLength: {value: 3, message: "Name minimal 3 huruf"}
                  })} 
                />
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
                {/* confirmation password */}
                <FormInput 
                  name="confirmation_password" 
                  type="password" 
                  error={!!errors.confirmation_password}
                  helperText={errors?.confirmation_password?.message}
                  label="Password Confirmation"
                  {...register("confirmation_password", { 
                    required: "password confirmasi tidak boleh kosong",
                    minLength: {value: 3, message: "password confirmasi minimal 8 huruf"}
                  })} 
                />
                {/* role */}
                <FormInput 
                  name="role" 
                  type="select" 
                  error={!!errors.role}
                  helperText={errors?.role?.message}
                  label="Role"
                  defaultValue={''}
                  select={true}
                  {...register("role", { required: "role tidak boleh kosong" })} 
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                </FormInput>
                <Typography width={"100%"} variant="caption">
                  Sudah ada akun? 
                  <Link to="/login" style={{ textDecoration:"none" }}>login disini</Link>
                </Typography>
                <Button type="submit" fullWidth={true} disabled={isLoading} variant="contained"  sx={{ marginTop: 2 }}>Register</Button>
            </Box>
        </form>
    </>
  )
}

export default Register