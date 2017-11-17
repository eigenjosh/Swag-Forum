var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var schema = new mongoose.Schema({
    votes: { type: Number, default: 0 },
    body: { type: String, required: true },
    mediaUrl: { type: String },
    createDate: {type: Number, required: true, default: Date.now()},
    userId: { type: ObjectId, required: true, ref: 'User' },
    postId: { type: ObjectId, required: true, ref: 'Post' },
    
})

module.exports = mongoose.model('Comment', schema)