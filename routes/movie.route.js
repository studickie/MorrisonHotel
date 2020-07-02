const express = require('express');
const router = express.Router();
const Movie = require('../models/movie.model');
const tmdb = require('../utils/tmdb');
const movieMapper = require('../utils/movieMapper');

router.get('/', async (req, res) => {
    try {
        const movies = await tmdb.getNowPlayingMovies();
        
        const moviesToReturn = movieMapper.mapMovieHighlights(movies.results);
        
        res.render('movies', { movies: moviesToReturn });

    } catch (e) {
        res.status(500).json({ message: 'Oops! Something went wrong' });
    }
});

router.post('/', async (req, res) => {
    const { title, genre } = req.body;

    try {
        const movieToCreate = new Movie({ title, genre });

        const newMovie = await movieToCreate.save();

        if (!newMovie) return res.status(500).json({ message: 'Oops! Something went wrong' });

        res.status(200).json({ message: 'Successfuly created!', movie: newMovie });

    } catch (e) {
        res.status(500).json({ message: 'Oops! Something went wrong', error: e });
    }
});

// router.post('/:id', async (req, res) => {
//     try {


//     } catch (e) {
//         res.status(500).json({ message: 'Oops! Something went wrong' });
//     }
// });

// router.delete('/:id', async (req, res) => {
//     try {
//         const movieToDelete = await Movie.findByIdAndDelete(req.params.id);

//         res.status(200).json({ message: 'Operation success!', id: movieToDelete._id });

//     } catch (e) {
//         res.status(500).json({ message: 'Oops! Something went wrong' });
//     }
// });

module.exports = router;