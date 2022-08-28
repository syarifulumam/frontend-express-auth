import { Box, Button, TextField, Typography } from '@mui/material'
import { Link } from "react-router-dom";
import React from 'react'

function Login() {
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
                marginTop="10%"
                border="1px solid black"
                padding="20px"
                borderRadius={2}
            >
                <Typography variant='h4'>Login</Typography>
                <TextField fullWidth={true} margin='normal' type={'email'} label="Email" variant="outlined" />
                <TextField fullWidth={true} margin='normal' type={'password'} label="password" variant="outlined" />
                <Typography width={"100%"} variant="caption">
                  Belum punya akun? 
                  <Link to="/register" style={{ textDecoration:"none" }}>daftar disini</Link>
                </Typography>
                <Button fullWidth={true} variant="contained" sx={{ marginTop: 2 }}>Login</Button>
            </Box>
        </form>
    </>
  )
}

export default Login