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

    return res.render('titleList', { 
        isAuth: req.isAuth,
        apiUrl: req.apiUrl,
        titles: mapTitleList(response.results) 
    });
}));

module.exports = router;