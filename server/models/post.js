var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
let Comments = require('./comment')

var schema = new mongoose.Schema({
    votes: { type: Number, default: 0 },
    mediaUrl: { type: String, required: true },
    postTitle: { type: String, required: true },
    createDate: { type: String },
    userId: { type: ObjectId, required: true, ref: 'User' }

});
schema.pre('remove', function (next) {
    Comments.findOne({ postId: this._id }, function (err, customer) {
        customer.remove();
    })
})
module.exports = mongoose.model('Post', schema)