var mongoose = require('mongoose')

var schema = new mongoose.Schema({
    votes: { type: Number, default: 0 },
    mediaUrl: { type: String, required: true },
    postTitle: {type: String, required: true},
    createDate: {type: Number, required: true, default: Date.now()},
    
});

module.exports = mongoose.model('Post', schema)