import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useDispatch,useSelector } from 'react-redux';
import {deleteUser} from '../features/userSlice'
import {RefreshToken} from '../features/authSlice'

export default function ButtonDelete({id}) {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const {token,user} = useSelector((state) => state.auth)
    
    // useEffect(() => {
    //     console.log(token)
    // }, [token])

    const handleClickDialog = () => {
        setOpen(!open);
    };

    const handleDelete = () => {
        dispatch(deleteUser({id: id, token:token}))
    }

    return (
        <>      
            <Button variant="contained" color={"error"} onClick={handleClickDialog}>
                Hapus
            </Button>
            <Dialog
            open={open}
            onClose={handleClickDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
                Yakin hapus data ini?
            </DialogTitle>
            <DialogActions>
                <Button onClick={handleClickDialog}>Batal</Button>
                <Button onClick={handleDelete} variant="outlined" color='error'>Hapus</Button>
            </DialogActions>
            </Dialog>
        </>
    )
}
