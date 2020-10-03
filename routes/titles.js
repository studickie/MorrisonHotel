const path = require('path');
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const catchAsync = require(path.resolve(__dirname, '../utils/catchAsync'));
const {
    getTitleDetails,
    getTitleVideos
} = require('../utils/tmdb');
const {
    mapTitleDetails,
    selectRelevantVideo
} = require('../utils/movieMapper');

router.get('/:mediaType/:tmdbId', catchAsync(async (req, res) => {
    const { tmdbId, mediaType } = req.params;

    let user;
    if (req.isAuth) {
        const { userId } = req.session.user;
        const populateQuery = [
            { path: 'watchlist', match: { tmdbId }, select: 'tmdbId' },
            { path: 'ratings', match: { tmdbId }, select: 'rating' }];

        user = await User.findById(userId).populate(populateQuery);
    }

    const response = await Promise.all([
        getTitleDetails(mediaType, tmdbId),
        getTitleVideos(mediaType, tmdbId)
    ]);

    res.render('title', {
        isAuth: req.isAuth,
        apiUrl: req.apiUrl,
        title: mapTitleDetails(response[0]),
        mediaType: mediaType,
        video: selectRelevantVideo(response[1].results || []),
        isWatchlisted: user && user.watchlist[0]
            ? (user.watchlist[0].tmdbId == tmdbId)
            : false,
        userRating: user && user.ratings[0]
            ? user.ratings[0].rating
            : -1
    });
}));

module.exports = router;