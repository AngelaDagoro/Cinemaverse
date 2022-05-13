import { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getAllActor, getActorNames, setHasMore, clearActors } from '../../redux/actorSlice';
import InfiniteScroll from "react-infinite-scroll-component";
import { CardMedia, Grid, Box, Paper } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import SearchBar from '../common/SearchBar';
// import RatingFilter from '../common/RatingFilter';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';



const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8
  };

const Actor = () => {
    
    const { smembers, membersCount, actorNames, hasMore, page } = useSelector(state => state.actor);
    const { keywords } = useSelector(state => state.filter);
    // const { user, type } = useSelector(state => state.user);
    const dispatch = useDispatch();


    useEffect(() => {
      dispatch(getActorNames())
            fetchMoreData()
            return () => {
              dispatch(clearActors());
            }
        }, [])

    console.log(smembers);

    const fetchMoreData = () => {
        dispatch (getAllActor({page, ...keywords}));
      };
    
    return ( 
        <>

    <div>
        {/* <h1>demo: react-infinite-scroll-component</h1> */}
        <br></br>
        <br></br>
        <br></br>
        <hr />
        <Box sx={{m:2}}>
          <SearchBar items={actorNames}  label="Search Actor"/>
        </Box>
        <Box sx={{m:2}} style={{ float: 'right'}}>
          {/* <RatingFilter/> */}
        </Box>
        <InfiniteScroll
          dataLength={smembers.length}
          next={fetchMoreData}
          hasMore={smembers.length >= membersCount ? false : true}
          loader={smembers.length >= membersCount ? <h4>Wala na...</h4> : <h4>Loading...</h4>}
          endMessage={
            <h4>End Result...</h4>
          }
        >
        <Grid container spacing={2} sx={{p:2}}>
            {smembers.map((smember, index) => (
                <Grid item lg={3} md={3} key={index} sm={3} xs={12}>
                  <Link to={`/actors/${smember._id}`}>
                    {/* <Paper elevation={4} sx={{p:2}}> */}
                        {/* <CardMedia
                            component="img"
                            height="194"
                            image={smember.avatar[0].url}
                            alt={smember.avatar[0].public_url}
                            sx={{pb:2}}
                                      /> */}

                <Card sx={{ maxWidth: 345 }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="240"
                          image={smember.avatar[0].url}
                          alt={smember.avatar[0].public_url}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                          {smember.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                           {smember.bio}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>


{/* 
                                      {smember.name}
                                    </Paper> */}
                                  </Link>
                                </Grid>
                            ))}
                        </Grid>
        </InfiniteScroll>
      </div>

        </>
     );
}
 
export default Actor;

