const express = require('express');
const router = express.Router();
const Watchlist = require('../models/watchlist.model');
const tmdb = require('../utils/tmdb');
const movieMapper = require('../utils/movieMapper');

router.get('/', async (req, res) => {
    try {
        const watchlist = await Watchlist.find();
        
        const titleDetails = await Promise.all(watchlist.map(itm => tmdb.getTitleDetails(itm.tmdbId)));

        const listToReturn = movieMapper.mapWatchlist(titleDetails);

        res.render('watchlist', { watchlist: listToReturn });

    } catch (e) {
        res.status(500).json({ message: "Oops! Something went wrong", error: e });
    }
});

router.post('/', async (req, res) => {
    try {
        const movieExists = await Watchlist.find({ tmdbId: req.body.tmdbId });
        
        if (movieExists.length > 0) {
            return res.status(400).json({ message: 'Movie already added to watchlist' });
        }

        const newWatchlist = new Watchlist({
            tmdbId: req.body.tmdbId
        });

        await newWatchlist.save();

        res.status(200).json({ message: 'Movie successfuly added to watchlist', newMovie: newWatchlist });

    } catch (e) {
        res.status(500).json({ message: 'Opps! Something went wrong', error: e });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const movieToDelete = await Watchlist.findOneAndDelete({ tmdbId: req.params.id });

        res.status(200).json({ message: 'Successfuly removed from watchlist', movieId: movieToDelete._id });
    } catch (e) {
        res.status(500).json({ message: 'Opps! Something went wrong', error: e });
    }
});

module.exports = router;