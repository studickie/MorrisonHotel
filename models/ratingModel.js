const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    tmdbId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    mediaType: {
        type: String,
        required: true
    },
    posted: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Rating', RatingSchema);