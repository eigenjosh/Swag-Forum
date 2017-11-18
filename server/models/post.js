var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var schema = new mongoose.Schema({
    votes: { type: Number, default: 0 },
    mediaUrl: { type: String, required: true },
    postTitle: { type: String, required: true },
    createDate: { type: String, required: true },
    userId: { type: ObjectId, required: true, ref: 'User' }

});

module.exports = mongoose.model('Post', schema)