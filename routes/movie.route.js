const express = require('express');
const router = express.Router();
const Movie = require('../models/movie.model');

router.get('/', async (req, res) => {
    try {
        const moviesList = await Movie.find();
        
        res.render('movies', { moviesList });

    } catch (e) {
        res.status(500).json({ message: 'Oops! Something went wrong' });
    }
});

router.post('/', async (req, res) => {
    console.log(req.body)
    const { title, genre } = req.body;

    try {
        const movieToCreate = new Movie({ title, genre });

        const newMovie = await movieToCreate.save();

        if (!newMovie) return res.status(500).json({ message: 'Oops! Something went wrong' });

        const moviesList = await Movie.find();
        
        res.render('movies', { moviesList });
    } catch (e) {
        res.status(500).json({ message: 'Oops! Something went wrong' });
    }
});

module.exports = router;