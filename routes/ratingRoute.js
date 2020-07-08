const express = require('express');
const router = express.Router();
const Rating = require('../models/ratingModel');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, async (req, res) => {
    try {
        let ratingToReturn;
        const ratingExists = await Rating.find({ tmdbId: req.body.tmdbId });

        if (ratingExists.length > 0) {
            //- update existing rating
            ratingToReturn = await Rating.findOneAndUpdate({ tmdbId: req.body.tmdbId }, { rating: req.body.rating });
        } else {
            //- create new rating
            const newRating = new Rating({
                tmdbId: req.body.tmdbId,
                rating: req.body.rating
            });

            ratingToReturn = await newRating.save();
        }

        res.status(200). json({ message: 'Successfuly rated title', rating: ratingToReturn });
        
    } catch (e) {
        res.status(500).json({ message: "Oops! Something went wrong", error: e });
    }
});

module.exports = router;