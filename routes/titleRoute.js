const express = require('express');
const router = express.Router();
const tmdb = require('../utils/tmdb');
const movieMapper = require('../utils/movieMapper');
const User = require('../models/userModel');

router.get('/:id', async (req, res) => {
    const { 'id': tmdbId } = req.params;
    
    try {
        let titleDetails, mappedDetails;
        if (req.session.user) {
            const { '_id': userid } = req.session.user;
            
            titleDetails = await Promise.all([
                tmdb.getTitleDetails(tmdbId),
                tmdb.getTitleCredits(tmdbId),
                //! something is wrong with these queries, use watchlist, rating models instead?    
                User.findOne({ _id: userid }).populate({
                    path: 'watchlist',
                    match: { tmdbId }
                }),
                User.findOne({ _id: userid }).populate({
                    path: 'ratings',
                    match: { tmdbId },
                    select: 'rating'
                })  
            ]);

            // mappedDetails = movieMapper.mapTitleDetails(true, Object.assign({}, titleDetails[0], titleDetails[1]), 
            //     titleDetails[2].watchlist.length > 0, titleDetails[3].ratings[0].rating);
                
        } else {
            titleDetails = await Promise.all([
                tmdb.getTitleDetails(tmdbId),
                tmdb.getTitleCredits(tmdbId)   
            ]);

            mappedDetails = movieMapper.mapTitleDetails(false, Object.assign({}, titleDetails[0], titleDetails[1]));
        }
        console.log(titleDetails);
        //res.render('title', { details: mappedDetails });
        res.json(titleDetails);
    } catch (e) {
        return res.status(500).json({ message: 'Oops! Something went wrong', error: e });
    }
})

module.exports = router;