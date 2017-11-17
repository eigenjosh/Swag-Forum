var mongoose = require('mongoose')

var schema = new mongoose.Schema({
    votes: { type: Number, default: 0 },
    body: { type: String, required: true },
    mediaUrl: { type: String }
})

module.exports = mongoose.model('Comment', schema)