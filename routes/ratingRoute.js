const express = require('express');
const router = express.Router();
const Rating = require('../models/ratingModel');
const auth = require('../middleware/authMiddleware');
const User = require('../models/userModel');

router.post('/', auth, async (req, res) => {
    const { tmdbId, 'rating': userRating } = req.body;
    const { '_id': userid, ratings } = req.session.user;

    try {
        const user = await User.findOne({ _id: userid }).populate('ratings');
        let rating;

        if (user.ratings.findIndex(itm => itm.tmdbId == tmdbId) != -1) {
            //- update existing rating
            rating = await Rating.findOneAndUpdate({ tmdbId }, { rating: userRating });
        } else {
            //- create new rating
            rating = await Rating.create({
                tmdbId: tmdbId,
                rating: userRating,
                posted: userid
            });
        }

        ratings.push(rating);
        
        await User.findByIdAndUpdate(userid, {
            $push: {
                ratings: rating._id
            }
        });
        
        res.status(200). json({ message: 'Successfuly rated title', rating: rating });
        
    } catch (e) {
        res.status(500).json({ message: "Oops! Something went wrong", error: e });
    }
});

module.exports = router;