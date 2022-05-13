import { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { editMovie, getMovieDetails, clearMovieEdit } from '../../redux/movieSlice';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
// import { styled } from '@mui/material/styles';

import { useParams, useNavigate } from 'react-router-dom';

import { styled } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { getAllProducer, clearProducer } from '../../redux/producerSlice';
import { getAllActor, clearActors } from '../../redux/actorSlice';


const MovieListEdit = () => {
    
    const { movie } = useSelector(state => state.movie);
    // const { keywords } = useSelector(state => state.filter);
    // const [ id, setID] = useState(0);
    const [ titlee, setTitle] = useState("");
    const [ typee, setType] = useState("");
    const [ genree, setGenre] = useState("");
    const [ plott, setPlot] = useState("");
    const [ grosss, setGross] = useState(0);
    // const [ actorr, setActor] = useState("");
    const [ producerr, setProducer] = useState("");
    const [ images, setImages] = useState([]);
    const params = useParams();

    const { user } = useSelector(state => state.user)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const { producer } = useSelector(state => state.producer);
    const { actor } = useSelector(state => state.actor);
    const { keywords } = useSelector(state => state.filter);
   

    useEffect(() => {
      
    //    if (!movie.title && !movie.type && !movie.genre && !movie.plot){
    if (!movie){
        dispatch(getMovieDetails({id:params.id, user}))
        dispatch(getAllProducer())
        dispatch(getAllActor())
        fetchMoreData()
        console.log(movie);
       }else {
           console.log(movie);
            setTitle(movie.title);
            // console.log(movie.title);
            setType(movie.type);
            setGenre(movie.genre);
            setPlot(movie.plot);
            setGross(movie.gross);
            // setActor(movie.actors);
            console.log(movie.producers);
            setProducer(movie.producers);

       }
        }, [dispatch, movie, params, user])

        const fetchMoreData = () => {
            // dispatch (getAllMovies({...keywords, page}));
            dispatch (getAllProducer({...keywords, page}));
            dispatch (getAllActor({...keywords, page}));
    
          };


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

    const EditMovieHandler = (e) => {
        e.preventDefault();

        // console.log(namee);
        // console.log(bio);
        // console.log(images);
      
        let formData = new FormData();
        formData.set('id', params.id);
        formData.set('title', titlee);
        formData.set('type', typee);
        formData.set('genre', genree);
        formData.set('plot', plott);
        formData.set('gross', grosss);
        formData.set('producers', producerr);
        // formData.set('actors', actorr);
        
        images.forEach(image=>{
            formData.append('posters', image)
        })

        console.log(formData);
        dispatch(editMovie(formData));
        dispatch(clearMovieEdit())
        // setTitle("");
        // setType("");
        // setGenre("");
        // setPlot("");
        // setGross("");
        // setProducer("");
        // setActor([]);
        navigate(`/movies/admin`);
    }



    const Input = styled('input')({
        display: 'none',
      });
  

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

                    <Box component="form"  onSubmit={EditMovieHandler}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                        <strong>Edit Movie Details</strong>
                        </Typography>

                        <FormGroup sx={{ ml: 56, mt: 5, width: 380 }}>
                        <TextField id="outlined-basic" label="Title" variant="outlined" value={ titlee } onChange={(e)=>setTitle(e.target.value)}/>
                        </FormGroup>

                        <FormControl fullWidth sx={{mt: 2, width: 380}}>
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={typee}
                            label="Type"
                            onChange={(e)=>setType(e.target.value)}
                            >
                            <MenuItem value={"Movie"}>Movie</MenuItem>
                            <MenuItem value={"TV Show"}>TV Show</MenuItem>
                        
                            </Select>
                    </FormControl> 

                    <FormGroup sx={{ ml: 56, mt: 2, width: 380 }}>
                        <TextField id="outlined-basic" label="Plot" variant="outlined" value={ plott } onChange={(e)=>setPlot(e.target.value)}/>
                        </FormGroup>

                    <FormGroup sx={{ ml: 56, mt: 5, width: 380 }}>
                        <TextField id="outlined-basic" label="Gross" variant="outlined" value={ grosss } onChange={(e)=>setGross(e.target.value)}/>
                    </FormGroup>

                    <FormControl fullWidth sx={{mt: 2, width: 380}}>
                            <InputLabel id="demo-simple-select-label">Genre</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={genree}
                            label="Genre"
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

                    <FormControl fullWidth sx={{ mt: 2, ml:1,  width: 380}}>
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

                    {/* <FormControl fullWidth sx={{ m: 1 }}>
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
                    </FormControl> */}

                    <FormGroup sx={{ ml: 36, mt: 3 }}>
                            <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={UploadImage}/>
                            <Button variant="contained" component="span" >
                            Upload
                            </Button>
                        </label>
                        </FormGroup>

                        <Stack spacing={2} direction="row" marginLeft='59%' marginTop='1%'>
                        <Button variant="contained" type="submit">Save</Button>
                        </Stack>

                    </Box>
                                    



        
            </div>
        </div>
        
    
                           
    </div>
        </>
     );
}

export default MovieListEdit;