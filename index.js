var express = require('express')
var server = express()
var bp = require('body-parser')
var DBConnect = require('./config/mlab.js')
var sessions = require('./auth/sessions')
var port = 3000

//route variables
var userRoutes = require('./auth/auth')
var commentRoutes = require('./server/routes/comment-routes')
// var userRoutes = require('./server/routes/user-routes')
var postRoutes = require('./server/routes/post-routes')
var viewRoutes = require('./server/routes/view-routes')

//register Middleware
server.use(express.static(__dirname + '/public'))
server.use(bp.json())
server.use(bp.urlencoded({extended: true}))
server.use(sessions)
///register routes
server.use(userRoutes)
server.use(viewRoutes)

server.use(Authenticate)
server.use(commentRoutes)
server.use(postRoutes)

function Authenticate(req, res, next) {
    if (!req.session.uid) {
        return res.status(401).send({ error: 'You must login to continue' })
    }
    next()
}




server.listen(port, function(){
    console.log('Server running on port: ', port)
})