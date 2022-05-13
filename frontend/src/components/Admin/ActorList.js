import { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getAllActor, deleteActor, addActor, getActorDetail } from '../../redux/actorSlice';

import { clearActors, clearActorDetails } from '../../redux/actorSlice';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
// import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import { tableCellClasses } from '@mui/material/TableCell';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/system';
import TablePaginationUnstyled from '@mui/base/TablePaginationUnstyled';

const ActorList = () => {
    
    const { smembers, name, bio, role } = useSelector(state => state.actor);
    const { keywords } = useSelector(state => state.filter);
    const [ id, setID] = useState(0);
    const [ namee, setName] = useState("");
    const [ bioo, setBio] = useState("");
    const [ rolee, setRole] = useState("");
    const [ images, setImages] = useState([]);

    const { user } = useSelector(state => state.user)

    const dispatch = useDispatch();
    const navigate = useNavigate();

   

    useEffect(() => {
      dispatch(getAllActor())
            fetchMoreData()
          return() => {
           dispatch(clearActors())
          }
        }, [dispatch])

    // console.log(smembers);

    const fetchMoreData = () => {
        dispatch (getAllActor({...keywords, page}));

      };

    
    const AddActorHandler = (e) => {
        e.preventDefault();

        // console.log(name);
        // console.log(bio);
        // console.log(images);
      
        let formData = new FormData();
        formData.set('name', namee);
        formData.set('bio', bioo);
        formData.set('role', rolee);
        
        images.forEach(image=>{
            formData.append('images', image)
        })

        console.log(formData);
        dispatch(addActor(formData));
        setName("");
        setBio("");
        setRole("");
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

      
      const [openEdit, setOpenEdit] = useState(false);
      const handleOpenEdit = (actorid) => {setOpenEdit(true);
          console.log(actorid);
          setID(actorid);
          dispatch(getActorDetail({actorid,user}));

          setName(name);
          setBio(bio);
          setRole(role);

          dispatch(clearActorDetails());

      }
      const handleCloseEdit = () => setOpenEdit(false);

      const Input = styled('input')({
        display: 'none',
      });


      const filterActor = (role, name, id, bio, ratings) => {
        if (role === "Actress" || role === "Actor") {
          return(
         
          <tr key={name}>
          <td>{id}</td>
          <td style={{ width: 500 }} align="center">{name}</td>
          <td style={{ width: 300 }} align="center">
              {bio}
          </td>
          <td style={{ width: 300 }} align="center">
              {ratings}
          </td>
          <td style={{ width: 500 }} align="center">
              
            <Button variant='contained' color='primary' sx={{ mr: 1 }} onClick = {() => navigate(`/actors/edit/admin/${id}`)} ><EditIcon></EditIcon></Button>
            <Button variant='contained' color='error' onClick={ () => { dispatch(deleteActor(id))} }><DeleteIcon></DeleteIcon></Button>

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

            <Stack spacing={2} direction="row" marginLeft='77%'>
              <Button variant="contained" onClick={handleOpen}>Add Actor</Button>
            </Stack>
            
            <br></br>

      <Root sx={{ maxWidth: '100%', width: 950 }}>
                    <table aria-label="custom pagination table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Bio</th>
                            <th>Ratings</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {(rowsPerPage > 0
                            ? smembers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : smembers
                        ).map((smember) => (

                         filterActor (smember.role, smember.name, smember._id, smember.bio, smember.ratings)

                          
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
                            colSpan={5}
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
      <Box sx={style}  component="form" onSubmit={AddActorHandler}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
        Add Actor
        </Typography>

        <FormGroup sx={{ m: 1 }}>
        <TextField id="outlined-basic" label="Name" variant="outlined" value={ namee } onChange={(e)=>setName(e.target.value)}/>
        </FormGroup>

        <FormGroup sx={{ m: 1 }}>
        <TextField id="outlined-basic" label="Bio" variant="outlined" value={ bioo } onChange={(e)=>setBio(e.target.value)}/>
        </FormGroup>

        <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={rolee}
            label="Role"
            onChange={(e)=>setRole(e.target.value)}
            >
            <MenuItem value={"Actor"}>Actor</MenuItem>
            <MenuItem value={"Actress"}>Actress</MenuItem>
           
            </Select>
      </FormControl>

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

    <Modal
      open={openEdit}
      onClose={handleCloseEdit}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      // onLoad={ActorEditHandler(smembers.id)}
>
                            
      <Box sx={style}  component="form">
        <Typography id="modal-modal-title" variant="h6" component="h2">
        Edit Actor Details
        </Typography>

        <FormGroup sx={{ m: 1 }}>
        <TextField id="outlined-basic" label="Name" variant="outlined" value={ name } onChange={(e)=>setName(e.target.value)}/>
        </FormGroup>

        <FormGroup sx={{ m: 1 }}>
        <TextField id="outlined-basic" label="Bio" variant="outlined" value={ bio } onChange={(e)=>setBio(e.target.value)}/>
        </FormGroup>

        <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={role}
            label="Role"
            onChange={(e)=>setRole(e.target.value)}
            >
            <MenuItem value={"Actor"}>Actor</MenuItem>
            <MenuItem value={"Actress"}>Actress</MenuItem>
           
            </Select>
      </FormControl>

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

export default ActorList;