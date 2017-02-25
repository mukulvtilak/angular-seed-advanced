var Bear = require('../models/bear');

var funPost = function(req,res) {
        var bear = new Bear();//new instance of model Bear
        bear.name = req.body.name;

        //save bear anch check for errors
        bear.save((err) => {
            if(err) {
                    res.send(err);
                    console.log('error =>', err);
                }
            
            res.send({message:'created'});
        });
    };
var funGet = function(req,res) {
        Bear.find((err, bears) => {
            if(err) {
                res.send(err);
                console.log('error => ', err);
            }

            res.json(bears);
        });
    };

var funGetById = function(req, res) {
        Bear.findById(req.params.bear_id, (err, bear) => {
            if(err) {
                res.send(err);
                console.log('error =>', err);
            }

            res.json(bear);
        });
    }

var funPut = function(req, res) {

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
    }

var funDelete = function (req, res) {
        Bear.remove({
            _id: req.params.bear_id
        },(err, bear) => {
            if(err) {
                res.send(err);
                console.log('error =>', err);
            }
            res.json({message:'deleted'});
        });
}

module.exports = function(app) {
    app.get('/api/bears', funGet);
    app.get('/api/bears/:bear_id', funGetById);
    app.post('/api/bears', funPost);
    app.put('/api/bears/:bear_id', funPut);
    app.delete('/api/bears/:bear_id', funDelete);
};
