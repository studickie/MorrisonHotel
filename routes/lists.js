const path = require('path');
const catchAsync = require(path.resolve(__dirname, '../utils/catchAsync'));
const { getSearchResults } = require(path.resolve(__dirname, '../utils/tmdb'));
const { mapTitleList } = require(path.resolve(__dirname, '../utils/movieMapper'));
const express = require('express');
const router = express.Router();

router.get('/search', catchAsync(async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(404).json({ message: 'No search paramters provided', query });
    }

    const response = await getSearchResults(query);

    return res.render('searchTitles', { 
        isAuth: req.isAuth,
        apiUrl: req.apiUrl,
        searchQuery: query,
        showTitleSearch: response.results.length == 0,
        titles: mapTitleList(response.results) 
    });
}));

module.exports = router;