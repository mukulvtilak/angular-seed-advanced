/**
 * Library Level Dependancies
 */
var express = require('express'),
	app = express(),
	server = require('http').createServer(app);
var path = require('path');
var bodyParser = require('body-parser');
var io = require('socket.io').listen(server);
// var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Bear = require('./models/bear');

app.use(express.static(__dirname));
app.use('/node_modules', express.static(__dirname + '/../../node_modules'));
app.use(bodyParser.json());
// Use the body-parser package in our application
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/test');

//Middleware for validation etc
// http://localhost:4000/api
app.use((req,res,next) => {
	console.log('something happening');
	console.log('mid-ware | req => ', req.body);
	console.log('mid-ware | res => ', res.body);
	next();
});

//API routes BEGIN

require('./apis/bearApi')(app);
require('./apis/noteApi')(app);

app.get('/',(req,res) => {
	res.json({message:"You're running dangerously low on beer"});
	console.log('/ got hit');
	// console.log('req : ', req);
});

// API routes END



server.listen(process.env.PORT || 4000, function () {
	console.log('APP listening on port 4000!');
});

