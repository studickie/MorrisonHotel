const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    ratings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rating'
    }],
    watchlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Watchlist'
    }]
});

UserSchema.pre('save', async function(next) {
    if (!this.isNew) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 12);
    next();
});

UserSchema.methods.validatePassword = async function (password) {
    const match = await bcrypt.compare(password, this.password);

    if (match) {
        return true;
    } else {
        return false;
    }
}

module.exports = mongoose.model("User", UserSchema);