import { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { deleteMovie, getAllMovies, getMovieTitles, setHasMore } from '../../redux/movieSlice';

import InfiniteScroll from "react-infinite-scroll-component";

import { CardMedia, Grid, Paper, Box, Button } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import SearchBar from '../common/SearchBar';
import { clearMovie } from '../../redux/movieSlice';
import RatingFilter from '../common/RatingFilter';
import YearFilter from '../common/YearFilter';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import { styled } from '@mui/material/styles';

import EditIcon from '@mui/icons-material/Edit';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8
  };

const Movie = () => {
    
    const { movies, titles, moviesCount, filteredMoviesCount, hasMore, page } = useSelector(state => state.movie);
    const { keywords } = useSelector(state => state.filter);
    const { user, type } = useSelector(state => state.user);
    const dispatch = useDispatch();


    useEffect(() => {
      dispatch(getMovieTitles())
      fetchMoreData()
      return() => {
        console.log('movies Cleaned');
        dispatch(clearMovie())
       }
        }, [])

    console.log(movies);

    const fetchMoreData = () => {
        dispatch (getAllMovies({page, ...keywords}));
      };


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
    

    return ( 
        <>{type === "admin" ? < Navigate to = "/movies/admin" />:
        
        <div>
              {/* <h1>demo: react-infinite-scroll-component</h1> */}
              <br></br>
              <br></br>
              <br></br>
              <hr />
              {/* <Box sx={{m:2}}>
                <SearchBar items={titles} label="Search Movie"/>
              </Box> */}

              <div style={{ float: 'left'}}>
              <Box sx={{m:2}}>

                  {/* <Stack spacing={2} direction="row" marginLeft='25%' marginBottom='10%' padding='3%'>
                    <Button variant="contained" onClick={handleOpen}>Add Movie</Button>
                  </Stack> */}

                <SearchBar items={titles} label="Search Movie"/>
                <br></br>
                <YearFilter/>
                <br></br>
                <br></br>
                <RatingFilter/>
                            {/* <Paper sx={{padding:'5%',borderRadius:'10px', display:'flex', justifyContent:'center', alignItems:'center'}} elevation={6}>
                                  <getPopularMovies/>
                              </Paper> */}

                
              </Box></div>

              
              <InfiniteScroll
                dataLength={movies.length}
                next={fetchMoreData}
                hasMore={movies.length >= filteredMoviesCount ? false : true}
                loader={movies.length >= filteredMoviesCount ? <h4>Wala na...</h4> : <h4>Loading</h4>}
                endMessage={
                  <h4>Final Result</h4>
                }
              >
              <Grid container spacing={2} sx={{p:2}}>
                  { movies ? movies.map((movie, index) => (
                      <Grid item lg={3} md={2} key={index} sm={2} xs={12}>
                          {/* <Paper elevation={4} sx={{p:2}}> */}
                            <Link to={`/movies/${movie._id}`}>
                              {/* <CardMedia
                                  component="img"
                                  height="200"
                                  image={movie.posters[0].url}
                                  alt={movie.posters[0].public_url}
                                  sx={{pb:2}}
                                  /> */}

                          <Card sx={{ maxWidth: 345}}>
                                <CardMedia
                                  component="img"
                                  height="340"
                                  image={movie.posters[0].url}
                                  alt={movie.posters[0].public_url}
                                />
                                <CardContent>
                                  <Typography gutterBottom variant="h6" component="div">
                                  {movie.title}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                  {movie.type} | {movie.genre}
                                  </Typography>
                                </CardContent>
                                {/* <CardActions>
                                  <Button size="small">Share</Button>
                                  <Button size="small">Learn More</Button>
                                </CardActions> */}
                              </Card>



                                {/* {movie.title} */}
                            </Link>
                            <br></br>
                            <br></br>
                            <Box>

                            {/* <Button variant='contained' color='primary' sx={{ mb: 1 }} ><EditIcon></EditIcon></Button>

                            {
                              user && <Button variant='contained' color='error' onClick={ () => { dispatch(deleteMovie(movie._id))} }><DeleteIcon></DeleteIcon></Button>
                              
                            } */}
                              
                            

                            </Box>
                          {/* </Paper> */}
                      </Grid>
                  )):console.log("weh")}
              </Grid>
              </InfiniteScroll>


              <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
      >
            <Box sx={style}  component="form">
              <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Movie
              </Typography>

              <FormGroup sx={{ m: 1 }}>
              <TextField id="outlined-basic" label="Title" variant="standard"/>
              </FormGroup>

              <FormGroup sx={{ m: 1 }}>
              <TextField id="outlined-basic" label="Director" variant="standard"/>
              </FormGroup>

              <FormGroup sx={{ m: 1 }}>
              <TextField id="outlined-basic" label="Plot" variant="standard"/>
              </FormGroup>

              <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Type"
                  >
                  <MenuItem value="">Movie</MenuItem>
                  <MenuItem value="">TV Show</MenuItem>
                
                  </Select>
              </FormControl>

              <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel id="demo-simple-select-label">Genre</InputLabel>
                  <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Genre"
                  >
                  <MenuItem value="">Horror</MenuItem>
                  <MenuItem value="">Scifi</MenuItem>
                  <MenuItem value="">Drama</MenuItem>
                  <MenuItem value="">Comedy</MenuItem>
                  <MenuItem value="">War</MenuItem>
                  <MenuItem value="">Sports</MenuItem>
                  <MenuItem value="">Crime</MenuItem>
                  <MenuItem value="">Action</MenuItem>
                  <MenuItem value="">Musicals</MenuItem>
                  <MenuItem value="">Romance</MenuItem>

                  </Select>
              </FormControl>

            

              <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel id="demo-simple-select-label">Actors</InputLabel>
                  <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Actors"
                  >
                  <MenuItem value="">Actor 1</MenuItem>
                  <MenuItem value="">Actor 2</MenuItem>
                
                  </Select>
              </FormControl>

              <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel id="demo-simple-select-label">Producer</InputLabel>
                  <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Producer"
                  >
                  <MenuItem value="">Producer</MenuItem>
                  <MenuItem value="">Producer</MenuItem>
                
                  </Select>
              </FormControl>




            <FormGroup sx={{ ml: 38 }}>
                  <label htmlFor="contained-button-file">
                  <Input accept="image/*" id="contained-button-file" multiple type="file"/>
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

        }


        </>
     );
}
 
export default Movie;

