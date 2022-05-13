import * as React from 'react';
// import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
// import NavbarAdmin from './components/NavbarAdmin';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Movie from './components/Movies/Movie';
import Actor from './components/Actors/Actor';
import Producer from './components/Producers/Producer';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Backdrop, Paper} from '@mui/material';
import LoginForm from './components/common/LoginForm';
import RegisterForm from './components/common/RegisterForm';
import { getUserInfo } from './redux/userSlice';
import MovieDetails from './components/Movies/MovieDetails';
import ActorDetails from './components/Actors/ActorDetails';
import ProducerDetails from './components/Producers/ProducerDetails';
import Dashboard from './components/common/Dashboard';
import ProducerList from './components/Admin/ProducerList';
import ActorList from  './components/Admin/ActorList';
import MovieList from  './components/Admin/MovieList';
import ActorListEdit from './components/Admin/ActorListEdit';
import ProducerListEdit from './components/Admin/ProducerListEdit';
import MovieListEdit from './components/Admin/MovieListEdit';

// import ProducerAdd from './components/Admin/ProducerAdd';

function App() {

  const { email, isLogin, onRegister } = useSelector(state => state.user);
  const dispatch = useDispatch()

  React.useEffect(() => {
    if(!localStorage.getItem('id')) return 'No user'

    dispatch(getUserInfo({id:localStorage.getItem('id')}))
    return () => {
      console.log('Cleaned');
    }
  }, [dispatch])

  
  return (
    <Router>
        <div className="App">
         
        { !isLogin && 
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
              <Paper elevation={6} sx={{ p:4, m:2}}>
                <Alert severity="info">To use this website, you must first Log In or Register.</Alert>
                { onRegister &&
                  <RegisterForm/>
                }
                { !onRegister &&
                  <LoginForm/>
                }
              </Paper>
          </Backdrop>
        }

          <Navbar/>

          <Routes>
              <Route exact path="/" element={<Movie />}/>
              <Route exact path="/actors" element={<Actor />}/>
              <Route exact path="/producers" element={<Producer />}/>
              <Route exact path="/movies/:id" element={<MovieDetails />} />
              <Route exact path="/actors/:id" element={<ActorDetails />} />
              <Route exact path="/producers/:id" element={<ProducerDetails />} />
              <Route exact path="/dashboard" element={<Dashboard/>} />

              <Route exact path="/producers/admin" element={<ProducerList />}/>
              <Route exact path="/producers/edit/admin/:id" element={<ProducerListEdit />}/>
              <Route exact path="/actors/admin" element={<ActorList />}/>
              <Route exact path="/actors/edit/admin/:id" element={<ActorListEdit />}/>
              <Route exact path="/movies/admin" element={<MovieList />}/>
              <Route exact path="/movies/edit/admin/:id" element={<MovieListEdit />}/>
              {/* <Route exact path="/producers/admin/add" element={<ProducerAdd />}/> */}
          </Routes>

          {/* <NavbarAdmin/> */}




        </div>

    </Router>
    
  );
}

export default App;
