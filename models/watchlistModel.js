const mongoose = require('mongoose');

const options = {
    capped: {
        size: 1000,
        max: 50
    }
};

const WatchlistSchema = new mongoose.Schema({
    tmdbId: {
        type: String,
        required: true
    },
    posted: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, options);


WatchlistSchema.add({ mediaType: 'string' });

module.exports = mongoose.model('Watchlist', WatchlistSchema);