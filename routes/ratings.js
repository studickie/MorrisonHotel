const path = require('path');
const express = require('express');
const router = express.Router();
const User = require(path.resolve(__dirname, '../models/userModel'));
const Rating = require(path.resolve(__dirname, '../models/ratingModel'));
const { getTitleDetails } = require(path.resolve(__dirname, "../utils/tmdb"));
const { mapTitleListWithRatings } = require(path.resolve(__dirname, "../utils/movieMapper"));
const catchAsync = require(path.resolve(__dirname, '../utils/catchAsync'));
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

router.get('/', catchAsync(async (req, res) => {
    const { userId } = req.session.user;

    const user = await User.findOne({ _id: userId}).populate('ratings');

    const response = await Promise.all(user.ratings.map(itm => {
        return getTitleDetails(itm.mediaType, itm.tmdbId);
    }));

    return res.render('titleList', {
        isAuth: req.isAuth,
        apiUrl: req.apiUrl,
        showTitleSearch: response.length == 0,
        showWatchlistButton: false,
        titles: mapTitleListWithRatings(response, user.ratings)
    });
}));

router.post('/', catchAsync(async (req, res) => {
    const { tmdbId, 'rating': userRating, mediaType } = req.body;
    const { userId } = req.session.user;

    const user = await User.findOne({ _id: userId }).populate({
        path: 'ratings', 
        match: { tmdbId }
    });
    
    let rating;
    if (user.ratings[0]) {
        //- update existing rating
        rating = await Rating.updateOne({_id: user.ratings[0]._id}, {
            rating: userRating
        });

    } else {
        //~ create new rating
        rating = await Rating.create({
            tmdbId: tmdbId,
            mediaType: mediaType,
            rating: userRating,
            posted: userId
        });

        //~ only push to user if new rating
        await user.updateOne({
            $push: {
                ratings: (new ObjectId(rating._id))
            }
        });
    }
    
    res.status(200). json({ message: 'Successfuly rated title', rating: rating });
}));

router.delete('/', catchAsync(async (req, res) => {
    const { tmdbId } = req.body;
    const { userId } = req.session.user;

    const user = await User.findOne({ _id: userId }).populate({
        path: 'ratings',
        match: { tmdbId }
    });

    if (!user.ratings) {
        res.status(404).json({ message: 'Requested title not found'});
    }

    await Rating.deleteOne({ _id: user.ratings[0]._id });

    //~ ------------------------------------------------------------
    //~     Mongoose's Documnet#updateOne method
    //~     masteringjs.io/tutorials/mongoose/update
    //~ ------------------------------------------------------------
    await user.updateOne({
        $pull: {
            ratings: new ObjectId(user.ratings[0]._id)
        }
    });

    res.status(200).json({ message: 'Rating successfuly removed'});
}));

module.exports = router;