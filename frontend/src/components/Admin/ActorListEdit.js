import { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { editActor, addActor, getActorDetailEdit } from '../../redux/actorSlice';

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

import { useParams, useNavigate } from 'react-router-dom';

import { styled } from '@mui/system';
import TablePaginationUnstyled from '@mui/base/TablePaginationUnstyled';

const ActorListEdit = () => {
    
    const { smembers, name, bio, role } = useSelector(state => state.actor);
    const { keywords } = useSelector(state => state.filter);
    const [ id, setID] = useState(0);
    const [ namee, setName] = useState("");
    const [ bioo, setBio] = useState("");
    const [ rolee, setRole] = useState("");
    const [ images, setImages] = useState([]);
    const params = useParams();

    const { user } = useSelector(state => state.user)

    const dispatch = useDispatch();
    const navigate = useNavigate();

   

    useEffect(() => {
      
       if (!name && !bio && !role){
        dispatch(getActorDetailEdit({id:params.id, user}))
       }else {
            setName(name);
            setBio(bio);
            setRole(role);
       }
        }, [dispatch, name, bio, role, params, user])


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

    const EditActorHandler = (e) => {
        e.preventDefault();

        console.log(namee);
        // console.log(bio);
        // console.log(images);
      
        let formData = new FormData();
        formData.set('id', params.id);
        formData.set('name', namee);
        formData.set('bio', bioo);
        formData.set('role', rolee);
        
        images.forEach(image=>{
            formData.append('images', image)
        })

        console.log(formData);
        dispatch(editActor(formData));

        navigate(`/actors/admin`);
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

                    <Box component="form"  onSubmit={EditActorHandler}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                        <strong>Edit Actor Details</strong>
                        </Typography>

                        <FormGroup sx={{ ml: 56, mt: 5, width: 380}}>
                        <TextField id="outlined-basic" label="Name" variant="outlined" value={ namee } onChange={(e)=>setName(e.target.value)}/>
                        </FormGroup>

                        <FormGroup sx={{ ml: 56, mt: 2, width: 380}}>
                        <TextField id="outlined-basic" label="Bio" variant="outlined" value={ bioo } onChange={(e)=>setBio(e.target.value)}/>
                        </FormGroup>

                        <FormControl fullWidth sx={{ mt: 2, width: 380}}>
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

export default ActorListEdit;