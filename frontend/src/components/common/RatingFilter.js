import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearActors, getAllActor } from "../../redux/actorSlice";
import { setKeywords } from "../../redux/filterSlice";
import { clearMovie, getAllMovies } from "../../redux/movieSlice";
import { clearProducer, getAllProducer } from "../../redux/producerSlice";
import { styled } from '@mui/material/styles';

const RatingFilter = () => {

    const [selected,setSelected] = useState(null);
    const { keywords } = useSelector(state => state.filter)
    const dispatch = useDispatch();
    console.log(selected);

    const path = window.location.pathname


    useEffect(() => {
        switch (path) {
            case '/':
                dispatch(clearMovie());
                // dispatch(setKeywords({...keywords, ratings: selected}));
                dispatch(getAllMovies({...keywords}));
                break;
            case '/actors':
                dispatch(clearActors());
                dispatch(getAllActor({...keywords}));
                break;
            case '/producers':
                dispatch(clearProducer());
                dispatch(getAllProducer({...keywords}));
            break;
            default:
                break;
        }
        
    }, [selected])

    const BpIcon = styled('span')(({ theme }) => ({
        borderRadius: '50%',
        width: 16,
        height: 16,
        boxShadow:
          theme.palette.mode === 'dark'
            ? '0 0 0 1px rgb(16 22 26 / 40%)'
            : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
        backgroundImage:
          theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
            : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '.Mui-focusVisible &': {
          outline: '2px auto rgba(19,124,189,.6)',
          outlineOffset: 2,
        },
        'input:hover ~ &': {
          backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
        },
        'input:disabled ~ &': {
          boxShadow: 'none',
          background:
            theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
        },
      }));
      
      const BpCheckedIcon = styled(BpIcon)({
        backgroundColor: '#301934',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
          display: 'block',
          width: 16,
          height: 16,
          backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
          content: '""',
        },
        'input:hover ~ &': {
          backgroundColor: '#301934',
        },
      });
      
      // Inspired by blueprintjs
      function BpRadio(props) {
        return (
          <Radio
            sx={{
              '&:hover': {
                bgcolor: 'transparent',
              },
            }}
            disableRipple
            color="default"
            checkedIcon={<BpCheckedIcon />}
            icon={<BpIcon />}
            {...props}
          />
        );
      }
      



    return ( 
        <div>
            {/* <FormControl component="fieldset">
            <FormLabel component="legend">Ratings</FormLabel>
            <RadioGroup
                aria-label="ratings"
                value={keywords && keywords.ratings}
                name="radio-buttons-group"
                onChange={(e) => { setSelected(e.target.value); dispatch(setKeywords({...keywords, ratings: e.target.value})); }}
            >
                <FormControlLabel value={5} control={<Radio size="small"/>} label={<Rating name="rating5" defaultValue={5} size="small" readOnly/>} /> 
                <FormControlLabel value={4} control={<Radio size="small"/>} label={<Rating name="rating4" defaultValue={4} size="small" readOnly/>} />
                <FormControlLabel value={3} control={<Radio size="small"/>} label={<Rating name="rating3" defaultValue={3} size="small" readOnly/>} />
                <FormControlLabel value={2} control={<Radio size="small"/>} label={<Rating name="rating2" defaultValue={2} size="small" readOnly/>} />
                <FormControlLabel value={1} control={<Radio size="small"/>} label={<Rating name="rating1" defaultValue={1} size="small" readOnly/>} />
            </RadioGroup>
            </FormControl> */}

            <FormControl component="fieldset">
                <FormLabel component="legend">Ratings: </FormLabel>
                <RadioGroup 
                    value={keywords && keywords.ratings} 
                    aria-label="ratings" 
                    name="customized-radios"
                    onChange={(e) => { setSelected(e.target.value); dispatch(setKeywords({...keywords, ratings: e.target.value})); }}
                    >

                    <FormControlLabel value={5} control={<BpRadio />} label={<Rating name="rating5" defaultValue={5} size="small" readOnly/>} />
                    <FormControlLabel value={4} control={<BpRadio />} label={<Rating name="rating4" defaultValue={4} size="small" readOnly/>} />
                    <FormControlLabel value={3} control={<BpRadio />} label={<Rating name="rating3" defaultValue={3} size="small" readOnly/>} />
                    <FormControlLabel value={2} control={<BpRadio />} label={<Rating name="rating2" defaultValue={2} size="small" readOnly/>} />
                    <FormControlLabel value={1} control={<BpRadio />} label={<Rating name="rating1" defaultValue={1} size="small" readOnly/>} />
                   
                </RadioGroup>
                </FormControl>

        </div>
     );
}
 
export default RatingFilter;