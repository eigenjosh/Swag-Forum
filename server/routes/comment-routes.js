let router = require('express').Router()
let Comments = require('../models/comment')


router.get('/forum/posts/:id/comments', (req, res, next) => {
    Comments.find({})
        .then(comments => {
            res.send(comments)
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})

router.get('/forum/posts/:id/comments/:id', (req, res, next) => {
    Comments.findById(req.params.id)
        .then(comment => {
            res.send(comment)
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})

router.post('/forum/posts/:id/comments', (req, res, next) => {
    req.body.userId = req.session.uid
    req.body.postId = req.params.id
    Comments.create(req.body)
        .then(comment => {
            let response = {
                data: comment,
                message: 'Successfully created Comment!'
            }
            res.send(response)
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})


router.put('/forum/posts/:id/comments/:id', (req, res, next) => {
    var action = 'Update Comment'
    Comments.findByIdAndUpdate(req.params.id, req.body)
        .then(comment => {
            console.log(comment.userId.toString(), req.session.uid.toString())
            if (comment.userId.toString() == req.session.uid.toString()) {
                comment.update()
                res.send({ message: 'You\'ve updated your post!' })
            }
            next()
        })
        .catch(err => {
            res.status(400).send(handleResponse(action, null, err))
        })
})


router.delete('/forum/posts/:id/comments/:cid', (req, res, next) => {
    Comments.findOneAndRemove({ userId: req.session.uid, _id: req.params.cid })
        .then(comment => {
            res.send("I bet you a dollar, yo")
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
