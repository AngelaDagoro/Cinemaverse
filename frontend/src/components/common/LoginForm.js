import { Alert, Backdrop, Button, CircularProgress, Grid, TextField, Typography } from '@mui/material';
// import { Link } from 'react-router-dom';
// import GoogleIcon from '@mui/icons-material/Google';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, loginUser, setEmail, setRegister } from '../../redux/userSlice';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLoginHook from './GoogleLoginHook';

const LoginForm = () => {

    document.title = 'Cinemaverse';

    const { isLoading, email, errors } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [error,setError] = useState(null);
    const navigate = useNavigate();
    const { type } = useSelector(state => state.user);


    useEffect(() => {
        console.log(type);
        if (type === "admin"){
          console.log("yy");
          navigate('/movies/admin');
        }else{
          console.log("yiy");
        }
          
          }, [type, navigate])

          
    const handleSignIn = (e) => {
        e.preventDefault();

        if(!email.length >= 1) return setError("Email is required")
        if(!/.+@.+\.[A-Za-z]+$/.test(email)) return setError("Not a valid email address")


        dispatch(loginUser({email:email}))

        if (type === "admin"){
            console.log("yy");
            navigate('/movies/admin');
          }else{
            console.log("yiy");
          }
    }

    return (
    <>
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{p:5}}
        >
            { isLoading &&
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000 }} open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop> 
            }

            { error &&
                <Alert severity="error" sx={{m:1}}>{error}</Alert>
            }

            { errors &&
                <Alert severity="error" sx={{m:1}}>{errors.errMessage}</Alert>
            }
        <Grid item>
            <TextField sx={{mb:1}} id="email" label="Email" variant="filled" value={email} onChange={(e) => { setError(''); dispatch(clearError()); dispatch(setEmail(e.target.value));}} />
            <br></br>
            {/* <TextField sx={{mb:2}} id="password" label="Password" variant="filled" /> */}
            {/* <br></br> */}
            <Button variant="contained" color="primary" sx={{mt:1,mb:1}} onClick={handleSignIn}>Sign in</Button>
        </Grid>
        OR
        <Grid item sx={{mt:2}}>
            {/* <Button variant="outlined"><GoogleIcon/>oogle</Button> */}
            <GoogleLoginHook />
        </Grid>
        </Grid>
        <Button onClick={() => { dispatch(setRegister(true)) }} size="small">
            Don't have an account?<Typography variant="subtitle1" sx={{display:'flex', justifyContent:'flex-end', textDecoration:'underline'}}> Sign up.</Typography>
        </Button>
    </>
    );
}
 
export default LoginForm;