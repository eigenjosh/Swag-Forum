var Comments = require('../models/comment')
var Users = require('../models/user')
var Posts = require('../models/post')
var router = require('express').Router()

router.get('/forum/view/posts', (req, res, next) => {
    var view = {}
    Posts.find({})
        .then(post => {
            view.posts = post
            res.send(view)
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})

router.get('/forum/view/posts/:id/comments', (req, res, next) => {
    var view = {}
    Posts.findById(req.params.id)
        .then(post => {
            Users.findById(post.userId, 'username')
                .then(user => {
                    post.userId = user
                    view.posts = post
                    Comments.find({ postId: post._id }).populate({
                        path: 'userId',
                        model: 'User',
                        select: { 'username': 1 },

                    })
                        .then(comments => {
                            var temp = []
                            for (comment in comments) {
                                Users.findById(comment.userId)
                            }
                            view.comments = comments
                            res.send(view)
                        })

                        .catch()
                })
        })
        .catch()
})





module.exports = router
