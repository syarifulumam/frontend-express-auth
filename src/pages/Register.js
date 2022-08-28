import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Register() {
  return (
    <>
        <form action="">
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
                <TextField fullWidth={true} margin='normal' type={'text'} label="Name" variant="outlined" />
                <TextField fullWidth={true} margin='normal' type={'email'} label="Email" variant="outlined" />
                <TextField fullWidth={true} margin='normal' type={'password'} label="password" variant="outlined" />
                <FormControl fullWidth={true} margin='normal'>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label="Role"
                    defaultValue=""
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                  </Select>
                </FormControl>
                <Typography width={"100%"} variant="caption">
                  Sudah ada akun? 
                  <Link to="/login" style={{ textDecoration:"none" }}>login disini</Link>
                </Typography>
                <Button fullWidth={true} variant="contained" sx={{ marginTop: 2 }}>Register</Button>
            </Box>
        </form>
    </>
  )
}

export default Register