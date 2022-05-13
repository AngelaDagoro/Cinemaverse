import { useGoogleLogin } from 'react-google-login';
import GoogleIcon from '@mui/icons-material/Google';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { googleAuth, setOnGoogle } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';

// refresh token
// import { refreshTokenSetup } from '../utils/refreshToken';

function GoogleLoginHook() {

  const dispatch = useDispatch(state => state.user);
  const navigate = useNavigate();
  const { type } = useSelector(state => state.user);

  // useEffect(() => {
  //   console.log(type);
  //   if (type === "admin"){
  //     console.log("yy");
  //     navigate('/movies/admin');
  //   }else{
  //     console.log("yiy");
  //   }
      
  //     }, [type, navigate])

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    localStorage.setItem('googleId',res.profileObj.googleId);
    dispatch(googleAuth(res.profileObj));
    dispatch(setOnGoogle(true));

    if (type === "admin"){
      console.log("yy");
      navigate('/movies/admin');
    }else{
      console.log("yiy");
      navigate('/');
    }
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login`
    );
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    isSignedIn: true,
    accessType: 'offline',
  });

  return (
    <Button onClick={signIn} variant="contained">
      Sign In with <GoogleIcon/>oogle
    </Button>
  );
}

export default GoogleLoginHook;