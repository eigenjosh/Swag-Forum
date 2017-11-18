let router = require('express').Router()
var Comments = require('../models/comment')
let Posts = require('../models/post')
var Users = require('../models/user')

router.get('/forum/posts', (req, res, next) => {
    Posts.find({})
        .then(posts => {
            Users.findById(posts.userId, 'username')
            .then(users =>{
                res.send(posts)
            })
        
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})

// router.get('/forum/posts/:id', (req, res, next) => {
//     Posts.findById(req.params.id)
//         .then(post => {
//             res.send(post)
//         })
//         .catch(err => {
//             res.status(400).send({ Error: err })
//         })
// })
// GET COMMENTS BY POSTID
// router.get('/forum/posts/:id/comments', (req, res, next) => {
//     Comments.find({postId: req.params.id})
//         .then(comments => {
//             res.send(comments)
//         })
//         .catch(err => {
//             res.status(400).send({ Error: err })
//         })
// })

router.post('/forum/posts', (req, res, next) => {
    req.body.userId = req.session.uid
    Posts.create(req.body)
        .then(post => {
            let response = {
                data: post,
                message: 'Successfully created Post!'
            }
            res.send(response)
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})


router.put('/forum/posts/:id', (req, res, next) => {
    var action = 'Update Post'
    Posts.findByIdAndUpdate(req.params.id, req.body)
        .then(post => {
            console.log(post.userId.toString(), req.session.uid.toString())
            if (post.userId.toString() == req.session.uid.toString()) {
                post.update()
                res.send({ message: 'You\'ve updated your post!' })
            }
            next()
        })
        .catch(err => {
            res.status(400).send(handleResponse(action, null, err))
        })
})

router.get('/forum/posts/:id/comments', (req, res, next) => {
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
                        select: { 'username': 1 }

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

router.delete('/forum/posts/:id', (req, res, next) => {

    Posts.findById(req.params.id)
        .then(post => {
            console.log(post.userId.toString(), req.session.uid.toString())
            if (post.userId.toString() == req.session.uid.toString()) {
                post.remove()
                res.send({ message: 'So much for that post' })
            }
            next()
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})

function handleResponse(action, data, error) {
    var response = {
        message: action,
        data: data
    }
    if (error) {
        response.error = error
    }
    return response
}










module.exports = router
