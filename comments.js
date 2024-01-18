// Create web server application using express
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// Set up database connection
var db = require('./db');
db.connect();

// Set up session
var session = require('express-session');
var sessionOptions = {
	secret: 'secret for signing session id',
	saveUninitialized: false,
	resave: false
};
app.use(session(sessionOptions));

// Set up template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set up static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up cookie parser
app.use(cookieParser());

// Set up routes
var index = require('./routes/index');
var users = require('./routes/users');
var comments = require('./routes/comments');
app.use('/', index);
app.use('/users', users);
app.use('/comments', comments);

// Handle 404
app.use(function(req, res) {
	res.status(400);
	res.render('404');
});

// Handle 500
app.use(function(error, req, res, next) {
	res.status(500);
	res.render('500');
});

// Start web server
var port = process.env.PORT || 8080;
app.listen(port, function() {
	console.log('Server running at http://localhost:' + port + '/');
});
