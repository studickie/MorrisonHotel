const express = require('express');
const router = express.Router();
const tmdb = require('../utils/tmdb');
const movieMapper = require('../utils/movieMapper');
const Watchlist = require('../models/watchlist.model');

router.get('/:id', async (req, res) => {
    try {
        const titleDetails = await Promise.all([
            tmdb.getTitleDetails(req.params.id),
            tmdb.getTitleCredits(req.params.id),
            Watchlist.find({ tmdbId: req.params.id })    
        ]);
        
        const mappedDetails = movieMapper.mapTitleDetails(
            Object.assign({}, titleDetails[0], titleDetails[1]), titleDetails[2].length || false);
        
        res.render('title', { details: mappedDetails });
    } catch (e) {
        return res.status(500).json({ message: 'Oops! Something went wrong', error: e });
    }
})

module.exports = router;