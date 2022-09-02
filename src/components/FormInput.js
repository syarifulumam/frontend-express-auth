import { TextField } from '@mui/material'
import React, { forwardRef } from 'react'

const FormInput = forwardRef((props,ref) => {

  return (
    <>
        <TextField 
            fullWidth={true} 
            margin='normal' 
            variant="outlined" 
            autoComplete="off"
            ref={ref}
            {...props}
        >
          {props.children}
        </TextField>
    </>
  )
})

export default FormInput