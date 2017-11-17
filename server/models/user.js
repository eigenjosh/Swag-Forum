var mongoose = require('mongoose')

var schema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    createDate: {type: Number, required: true, default: Date.now()},
    avatar: {type: String, default: '//placehold.it/200x200'}
});

module.exports = mongoose.model('User', schema)