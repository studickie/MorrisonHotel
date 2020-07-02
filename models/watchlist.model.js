const mongoose = require('mongoose');

const WatchilistSchema = new mongoose.Schema({
    tmdbId: {
        type: String,
        required: true,
        unique: true
    }
}, {
    capped: true,
    size: 4000,
    max: 25
});

module.exports = mongoose.model('Watchlist', WatchilistSchema);