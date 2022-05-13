import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProducerDetail } from "../../redux/producerSlice";

const ProducerDetails = () => {

    const id = useParams();
    const { producer, name, role, bio, avatar, moviesprod } = useSelector(state => state.producer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducerDetail(id))
        return () => {
            console.log(`Cleaned Producer Details`);
        }
    }, [])

    // console.log('Producer Detail => ',producer);

    return ( 
        <>
        <div style={{padding: '10%'}}>
            <p><strong>Name: {name}</strong></p>
            <p>{role}</p>
          
            {
                avatar ? avatar.map( (avatar, index) => {
                    return <img src={avatar.url} alt={avatar.public_url} width="200" length="250" key={index} />
                }) :console.log("Fetching...")
            }
            <p><strong>Bio: </strong>{bio}</p>
            <p><strong>Movies: </strong> {moviesprod}</p>
            </div>
        </>
     );
}
 
export default ProducerDetails;