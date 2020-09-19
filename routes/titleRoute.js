const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const {
    fetchTitleDetails,
    fetchTitleVideos
} = require('../utils/tmdb');
const {
    mapTitleDetails,
    selectRelevantVideo
} = require('../utils/movieMapper');

router.get('/:mediaType/:id', async (req, res, next) => {
    const { id: tmdbId, mediaType } = req.params;

    try {
        let user;
        if (req.isAuth) {
            const populateQuery = [
                { path: 'watchlist', match: { tmdbId }, select: 'tmdbId' },
                { path: 'ratings', match: { tmdbId }, select: 'rating' }];

            user = await User.findById(req.session.user).populate(populateQuery);
        }

        const response = await Promise.all([
                fetchTitleDetails(mediaType, tmdbId),
                fetchTitleVideos(mediaType, tmdbId)
        ]);

        res.render('title', {
            isAuth: req.isAuth,
            title: mapTitleDetails(response[0]),
            video: selectRelevantVideo(response[1].results || []),
            isWatchlisted: user && user.watchlist[0]
                ? (user.watchlist[0].tmdbId == tmdbId) 
                : false,
            userRating: user && user.ratings[0]
                ?  user.ratings[0].rating
                : -1
        });
        
    } catch (e) {
        return next(e);
    }
});

module.exports = router;