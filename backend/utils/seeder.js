const Movie = require('../models/movie');
const User = require('../models/user');
// const Person = require('../models/person');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

// const movies = require('../data/movies');
const user = require('../data/user');

// Setting dotenv file
dotenv.config({ path: 'backend/.env' })

connectDatabase();

const axios = require('axios')

let movies = [];


let genres = [
    'Horror',
    'Sci-Fi',
    'Drama',
    'Comedy',
    'War',
    'Sports',
    'Crime',
    'Action',
    'Musicals',
    'Romance',
]

let type = [
    'Movie',
    'TV Show'
]

const getSingleMovie = async(id) => {
    await axios.get(`https://www.omdbapi.com/?apikey=433d52cd&i=${id} `)
        .then(response => {
            movies.push({
                title: response.data.Title.substr(0,78),
                type: type[parseInt(Math.random() * 2)],
                ratings: parseInt(Math.random() * 5),
                year: response.data.Year,
                date_released: Date.now(),
                runtime: response.data.Runtime.split(' ')[0],
                genre: genres[parseInt(Math.random() * 7)],
                plot: response.data.Plot,
                gross: parseInt(Math.random() * 1000000),
                posters : [
                    {
                        public_id : `products/${response.data.imdbID}`,
                        url : response.data.Poster
                    }
                ],
                actors:[],
                producers:"",
                director:[],
                reviews:[],
            })
        })
}

const seedUsers = async () => {
    try {
        await User.deleteMany();
        console.log('Users are deleted');
        
        await User.insertMany(user)
        console.log('All users are added.');
        
    } catch (error) {
        console.log(error.message);
        process.exit()
    }
}

seedUsers()

const getOMDBmovies = async() => {
    for(let i = 1; i < 20; i++){
        await axios.get(`https://www.omdbapi.com/?apikey=433d52cd&type=movie&s=The a&page=${i}`)
        .then(response => {
            response.data.Search.forEach(element => {
                getSingleMovie(element.imdbID);
            });
        })
        .catch(error => {
            console.log(error.message);
        })
    }
}


// function getRandomNumberBetween(min,max){
//     return Math.floor(Math.random()*(max-min+1)+min);
// }


// const seedPersons = async () => {
//     try {
//         let persons = [];
//         let roles = [
//             'Actor',
//             'Actress',
//             'Director',
//             'Producer'
//         ];

//         await axios.get('https://jsonplaceholder.typicode.com/users')
//         .then(response => {
//             response.data.forEach(element => {
//                 persons.push({
//                     name:element.name,
//                     role:roles[Math.floor(Math.random()*3) + 1],
//                     bio:element.company.catchPhrase,
//                     avatar: https://ui-avatars.com/api/?name=${element.name}
//                 })
//             })
//         })
//         .finally(() => {
//             Person.deleteMany();
//             Person.insertMany(persons);
//         })
        
//     } catch (error) {
//         console.log(error.message);
//         process.exit()
//     }
// }

// seedPersons();

// const seedUsers = async () => {
//     try {
//         await User.deleteMany();
//         console.log('Users are deleted');
        
//      

getOMDBmovies().finally(async()=>{
    try {

        await Movie.deleteMany();
        console.log('Movies are deleted');

        await Movie.insertMany(movies)
        console.log('All Movies are added.')

        process.exit();

    } catch (error) {
        console.log(error.message);
        process.exit();
    }
});