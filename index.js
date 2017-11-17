var express = require('express')
var server = express()
var bp = require('body-parser')
var DBConnect = require('./config/mlab.js')
var sessions = require('./auth/sessions')
var port = 3000

//route variables
var commmentRoutes = require('./server/routes/comment-routes')
var userRoutes = require('./server/routes/user-routes')

//register Middleware
server.use(bp.json())
server.use(bp.urlencoded({extended: true}))
server.use(sessions)
///register routes
server.use(getViewRoutes)

server.use(Authenticate)

server.use(commentRoutes)
server.use(postRoutes)
server.use(userRoutes)

server.listen(port, function(){
    console.log('Server running on port: ', port)
})