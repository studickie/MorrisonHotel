const express = require('express');
const router = express.Router();
const Watchlist = require('../models/watchlistModel');
const tmdb = require('../utils/tmdb');
const movieMapper = require('../utils/movieMapper');
const User = require('../models/userModel');

router.get('/', async (req, res) => {
    const { '_id': userid } = req.session.user;
    
    try {
        const user = await User.findOne({ _id: userid }).populate('watchlist');
        
        const titleDetails = await Promise.all(user.watchlist.map(itm => tmdb.getTitleDetails(itm.tmdbId)));
        
        const listToReturn = movieMapper.mapWatchlist(titleDetails);
        
        res.render('watchlist', { watchlist: listToReturn });

    } catch (e) {
        res.status(500).json({ message: "Oops! Something went wrong", error: e });
    }
});

router.post('/', async (req, res) => {
    const { tmdbId } = req.body;
    const { '_id': userid } = req.session.user;
    
    try {
        const user = await User.findById(userid).populate('watchlist', 'tmdbId');
        
        if (user.watchlist.filter(itm => itm.tmdbId == tmdbId).length > 0) {
            return res.status(404).json({ message: 'Movie is already in watchlist' });
        }

        const newWatchlist = await Watchlist.create({ 
            tmdbId: tmdbId,
            posted: userid
        });

        user.watchlist.push(newWatchlist._id);
        await user.save();
        
        res.status(200).json({ message: 'Movie successfuly added to watchlist', newMovie: newWatchlist });

    } catch (e) {
        res.status(500).json({ message: 'Oops! Something went wrong', error: e });
    }
});

router.delete('/:id', async (req, res) => {
    const { 'id': tmdbId } = req.params;
    const { '_id': userid, watchlist } = req.session.user;

    try {
        const titleToDelete = await Watchlist.findOne({ tmdbId });
        
        watchlist.splice(watchlist.findIndex(itm => itm._id == titleToDelete._id), 1);

        await User.findByIdAndUpdate(userid, {
            $pull: {
                watchlist: titleToDelete._id
            }
        });
        
        res.status(200).json({ message: 'Successfuly removed from watchlist', movieId: titleToDelete._id });

    } catch (e) {
        res.status(500).json({ message: 'Oops! Something went wrong', error: e });
    }
});

module.exports = router;