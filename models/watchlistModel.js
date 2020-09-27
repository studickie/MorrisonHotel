const mongoose = require('mongoose');

const WatchlistSchema = new mongoose.Schema({
    tmdbId: {
        type: String,
        required: true
    },
    mediaType: {
        type: String,
        required: true
    },
    posted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }]
});

module.exports = mongoose.model('Watchlist', WatchlistSchema);