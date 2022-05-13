import { useEffect, useState } from 'react';
import * as React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { deleteMovie, getAllMovies, addMovie, getMovieTitles, addActorMovie, clearMovieEdit } from '../../redux/movieSlice';

import { clearMovie } from '../../redux/movieSlice';
import SearchBar from '../common/SearchBar';

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
import Icon from '@mui/material/Icon';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import { useNavigate } from 'react-router-dom';
import { getAllProducer, clearProducer } from '../../redux/producerSlice';
import { getAllActor, clearActors } from '../../redux/actorSlice';

import { styled } from '@mui/system';
import TablePaginationUnstyled from '@mui/base/TablePaginationUnstyled';

const MovieList = () => {
    
    const { movies, titles } = useSelector(state => state.movie);
    const { producer } = useSelector(state => state.producer);
    const { actor } = useSelector(state => state.actor);

    const { keywords } = useSelector(state => state.filter);
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [ id, setID] = useState(0);
    const [ title, setTitle] = useState("");
    const [ type, setType] = useState("");
    const [ genre, setGenre] = useState("");
    const [ plot, setPlot] = useState("");
    const [ gross, setGross] = useState("");
    const [ producerr, setProducer] = useState("");
    const [ actorr, setActor] = useState([]);
    const [ images, setImages] = useState([]);

    console.log(movies);
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(getAllMovies())
    
      dispatch(getAllProducer())
      dispatch(getAllActor())
            fetchMoreData()
          return() => {
          
           dispatch(clearMovie())
           dispatch(clearProducer())
           dispatch(clearActors())
          }
        }, [dispatch])

    // console.log(producer);

    const fetchMoreData = () => {
        dispatch (getAllMovies({...keywords, page}));
        dispatch (getAllProducer({...keywords, page}));
        dispatch (getAllActor({...keywords, page}));

      };

    const AddActorMovieHandler = (e) => {
      e.preventDefault();

      console.log(id);
      let formData = new FormData();
        formData.set('id', id);
        formData.set('actors', actorr);

        dispatch(addActorMovie(formData));
        setActor("");
        handleCloseAddAct();
    }

    
    const AddMovieHandler = (e) => {
        e.preventDefault();

        // console.log(name);
        // console.log(bio);
        // console.log(images);
      
        let formData = new FormData();
        formData.set('title', title);
        formData.set('type', type);
        formData.set('genre', genre);
        formData.set('plot', plot);
        formData.set('gross', gross);
        formData.set('producers', producerr);

      
        formData.set('actors', actorr);
        // producerr.forEach(producerrs=>{
        //   formData.append('producers', producerrs)
        // })
        
        images.forEach(image=>{
            formData.append('images', image)
        })

        console.log(formData);
        // console.log(producerr);
        dispatch(addMovie(formData));
        setTitle("");
        setType("");
        setGenre("");
        setPlot("");
        setGross("");
        setActor([]);
        setProducer([]);
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

      const [openAddAct, setOpenAddAct] = useState(false);
      const handleOpenAddAct = (movieid) => {setOpenAddAct(true); 
              console.log(movieid);
              setID(movieid)
      };
      const handleCloseAddAct = () => setOpenAddAct(false);


      const Input = styled('input')({
        display: 'none',
      });
      

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
              page > 0 ? Math.max(0, (1 + page) * rowsPerPage - movies.length) : 0;
          
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
{/* 
        <div style={{ width: 280}}>
          <Box sx={{ml: 20, width: 280}}>

            <SearchBar items={titles} label="Search Movie"/>
            <br></br>
            
          </Box>
        </div> */}

            <Stack spacing={2} direction="row" marginLeft='78%'>
              <Button variant="contained" onClick={handleOpen}>Add Movie</Button>
            </Stack>
            
            <br></br>

                <Root sx={{ maxWidth: '100%', width: 950 }}>
                    <table aria-label="custom pagination table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Genre</th>
                            <th>Ratings</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {(rowsPerPage > 0
                            ? movies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : movies
                        ).map((movie) => (
                            <tr key={movie.title}>
                            <td>{movie._id}</td>
                            <td style={{ width: 500 }} align="center">{movie.title}</td>
                            <td style={{ width: 300 }} align="center">
                                {movie.type}
                            </td>
                            <td style={{ width: 300 }} align="center">
                                {movie.genre}
                            </td>
                            <td style={{ width: 300 }} align="center">
                                {movie.ratings}
                            </td>
                            <td style={{ width: 500 }} align="center">


                                <Button variant='contained' color='secondary'sx={{ m: 1 }}  onClick={() => handleOpenAddAct(movie._id)}><AddIcon></AddIcon></Button>
                                 <Button variant='contained' color='primary' sx={{ mr: 1 }} onClick = {() => { dispatch(clearMovieEdit());navigate(`/movies/edit/admin/${movie._id}`)}}><EditIcon></EditIcon></Button>
                                {
                                 user && <Button variant='contained' color='error' onClick={ () => { dispatch(deleteMovie(movie._id))} }><DeleteIcon></DeleteIcon></Button>
                                }

                            </td>
                            </tr>
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
                            colSpan={6}
                            count={movies.length}
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
      <Box sx={style}  component="form" onSubmit={AddMovieHandler}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
        Add Movie
        </Typography>

        <FormGroup sx={{ m: 1 }}>
        <TextField id="outlined-basic" label="Title" variant="outlined" value={ title } onChange={(e)=>setTitle(e.target.value)}/>
        </FormGroup>

        {/* <FormGroup sx={{ m: 1 }}>
        <TextField id="outlined-basic" label="Director" variant="outlined"/>
        </FormGroup> */}
        
        <FormGroup sx={{ m: 1 }}>
        <TextField id="outlined-basic" label="Plot" variant="outlined" value={ plot } onChange={(e)=>setPlot(e.target.value)}/>
        </FormGroup>

        <FormGroup sx={{ m: 1 }}>
        <TextField id="outlined-basic" label="Gross" variant="outlined" value={ gross } onChange={(e)=>setGross(e.target.value)}/>
        </FormGroup>

        <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Type"
                value={ type } 
                onChange={(e)=>setType(e.target.value)}
                >
                <MenuItem value={"Movie"}>Movie</MenuItem>
                <MenuItem value={"TV Show"}>TV Show</MenuItem>
            
                </Select>
        </FormControl>

      

        <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel id="demo-simple-select-label">Genre</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Genre"
                value={ genre } 
                onChange={(e)=>setGenre(e.target.value)}
                >
                <MenuItem value={"Horror"}>Horror</MenuItem>
                <MenuItem value={"Sci-fi"}>Sci-fi</MenuItem>
                <MenuItem value={"Drama"}>Drama</MenuItem>
                <MenuItem value={"Comedy"}>Comedy</MenuItem>
                <MenuItem value={"War"}>War</MenuItem>
                <MenuItem value={"Sports"}>Sports</MenuItem>
                <MenuItem value={"Crime"}>Crime</MenuItem>
                <MenuItem value={"Action"}>Action</MenuItem>
                <MenuItem value={"Romance"}>Romance</MenuItem>
                <MenuItem value={"Musicals"}>Musicals</MenuItem>
            
                </Select>
        </FormControl>


         <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel id="demo-simple-select-label">Actor</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Actor"
                value={actorr}
                onChange={(e)=>setActor(e.target.value)}
                >
                 {actor ? actor.map (actors => {
                        // console.log(producers);
                        return (<MenuItem value={actors.name}>{actors.name}</MenuItem>) 
                    }):console.log("yiy")}
            
                </Select>
        </FormControl>

        <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel id="demo-simple-select-label">Producer</InputLabel>

                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Producer"
                value={producerr}
                onChange={(e)=>setProducer(e.target.value)}
                >
              {producer ? producer.map (producers => {
                        console.log(producers);
                        return (<MenuItem value={producers.name}>{producers.name}</MenuItem>) 
                    }):console.log("yey")}
                </Select>

        </FormControl>


     <FormGroup sx={{ ml: 38 }}>
            <label htmlFor="contained-button-file">
            <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={UploadImage} />
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
      open={openAddAct}
      onClose={handleCloseAddAct}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
>
      <Box sx={style}  component="form" onSubmit={AddActorMovieHandler}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
        Add Actor - Movie
        </Typography>

        {/* <FormGroup sx={{ m: 1 }}>
        <TextField disabled id="outlined-basic" label="Title" variant="outlined" value={ titlee } onChange={(e)=>setTitle(e.target.value)}/>
        </FormGroup>

        <FormGroup sx={{ m: 1 }}>
        <TextField disabled id="outlined-basic" label="Plot" variant="outlined" value={ plott } onChange={(e)=>setTitle(e.target.value)}/>
        </FormGroup> */}

      <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel id="demo-simple-select-label">Actor</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Actor"
                value={actorr}
                onChange={(e)=>setActor(e.target.value)}
                >
                 {actor ? actor.map (actors => {
                        // console.log(producers);
                        return (<MenuItem value={actors.name}>{actors.name}</MenuItem>) 
                    }):console.log("yiy")}
            
                </Select>
        </FormControl>

        <Stack spacing={2} direction="row" marginLeft='82%' marginTop='1%'>
          <Button variant="contained" type="submit">Save</Button>
        </Stack>

      </Box>
    </Modal>
    
                           
    </div>
        </>
     );
}

export default MovieList;