var Note = require('../models/notes');

var funGet = function (req, res) {
    Note.find((err, notes) => {
            if(err) {
                res.send(err);
                console.log('error => ', err);
            }

            res.json(notes);
        });
};

var funGetById = function () {}

var funPost = function (req, res) {
    var note = new Note();//new instance of model note
    note.text = req.body.text;
    note.title = req.body.title;
    note.createdAt = req.body.createdAt;
    note.lastModified = req.body.lastModified;

    //save note anch check for errors
    note.save((err) => {
        if(err) {
                res.send(err);
                console.log('error =>', err);
            }
        
        res.send({message:'created'});
    });
};

var funPut = function () {}

var funDelete = function () {}

module.exports = function(app) {
    app.get('/api/note', funGet);
    app.get('/api/note/:note_id', funGetById);
    app.post('/api/note', funPost);
    app.put('/api/note/:note_id', funPut);
    app.delete('/api/note/:note_id', funDelete);
};

