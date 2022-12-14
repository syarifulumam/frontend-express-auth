import React, { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Navbar from '../components/Navbar';
import { Container } from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import {getUsers,usersSelectors} from '../features/userSlice'
import Button from '@mui/material/Button';
import ButtonDelete from '../components/ButtonDelete';
import { Link } from 'react-router-dom';


export default function User() {
  const dispatch = useDispatch()
  const {token} = useSelector((state) => state.auth)
  const users = useSelector(usersSelectors.selectAll)

  useEffect(() => {
    dispatch(getUsers(token))
  }, [dispatch])
  

  return (
    <>
    <Navbar/>
    <Container maxWidth="md">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>
                  <Link to={`${row.id}/edit`}><Button variant="contained">Edit</Button></Link>
                  <ButtonDelete id={row.id}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    </>
  );
}