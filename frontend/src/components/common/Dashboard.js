import { useDispatch, useSelector } from "react-redux";
import Grid from '@mui/material/Grid'
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from "@mui/material";
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import { useEffect } from "react";
import { getTopRatedActors, getTopRatedMovies, getTopRatedTvShows } from "../../redux/dashboardSlice";
import PopularGenre from "./PopularGenre";
import PopularMovies from "./PopularMovies";
import GrossingFilms from "./GrossingFilms";
import GrossingTvShows from "./GrossingTvShows";
import { getAllMovies } from '../../redux/movieSlice';

const Dashboard = () => {

    const { moviesCount } = useSelector(state => state.movie);
    console.log(moviesCount);
    const { topRatedMovies, topRatedTvShows, topRatedActors } = useSelector(state => state.dashboard)
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getAllMovies());
        dispatch(getTopRatedMovies());
        dispatch(getTopRatedTvShows());
        dispatch(getTopRatedActors());
    },[dispatch])

    console.log(topRatedMovies);

    return (
        <>
        {/* <div>
             <Box sx={{m:2}}>
          <SearchBar items={titles} label="Search Movie"/>
        </Box>
        </div> */}
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item lg={4} md={4} sm={4} xs={12}>

                        {/* number of movies  */}
                        <Paper sx={{marginTop:'18%', marginLeft:'3%', padding:'4%',borderRadius:'10px', display:'flex', justifyContent:'center', alignItems:'center'}} elevation={6}>
                            <LocalMoviesIcon sx={{color:"#301934", backgroundColor:"#C8AACC", padding:'8px', borderRadius:'50%'}}/>
                            {/* <strong> {moviesCount} total number of movies</strong> */}
                            <strong> {"187"} total number of movies</strong>
                         
                        </Paper>

                        {/* Grossing Films for dashboard */}
                        <Paper sx={{marginTop:'3%',marginLeft:'3%',padding:'3%',borderRadius:'10px', display:'flex', justifyContent:'center', alignItems:'center'}} elevation={6}>
                            <GrossingFilms/>
                        </Paper>


                    </Grid>

                    
                    <Grid item lg={4} md={4} sm={4} xs={12}>

                          {/* Popular Genre for DAshboard */}
                        <Paper sx={{marginTop:'18%', padding:'3%',borderRadius:'10px', display:'flex', justifyContent:'center', alignItems:'center'}} elevation={6}>
                            <PopularGenre/>
                        </Paper>

                          {/* Grossing TV Show for DAshboard */}
                        <Paper sx={{marginTop:'3%',padding:'3%',borderRadius:'10px', display:'flex', justifyContent:'center', alignItems:'center'}} elevation={6}>
                            <GrossingTvShows/>
                        </Paper>

                    </Grid>


                    <Grid item lg={4} md={4} sm={4} xs={12}>

                          {/* Popular Movies for DAshboard */}
                        <Paper sx={{marginTop:'18%',marginRight:'3%',padding:'3%',borderRadius:'10px', display:'flex', justifyContent:'center', alignItems:'center'}} elevation={6}>
                            <PopularMovies/>
                        </Paper>

                    </Grid>

                </Grid>
                    
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Grid container spacing={3} justifyContent="center">
                    {/* top rated movies */}
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                        <Paper sx={{p:1, borderRadius:'10px', marginTop:'-37%', marginLeft:'3%'}} elevation={6}>
                            <List>
                                <ListItem>
                                    <Typography variant="subtitl1" component="div">
                                        <strong>Top 10 Highest Rated Movies</strong>
                                    </Typography>
                                </ListItem>
                                { topRatedMovies &&
                                    topRatedMovies.map(top => {
                                        return(
                                        <ListItem key={top._id.substr(6)}>
                                            <ListItemAvatar>
                                                <Avatar src={top.avatar} alt={top.title} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={top.title}
                                            />
                                        </ListItem>
                                        )
                                    })
                                }
                            </List>
                        </Paper>
                    </Grid>

                    {/* Top rated tv shows */}
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                        <Paper sx={{p:1, borderRadius:'10px'}} elevation={6}>
                            <List>
                                <ListItem>
                                    <Typography variant="subtitl1" component="div">
                                        <strong>Top 10 Highest Rated TV Shows</strong>
                                    </Typography>
                                </ListItem>
                                { topRatedTvShows &&
                                    topRatedTvShows.map(top => {
                                        return(
                                        <ListItem key={top._id.substr(6)}>
                                            <ListItemAvatar>
                                                <Avatar src={top.avatar} alt={top.title} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={top.title}
                                            />
                                        </ListItem>
                                        )
                                    })
                                }
                            </List>
                        </Paper>
                    </Grid>

                    {/* Top rated actors */}
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                        <Paper sx={{p:1, borderRadius:'10px', marginTop:'-12%', marginRight:'3%'}} elevation={6}>
                            <List>
                                <ListItem>
                                    <Typography variant="subtitl1" component="div">
                                        <strong>Top 10 Highest Rated Actors</strong>
                                    </Typography>
                                </ListItem>
                                { topRatedActors &&
                                    topRatedActors.map(top => {
                                        return(
                                        <ListItem key={top._id.substr(6)}>
                                            <ListItemAvatar>
                                                <Avatar src={top.avatar} alt={top.name} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={top.name}
                                            />
                                        </ListItem>
                                        )
                                    })
                                }
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>

              </Grid>
            </Grid>
        </>
    );
}
 
export default Dashboard;