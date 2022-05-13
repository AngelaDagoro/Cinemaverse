import { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { editProducer, getProducerDetail } from '../../redux/producerSlice';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
// import { styled } from '@mui/material/styles';

import { useParams, useNavigate } from 'react-router-dom';

import { styled } from '@mui/system';



const ProducerListEdit = () => {
    
    const { smembers, name, bio, role } = useSelector(state => state.producer);
    // const { keywords } = useSelector(state => state.filter);
    // const [ id, setID] = useState(0);
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
        dispatch(getProducerDetail({id:params.id, user}))
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

    const EditProducerHandler = (e) => {
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
        dispatch(editProducer(formData));

        navigate(`/producers/admin`);
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

                    <Box component="form"  onSubmit={EditProducerHandler}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                        <strong>Edit Producer Details</strong>
                        </Typography>

                        <FormGroup sx={{ ml: 56, mt: 5, width: 380 }}>
                        <TextField id="outlined-basic" label="Name" variant="outlined" value={ namee } onChange={(e)=>setName(e.target.value)}/>
                        </FormGroup>

                        <FormGroup sx={{ ml: 56, mt: 2, width: 380 }}>
                        <TextField id="outlined-basic" label="Bio" variant="outlined" value={ bioo } onChange={(e)=>setBio(e.target.value)}/>
                        </FormGroup>
{/* 
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
                    </FormControl> */}

                    <FormGroup sx={{ ml: 56, mt: 2, width: 380 }}>
                        <TextField disabled id="outlined-basic" label="Role" variant="outlined" value={ rolee } onChange={(e)=>setRole(e.target.value)} />
                        </FormGroup>

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

export default ProducerListEdit;