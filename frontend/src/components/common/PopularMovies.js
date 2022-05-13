import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopularMovies } from "../../redux/dashboardSlice";
// import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);



const PopularMovies = () => {
    
    const { popularMovies, movieLabels, movieValues } = useSelector(state => state.dashboard);
    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(getPopularMovies());
    },[dispatch])
    
    const labels = movieLabels.map(k=>k.substr(0,12));

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                  title: (tooltipItem, data) => {
                    return `${movieLabels[tooltipItem[0].dataIndex]}`
                  }
                }
            },
            title: {
                display: true,
                text: 'Popular Movies',
            },
        },
    };

    const data = {
        labels,
        datasets : [{
            label: 'Count',
            data: movieValues,
            backgroundColor: [
                '#301934',
                '#472E4B',
                '#5F4563',
                '#785D7C',
                '#927595',
                '#AC8FB0',
                '#C8AACC',
                '#E4C5E8',
                '#FFE1FF',
                '#FFFEFF',
            ],
            borderWidth: 1,
        }]
    }
    return (
        <> 
            { popularMovies && <Pie options={options} data={data} />}   
        </>
    );
}
 
export default PopularMovies;