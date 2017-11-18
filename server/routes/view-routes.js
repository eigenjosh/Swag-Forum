var Comments = require('../models/comment')
var Posts = require('../models/post')
var router = require('express').Router()

router.get('/forum/view/posts', (req, res, next) => {
    var view = {}
    Posts.find({})
        .then(post => {
            post.userId = null
            delete post.userId
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
            view.posts = post
            Comments.find({ postId: req.params.id })
                .then(comments => {
                    view.comments = comments
                    res.send(view)
                })

                .catch()
        })
        .catch()
})





module.exports = router
