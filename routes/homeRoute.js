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
        
        const mappedContent = {
            highlights: movieMapper.mapHomepageHighlights(content[0].results),
            nowPlaying: movieMapper.mapPosterLinkList(content[1].results, 3),
            upcoming: movieMapper.mapPosterLinkList(content[2].results, 3)
        };
        
        res.render('index', { content: mappedContent });

    } catch (e) {
        res.status(500).json({ message: 'Oops! Something went wrong', error: e });
    }
});

module.exports = router;