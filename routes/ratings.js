const express = require('express');
const router = express.Router();
const Rating = require('../models/ratingModel');
const User = require('../models/userModel');

router.post('/', async (req, res) => {
    const { tmdbId, 'rating': userRating } = req.body;
    const { '_id': userid } = req.session.user;

    try {
        const user = await User.findOne({ _id: userid }).populate({
            path: 'ratings', 
            match: { tmdbId }
        });
        
        let rating;
        if (user.ratings[0]) {
            //- update existing rating
            rating = await Rating.findById(user.ratings[0]._id);
            rating.rating = userRating;
            await rating.save();

        } else {
            //~ create new rating
            rating = await Rating.create({
                tmdbId: tmdbId,
                rating: userRating,
                posted: userid
            });

            //~ only push to user if new rating
            user.ratings.push(rating._id);
            await user.save();
        }
        
        res.status(200). json({ message: 'Successfuly rated title', rating: rating });
        
    } catch (e) {
        res.status(500).json({ message: "Oops! Something went wrong", error: e });
    }
});

module.exports = router;