import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { Link } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { useForm } from "react-hook-form";
import FormInput from '../components/FormInput';

function Register() {
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
                marginTop="5%"
                border="1px solid black"
                padding="20px"
                borderRadius={2}
            >
                <Typography variant='h4'>Register</Typography>
                {/* Name */}
                <FormInput 
                  name="name" 
                  type="text" 
                  error={!!errors.name}
                  helperText={errors?.name?.message}
                  label="Name"
                  {...register("name", { required: "nama tidak boleh kosong" })} 
                />
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
                {/* confirmation password */}
                <FormInput 
                  name="passwordConfirmation" 
                  type="text" 
                  error={!!errors.passwordConfirmation}
                  helperText={errors?.passwordConfirmation?.message}
                  label="Password Confirmation"
                  {...register("passwordConfirmation", { required: "password confirmasi tidak boleh kosong" })} 
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
                <Button type="submit" fullWidth={true} variant="contained"  sx={{ marginTop: 2 }}>Register</Button>
            </Box>
        </form>
    </>
  )
}

export default Register