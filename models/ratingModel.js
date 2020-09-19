const mongoose = require('mongoose');

const options = {
    capped: {
        size: 1000,
        max: 50
    }
};

const RatingSchema = new mongoose.Schema({
    tmdbId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 10
    },
    posted: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, options);

module.exports = mongoose.model('Rating', RatingSchema);