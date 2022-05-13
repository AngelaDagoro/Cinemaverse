import { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getAllProducer, deleteProducer, addProducer, clearProducer } from '../../redux/producerSlice';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
// import { styled } from '@mui/material/styles';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { styled } from '@mui/system';
import TablePaginationUnstyled from '@mui/base/TablePaginationUnstyled';

import { useNavigate } from 'react-router-dom';

const ProducerList = () => {
    
    const { smembers } = useSelector(state => state.producer);
    const { keywords } = useSelector(state => state.filter);
    const [ name, setName] = useState("");
    const [ bio, setBio] = useState("");
    const [ images, setImages] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(getAllProducer())
            fetchMoreData()
          return() => {
           dispatch(clearProducer())
          }
        }, [dispatch])

    console.log(smembers);

    const fetchMoreData = () => {
        dispatch (getAllProducer({...keywords, page}));

      };

    
    const AddProducerHandler = (e) => {
        e.preventDefault();

        console.log(name);
        console.log(bio);
        console.log(images);
      
        let formData = new FormData();
        formData.set('name', name);
        formData.set('bio', bio);
        formData.set('role', "Producer");
        
        images.forEach(image=>{
            formData.append('images', image)
        })

        console.log(formData);
        dispatch(addProducer(formData));

        handleClose();
    }

    const UploadImage = (e) => {
      const files =  Array.from(e.target.files);
      console.log(files);

        files.forEach(file=>{
            const reader = new FileReader();
            reader.onload = ()=>{
                if(reader.readyState === 2){
                    setImages(oldArray=>[...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
    
      const [open, setOpen] = useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);





      const Input = styled('input')({
        display: 'none',
      });


      const filterProducer = (role, name, id, bio) => {
          if (role === "Producer") {
            return(
        
            <tr key={name}>
            <td>{id}</td>
            <td style={{ width: 500 }} align="center">{name}</td>
            <td style={{ width: 300 }} align="center">
                {bio}
            </td>
            <td style={{ width: 500 }} align="center">
                
              <Button variant='contained' color='primary' sx={{ mr: 1 }} onClick = {() => navigate(`/producers/edit/admin/${id}`)}><EditIcon></EditIcon></Button>
              <Button variant='contained' color='error' onClick={ () => { dispatch(deleteProducer(id))} }><DeleteIcon></DeleteIcon></Button>
  
            </td>
            </tr>

            )
           
          }
      }


      const Root = styled('div')`
      table {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
          margin-left: 160px;
          
      }
  
      td,
      th {
          border: 1px solid #ddd;
          text-align: left;
          padding: 8px;
          margin: 80px;
          text-align: center;
       
         
      }
  
      th {
          background-color: #301934;
          color: white;
      }
      `;
  
  
  const CustomTablePagination = styled(TablePaginationUnstyled)`
      & .MuiTablePaginationUnstyled-toolbar {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    
        @media (min-width: 768px) {
          flex-direction: row;
          align-items: center;
        }
      }
    
      & .MuiTablePaginationUnstyled-selectLabel {
        margin: 0;
      }
    
      & .MuiTablePaginationUnstyled-displayedRows {
        margin: 0;
    
        @media (min-width: 768px) {
          margin-left: auto;
        }
      }
    
      & .MuiTablePaginationUnstyled-spacer {
        display: none;
      }
    
      & .MuiTablePaginationUnstyled-actions {
        display: flex;
        gap: 0.25rem;
      }
    `;
  
    
      const [page, setPage] = useState(0);
      const [rowsPerPage, setRowsPerPage] = useState(5);
    
      // Avoid a layout jump when reaching the last page with empty rows.
      const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - smembers.length) : 0;
    
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
  
  


    return ( 
        <>
        

    <div>
    
    <div className="row">
        <div className="col-12 col-md-2">
                    
                </div>

        <div className="col-12 col-md-10">
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <Stack spacing={2} direction="row" marginLeft='75%'>
              <Button variant="contained" onClick={handleOpen}>Add Producer</Button>
            </Stack>
            
            <br></br>

{/* <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="producer table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">ID</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Bio</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {smembers.map((smember) => (
            filterProducer(smember.role, smember.name, smember._id, smember.bio)
  
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}


        <Root sx={{ maxWidth: '100%', width: 950 }}>
                    <table aria-label="custom pagination table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Bio</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {(rowsPerPage > 0
                            ? smembers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : smembers
                        ).map((smember) => (

                         filterProducer(smember.role, smember.name, smember._id, smember.bio, smember.ratings)

                          
                        ))},

                        {emptyRows > 0 && (
                            <tr style={{ height: 41 * emptyRows }}>
                            <td colSpan={3} />
                            </tr>
                        )}
                        </tbody>
                        <tfoot>
                        <tr>
                            <CustomTablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={4}
                            count={smembers.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            componentsProps={{
                                select: {
                                'aria-label': 'rows per page',
                                },
                                actions: {
                                showFirstButton: true,
                                showLastButton: true,
                                },
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </tr>
                        </tfoot>
                    </table>
                    </Root>


        </div>
    </div>
    
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
>
      <Box sx={style}  component="form" onSubmit={AddProducerHandler}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
        Add Producer
        </Typography>

        <FormGroup sx={{ m: 1 }}>
        <TextField id="outlined-basic" label="Name" variant="outlined" value={ name } onChange={(e)=>setName(e.target.value)}/>
        </FormGroup>

        <FormGroup sx={{ m: 1 }}>
        <TextField id="outlined-basic" label="Bio" variant="outlined" value={ bio } onChange={(e)=>setBio(e.target.value)}/>
        </FormGroup>

       <FormGroup sx={{ ml: 38 }}>
            <label htmlFor="contained-button-file">
            <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={UploadImage}/>
            <Button variant="contained" component="span" >
              Upload
            </Button>
          </label>
        </FormGroup>

        <Stack spacing={2} direction="row" marginLeft='82%' marginTop='1%'>
          <Button variant="contained" type="submit">Save</Button>
        </Stack>

      </Box>
    </Modal>

   
    
                           
    </div>
        </>
     );
}

export default ProducerList;