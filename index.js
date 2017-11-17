var express = require('express')
var server = express()
var bp = require('body-parser')
var DBConnect = require('./config/mlab.js')
var port = 3000
a
//route variables
var commmentRoutes = require('./server/routes/comment-routes')
var userRoutes = require('./server/routes/user-routes')

//register Middleware
server.use(bp.json())
server.use(bp.urlencoded({extended: true}))

///register routes
server.use(postRoutes)
server.use(userRoutes)
server.use(commentRoutes)

server.listen(port, function(){
    console.log('Server running on port: ', port)
})