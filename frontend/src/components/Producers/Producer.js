import { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getAllProducer, getProducerNames, setHasMore } from '../../redux/producerSlice';
import InfiniteScroll from "react-infinite-scroll-component";
import { CardMedia, Grid, Paper, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchBar from '../common/SearchBar';
import { clearProducer } from '../../redux/producerSlice';
// import RatingFilter from '../common/RatingFilter';
// import YearFilter from '../common/YearFilter';
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

const Producer = () => {
    
    const { smembers, membersCount, producerNames, hasMore, page } = useSelector(state => state.producer);
    const { keywords } = useSelector(state => state.filter);
    const dispatch = useDispatch();


    useEffect(() => {
      dispatch(getProducerNames())
            fetchMoreData()
          return() => {
           dispatch(clearProducer())
          }
        }, [])

    console.log(smembers);

    const fetchMoreData = () => {
        dispatch (getAllProducer({...keywords, page}));

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
          <SearchBar items={producerNames}  label="Search Producer"/>
        </Box>
        <Box sx={{m:2}}>
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
            {smembers.map(smember => (
                <Grid item lg={3} md={3} key={smember._id} sm={3} xs={12}>
                  <Link to={`/producers/${smember._id}`}>
                    {/* <Paper elevation={4} sx={{p:2}}>
                        <CardMedia
                            component="img"
                            height="194"
                            image={smember.avatar[0].url}
                            alt={smember.avatar[0].public_url}
                            sx={{pb:2}}
                                        />
                                        {smember.name}
                                    </Paper> */}


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


                                    </Link>
                                </Grid>
                            ))}
                            </Grid>

           
        </InfiniteScroll>
      </div>
        </>
     );
}

export default Producer;