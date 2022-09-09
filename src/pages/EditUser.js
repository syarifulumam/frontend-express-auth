import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import { useForm } from "react-hook-form";
import FormInput from '../components/FormInput';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useDispatch,useSelector } from 'react-redux';
import { usersSelectors, updateUser } from '../features/userSlice';
import Navbar from '../components/Navbar';

function EditUser() {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [role,setRole] = useState('')
  const [password,setPassword] = useState('')
  const [confirmation_password,setConfirmationPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {id} = useParams()
  const {token} = useSelector((state) => state.auth)
  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();

  
  const user = useSelector(state => usersSelectors.selectById(state, id))
  
  useEffect(() => {
    if(user){
      setValue("name",user.name)
      setValue("email",user.email)
      setValue("role",user.role)
      setName(user.name)
      setEmail(user.email)
      setRole(user.role)
    }
  }, [user])

  const onSubmit = async (data) => {
    dispatch(updateUser({token,data,id}))
    navigate('/user')
  }
  return (
    <>
        <Navbar/>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box 
                display="flex" 
                flexDirection="column"
                maxWidth="25%"
                alignItems="center"
                justifyContent="center"
                margin="auto"
                border="1px solid black"
                padding="20px"
                borderRadius={2}
            >
                <Typography variant='h4'>Edit User</Typography>
                {/* {isError && (
                  <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error">{message}</Alert>
                  </Stack>
                )} */}
                {/* Name */}
                <FormInput 
                  name="name" 
                  type="text" 
                  error={!!errors.name}
                  helperText={errors?.name?.message}
                  label="Name"
                  value={name}
                  {...register("name", { 
                    required: "nama tidak boleh kosong",
                    minLength: {value: 3, message: "Name minimal 3 huruf"},
                    onChange: (e) => {setName(e.target.value)}
                  })} 
                />
                {/* email */}
                <FormInput 
                  name="email" 
                  type="text" 
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  label="Email"
                  value={email}
                  {...register("email", { 
                    required: "email tidak boleh kosong",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email tidak valid"
                    },
                    onChange: (e) => {setEmail(e.target.value)}
                  })} 
                />
                {/* password */}
                <FormInput 
                  name="password" 
                  type="password" 
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  label="Password"
                  value={password}
                  {...register("password", { 
                    onChange: (e) => {setPassword(e.target.value)}
                  })} 
                />
                {/* confirmation password */}
                <FormInput 
                  name="confirmation_password" 
                  type="password" 
                  error={!!errors.confirmation_password}
                  helperText={errors?.confirmation_password?.message}
                  label="Password Confirmation"
                  value={confirmation_password}
                  onChange= {(e) => {setConfirmationPassword(e.target.value)}}
                  {...register("confirmation_password", { 
                    onChange: (e) => {setConfirmationPassword(e.target.value)},
                    validate: (value) =>{
                      const {password} = getValues()
                      return password === value || "Password tidak sama"
                    }
                  })} 
                />
                {/* role */}
                <FormInput 
                  name="role" 
                  type="select" 
                  error={!!errors.role}
                  helperText={errors?.role?.message}
                  label="Role"
                  value={role}
                  select={true}
                  {...register("role", { 
                    required: "role tidak boleh kosong",
                    onChange: (e) => {setRole(e.target.value)}
                  })} 
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                </FormInput>
                <Button type="submit" fullWidth={true} variant="contained"  sx={{ marginTop: 2 }}>Update</Button>
            </Box>
        </form>
    </>
  )
}

export default EditUser