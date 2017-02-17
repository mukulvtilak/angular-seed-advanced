/**
 * Library Level Dependancies
 */
var express = require('express'),
	app = express(),
	server = require('http').createServer(app);
var path = require('path');
var bodyParser = require('body-parser');
var io = require('socket.io').listen(server);
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Bear = require('./models/bear');
mongoose.connect('mongodb://localhost:27017/test');


app.use(express.static(__dirname));
app.use('/node_modules', express.static(__dirname + '/../../node_modules'));
app.use(bodyParser.json());
// Use the body-parser package in our application
app.use(bodyParser.urlencoded({ extended: true }));

//Initial dummy route for testing
// http://localhost:4000/api
router.use((req,res,next) => {
	console.log('something happening');
	next();
});

router.get('/',(req,res) => {
	res.json({message:"You're running dangerously low on beer"});
	console.log('/api got hit');
	console.log('req : ', req);
});

// more routes for our API will happen here

router.route('/bears')
	.post((req,res)=>{
		var bear = new Bear();//new instance of model Bear
		bear.name = req.body.name;

		//save bear anch check for errors
		bear.save((err) => {
			if(err) {
					res.send(err);
					console.log('error =>', err);
				}
			
			res.send({message:'created'});
		})
	})
	.get((req,res) => {
		Bear.find((err, bears) => {
			if(err) {
				res.send(err);
				console.log('error => ', err);
			}

			res.json(bears);
		});
	});

router.route('/bears/:bear_id')
	.get((req, res) => {
		Bear.findById(req.params.bear_id, (err, bear) => {
			if(err) {
				res.send(err);
				console.log('error =>', err);
			}

			res.json(bear);
		});
	})
	.put(function(req, res) {

        // use our bear model to find the bear we want
        Bear.findById(req.params.bear_id, function(err, bear) {

            if (err)
                res.send(err);

            bear.name = req.body.name;  // update the bears info

            // save the bear
            bear.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Bear updated!' });
            });

        });
    })
	.delete((req, res) => {
		Bear.remove({
			_id: req.params.bear_id
		},(err, bear) => {
			if(err) {
				res.send(err);
				console.log('error =>', err);
			}
			res.json({message:'deleted'});
		});
	});


// API routes end

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api',router);


server.listen(process.env.PORT || 4000, function () {
	console.log('APP listening on port 4000!');
});

