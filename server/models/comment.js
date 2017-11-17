var mongoose = require('mongoose')

var schema = new mongoose.Schema({
    votes: { type: Number, default: 0 },
    body: { type: String, required: true },
    mediaUrl: { type: String },
    createDate: {type: Number, required: true, default: Date.now()},
    
})

module.exports = mongoose.model('Comment', schema)