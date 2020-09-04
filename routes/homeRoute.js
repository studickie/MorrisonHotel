const express = require('express');
const router = express.Router();
const tmdb = require('../utils/tmdb');
const movieMapper = require('../utils/movieMapper');

router.get('/', async (req, res) => {
    try {
        const content = await Promise.all([
            tmdb.getTrending(),
            tmdb.getNowPlayingMovies(),
            tmdb.getUpcommingMovies()
        ]);
        
        res.render('index', {
            isAuth: req.isAuth,
            highlights: movieMapper.mapHighlightsList(content[0].results, 10),
            moviesNowPlaying: movieMapper.mapPosterGroup(content[1].results, 3),
            moviesUpcoming: movieMapper.mapPosterGroup(content[2].results, 3)
        });

    } catch (e) {
        res.status(500).json({ message: 'Oops! Something went wrong', error: e });
    }
});

module.exports = router;