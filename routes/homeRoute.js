const express = require('express');
const router = express.Router();
const {
    getTrending,
    getNowPlayingMovies,
    getUpcommingMovies
} = require('../utils/tmdb');
const {
    mapHighlightsList,
    mapPosterGroup
} = require('../utils/movieMapper');

router.get('/', async (req, res) => {
    try {
        const response = await Promise.all([
            getTrending(),
            getNowPlayingMovies(),
            getUpcommingMovies()
        ]);

        res.render('index', {
            isAuth: req.isAuth,
            highlights: mapHighlightsList(response[0].results, 10),
            moviesNowPlaying: mapPosterGroup(response[1].results, 3),
            moviesUpcoming: mapPosterGroup(response[2].results, 3)
        });

    } catch (e) {
        res.status(500).json({ message: 'Oops! Something went wrong', error: e });
    }
});

module.exports = router;