let router = require('express').Router()
let Posts = require('../models/post')

router.get('/forum/posts', (req, res, next) => {
    Posts.find({})
        .then(posts => {
            res.send(posts)
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})

router.get('/forum/posts/:id', (req, res, next) => {
    Posts.findById(req.params.id)
        .then(post => {
            res.send(post)
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})

router.post('/forum/posts', (req, res, next) => {
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
        .then(data => {
            res.send(handleResponse(action, data))
        })
        .catch(err => {
            res.status(400).send(handleResponse(action, null, err))
        })
})


router.delete('/forum/posts/:id', (req, res, next) => {

    Posts.findById(req.params.id)
        .then( post => {
            if(post.userId === req.session.uid){
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
