const path = require('path');
const express = require('express');
const router = express.Router();
const User = require(path.resolve(__dirname, '../models/userModel'));
const Watchlist = require(path.resolve(__dirname, '../models/watchlistModel'));
const tmdb = require(path.resolve(__dirname, '../utils/tmdb'));
const { mapTitleList } = require(path.resolve(__dirname, '../utils/movieMapper'));
const catchAsync = require(path.resolve(__dirname, '../utils/catchAsync'));
const Mongoose = require('mongoose');
const ObjectId = Mongoose.Types.ObjectId;

router.get('/', catchAsync(async (req, res) => {
    const { userId } = req.session.user;
    const user = await User.findOne({ _id: userId }).populate('watchlist');

    const response = await Promise.all(
        user.watchlist.map(itm => tmdb.getTitleDetails(itm.mediaType, itm.tmdbId))
    );

    return res.render('titleList', {
        isAuth: req.isAuth,
        apiUrl: req.apiUrl,
        showTitleSearch: response.length == 0,
        showWatchlistButton: false,
        showWatchlistRemove: true,  
        titles: mapTitleList(response, user.watchlist)
    });
}));

router.post('/', catchAsync(async (req, res) => {
    const { tmdbId, mediaType } = req.body;
    const { userId } = req.session.user;
    const user = await User.findOne({ _id: userId }).populate({
        path: 'watchlist',
        match: { tmdbId }
    });

    if (user.watchlist.length > 0) {
        return res.status(404).json({ message: 'Title already exists in watchlist' });
    }

    let watchlistId;
    const watchlist = await Watchlist.findOne({ tmdbId });

    if (watchlist) {
        //~ document with matching tmdbId exists; update rather than create new
        await watchlist.updateOne({
            $push: {
                posted: new ObjectId(userId)
            }
        });

        watchlistId = watchlist._id;

    } else {
        //~ no document with matching tmdbId found, create new
        const newWatchlist = await Watchlist.create({
            tmdbId: tmdbId,
            mediaType: mediaType,
            posted: [new ObjectId(userId)]
        });

        watchlistId = newWatchlist._id;
    }
    //~ ------------------------------------------------------------
    //~     Mongoose's Documnet#updateOne method
    //~     masteringjs.io/tutorials/mongoose/update
    //~ ------------------------------------------------------------
    await user.updateOne({
        $push: {
            watchlist: new ObjectId(watchlistId)
        }
    });

    res.status(200).json({ message: 'Title successfuly added to watchlist' });
}));

router.delete('/', catchAsync(async (req, res) => {
    const { tmdbId } = req.body;
    const { userId } = req.session.user;
    
    const user = await User.findOne({ _id: userId }).populate({
        path: 'watchlist',
        match: { tmdbId }
    });

    if (user.watchlist.length == 0) {
        return res.status(404).json({ message: 'Title not found' });
    }

    //~ ------------------------------------------------------------
    //~     Mongoose's Documnet#updateOne method
    //~     masteringjs.io/tutorials/mongoose/update
    //~ ------------------------------------------------------------
    await Watchlist.updateOne({ tmdbId }, {
        $pull: {
            posted: new ObjectId(userId)
        }
    });

    await user.updateOne({
        $pull: {
            watchlist: user.watchlist[0]._id
        }
    });

    res.status(200).json({ message: 'Successfuly removed from watchlist ' });
}));

module.exports = router;