import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';


import TablePagination from '@mui/material/TablePagination';



export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    };

    
function createData(name, email, number) {
  return { name, email,number};
}
   
    const rows = [
  createData('Sachin', 'Sachin@gmail.com', 1324171354),
];
    
    const [data, setData] = useState([
        { id: 1, name: 'Sachin', mobile: '123-456-7890', email: 'sachin@gmail.com' },
        { id: 2, name: 'Pranav', mobile: '1234567890', email: 'pranav@gmail.com' },
      ]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    };
    
    const handleDelete = (id) => {
        const newData = data.filter((item) => item.id !== id);
          setData(newData);
          toast.success('Data Deleted Successfully', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
    };

    return (
        <Box>
            <Typography variant="h3" component="h3" sx={{ textAlign: 'center', mt: 3, mb: 3 }}>Customers List</Typography>       
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
        <TableHead>
             <TableRow>
               <TableCell>ID</TableCell>
               <TableCell>Name</TableCell>
               <TableCell>Mobile Number</TableCell>
               <TableCell>Email</TableCell>
               <TableCell>Action</TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
             {data.map((row) => (
               <TableRow key={row.id}>
                 <TableCell>{row.id}</TableCell>
                 <TableCell>{row.name}</TableCell>
                 <TableCell>{row.mobile}</TableCell>
                 <TableCell>{row.email}</TableCell>
                 <TableCell>
                   <Button onClick={() => handleDelete(row.id)}>
                     <DeleteIcon />
                   </Button>
                 </TableCell>
               </TableRow>
             ))}
           </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
            </Paper>
            <ToastContainer/>
            </Box>
  );
}
