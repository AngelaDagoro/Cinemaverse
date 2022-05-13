const express = require('express');
const router = express.Router();

const {
    createMovie,
    getAllMovies,
    getMovie,
    updateMovie,
    deleteMovie,
    createMovieReview,
    deleteMovieReview,
    getMovieTitles,
    addActorMovie

} = require('../controllers/movieController');

router.route('/movies/new').post(createMovie);
router.route('/movies').get(getAllMovies);
router.route('/movies/:id').get(getMovie);
router.route('/movies/:id').put(updateMovie);
router.route('/movies/:id').delete(deleteMovie);
router.route('/review').put(createMovieReview);
router.route('/review/delete').delete(deleteMovieReview);
router.route('/movies/all/titles').get(getMovieTitles);
router.route('/movies/addactor/:id').post(addActorMovie);

module.exports = router
    
