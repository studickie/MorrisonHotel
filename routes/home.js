const path = require('path');
const express = require('express');
const router = express.Router();
const catchAsync = require(path.resolve(__dirname, '../utils/catchAsync'));
const {
    getTrending,
    getNowPlayingMovies,
    getUpcommingMovies
} = require('../utils/tmdb');
const {
    mapHighlightsList,
    mapPosterGroup
} = require('../utils/movieMapper');

router.get('/', catchAsync(async (req, res) => {
    const response = await Promise.all([
        getTrending(),
        getNowPlayingMovies(),
        getUpcommingMovies()
    ]);

    res.render('index', {
        isAuth: req.isAuth,
        apiUrl: req.apiUrl,
        highlights: mapHighlightsList(response[0].results, 10),
        moviesNowPlaying: mapPosterGroup(response[1].results, 3),
        moviesUpcoming: mapPosterGroup(response[2].results, 3)
    });
}));

module.exports = router;