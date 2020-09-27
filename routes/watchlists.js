const express = require('express');
const router = express.Router();
const Watchlist = require('../models/watchlistModel');
const tmdb = require('../utils/tmdb');
const { mapTitleList } = require('../utils/movieMapper');
const User = require('../models/userModel');
const Mongoose = require('mongoose');
const ObjectId = Mongoose.Types.ObjectId;

router.get('/', async (req, res) => {
    const { userId } = req.session.user;

    try {
        const user = await User.findOne({ _id: userId }).populate('watchlist');

        const response = await Promise.all(
            user.watchlist.map(itm => tmdb.getTitleDetails(itm.mediaType, itm.tmdbId))
        );

        return res.render('watchlist', {
            isAuth: req.isAuth,
            titles: mapTitleList(response, user.watchlist)
        });

    } catch (e) {
        res.status(500).json({ message: "Oops! Something went wrong", error: e });
    }
});

router.post('/', async (req, res) => {
    const { tmdbId, mediaType } = req.body;
    const { userId } = req.session.user;

    try {
        const user = await User.findOne({ _id: userId }).populate({
            path: 'watchlist',
            match: { tmdbId }
        });

        if (user.watchlist.length > 0) {
            return res.status(404).json({ message: 'Title already exists in watchlist' });
        }

        const watchlist = await Watchlist.findOne({ tmdbId });

        if (watchlist) {
            await watchlist.updateOne({
                $push: {
                    posted: new ObjectId(userId)
                }
            });
            
            await user.updateOne({
                $push: {
                    watchlist: new ObjectId(watchlist._id)
                }
            });
            
        } else {
            const newWatchlist = await Watchlist.create({
                tmdbId: tmdbId,
                mediaType: mediaType,
                posted: [ new ObjectId(userId) ]
            });
            
            await user.updateOne({
                $push: {
                    watchlist: new ObjectId(newWatchlist._id)
                }
            });
        }

        res.status(200).json({ message: 'Title successfuly added to watchlist' });


    } catch (e) {
        res.status(500).json({ message: 'Oops! Something went wrong', error: e });
    }
});

router.delete('/', async (req, res) => {
    const { tmdbId } = req.body;
    const { userId } = req.session.user;
    
    try {
        const user = await User.findOne({ _id: userId }).populate({
            path: 'watchlist',
            match: { tmdbId }
        });

        if (user.watchlist.length == 0) {
            return res.status(404).json({ message: 'Title not found' });
        }

        await Watchlist.updateOne({ tmdbId }, {
            $pull: {
                posted: new ObjectId(userId )
            }
        });

        await user.updateOne({
            $pull: {
                watchlist: user.watchlist[0]._id
            }
        })
        
        res.status(200).json({ message: 'Successfuly removed from watchlist ' });

    } catch (e) {
        res.status(500).json({ message: 'Error', e });
    }
});

module.exports = router;