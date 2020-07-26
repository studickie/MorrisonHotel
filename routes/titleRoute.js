const express = require('express');
const router = express.Router();
const tmdb = require('../utils/tmdb');
const movieMapper = require('../utils/movieMapper');
const User = require('../models/userModel');

router.get('/:mediaType/:id', async (req, res, next) => {
    const { 'id': tmdbId, mediaType } = req.params;
    const { '_id': userid } = req.session.user;
    console.log(tmdbId, mediaType)
    try {
        const populateQuery = [
            { path:'watchlist', match: { tmdbId }, select:'tmdbId' }, 
            { path:'ratings', match: { tmdbId }, select:'rating' }];

        const titleDetails = await Promise.all([
            tmdb.getTitleDetails(tmdbId),
            tmdb.getTitleCredits(tmdbId),
            tmdb.getSimilarMovies(tmdbId),
            User.findOne({ _id: userid }).populate(populateQuery)
        ]);
        console.log('titleDetails')
        const data = { 
            titleDetails: movieMapper.mapTitleDetails({...titleDetails[0], ...titleDetails[1]}),
            similarTitles: movieMapper.mapPosterList(titleDetails[2].results, 10),
            ratings: titleDetails[3].ratings.rating,
            watchlist: titleDetails[3].watchlist.tmdbId ? true : false
         };
         console.log('data')
         res.render('title', data);
    } catch (e) {
        return res.status(500).json({ message: 'Oops! Something went wrong', error: e });
    }
})

module.exports = router;