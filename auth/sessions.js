let session = require('express-session');
let MongoDBStore = require('connect-mongodb-session')(session);
var connectionString = "mongodb://jc2:yellowjacket@ds044689.mlab.com:44689/doppleganger"

let store = new MongoDBStore(
	{
		uri: connectionString,
		collection: 'Sessions'
	});

// Catch errors 
store.on('error', function (error) {
	console.error(error);
});

module.exports = session({
	secret: 'legendary bush hostages',
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week 
	},
	store: store,
	resave: true,
	saveUninitialized: true
})