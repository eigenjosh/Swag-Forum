let router = require('express').Router()
let Comments = require('../models/comment')


router.get('/forum/comments', (req, res, next) => {
    Comments.find({})
        .then(comments => {
            res.send(comments)
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})

router.get('/forum/comments/:id', (req, res, next) => {
    Comments.findById(req.params.id)
        .then(comment => {
            res.send(comment)
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})

router.comment('/forum/comments', (req, res, next) => {
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


router.put('/forum/comments/:id', (req, res, next) => {
    var action = 'Update Comment'
    Comments.findByIdAndUpdate(req.params.id, req.body)
        .then(data => {
            res.send(handleResponse(action, data))
        })
        .catch(err => {
            res.status(400).send(handleResponse(action, null, err))
        })
})


router.delete('/forum/comments/:id', (req, res, next) => {
    Comments.findByIdAndRemove(req.params.id)
        .then(() => {
            res.send({ message: 'So much for that comment' })
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
