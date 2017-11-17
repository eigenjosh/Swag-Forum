var mongoose = require('mongoose')
var connectionString = "mongodb://jc2:yellowjacket@ds044689.mlab.com:44689/doppleganger"
var connection = mongoose.connection




mongoose.connect(connectionString, {
    useMongoClient: true,
    keepAlive: {socketOptions: {keepAlive: 300000, connectionTimeoutMS: 30000}}
})

connection.on('error', console.error.bind(console, 'connection error: '))

connection.once('open', ()=>{
    console.log('Swag up, homie')
})