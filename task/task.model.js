const mongoose = require('mongoose')
const Schema = mongoose.Schema

var taskSchema = new Schema({
    description: String,
    date: {
        type: Date,
        default: Date.now
    },
    isComplete: Boolean
})

module.exports = mongoose.model('Task', taskSchema)