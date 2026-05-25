import React, { useContext, useEffect } from 'react'
import CategoryContext from '../../context/category/CategoryContext';
import { Box, Button, CircularProgress, Container, IconButton, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Delete, Edit } from 'lucide-react';

const Category = () => {

  const categoryContext = useContext(CategoryContext);
  if(!categoryContext){
    throw new Error("Catrgory Context don't pprovided")
  }
  useEffect(()=>{
    categoryContext.fetchAdminCategorylist()
  },[])
  console.log("Category Context",categoryContext)
  return (
    <>
    <Container maxWidth="xl">
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <Typography>Category</Typography>
        <Button variant="contained">Add</Button>
      </Box>
        <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>

              <TableCell>
                <strong>Description</strong>
              </TableCell>

              <TableCell align="center">
                <strong>Active</strong>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
        {categoryContext.categoryData.isLoading ? <CircularProgress/> : (  <TableBody>
            {categoryContext?.categoryData?.adminCategory?.data?.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>

                <TableCell>{row.description}</TableCell>

                <TableCell align="center">
                  <Switch checked={row.isActive} />
                </TableCell>
                 <TableCell align="right">
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <IconButton sx={{ bgcolor: "green", color: "white" }}>
                          <Edit />
                        </IconButton>
                        <IconButton sx={{ bgcolor: "red", color: "white" }}>
                          <Delete />
                        </IconButton>
                      </Box>
                    </TableCell>
              </TableRow>
            ))}
          </TableBody>)}
        </Table>
      </TableContainer>
    </Container>
    </>
  )
}

export default Category