var Note = require('../models/notes');
var errMsg ='';

var funGet = function (req, res) {
    Note.find((err, notes) => {
        if (err) {
            res.send(err);
            console.log('# err | get =>', err);
        }

        res.json(notes);
    });
};

var funGetById = function (req, res) {
    Note.findById(req.params.note_id, (err, note) => {
        if (err) {
            res.send(err);
            console.log('# err | getById =>', err);
        }

        res.json(note);
    });
}

var funPost = function (req, res) {
    var note = new Note();//new instance of model note
    note.text = req.body.text;
    note.title = req.body.title;
    note.createdAt = req.body.createdAt;
    note.lastModified = req.body.lastModified;
    note.isReminder = req.body.isReminder;
    note.reminderDeadline = req.body.reminderDeadline;

    if (isValid(note)) {
        //save note anch check for errors
        note.save((err) => {
            if (err) {
                res.send(err);
                console.log('# err | post =>', err);
            }

            res.send({ message: 'created' });
        });
    } else {
        res.send({message : errMsg});
    }


};

var funPut = function (req, res) {
    Note.findById(req.params.note_id, function (err, note) {
        if (err)
            res.send(err);
        note.text = req.body.text;
        note.title = req.body.title;
        note.createdAt = req.body.createdAt;
        note.lastModified = req.body.lastModified;
        note.isReminder = req.body.isReminder;
        note.reminderDeadline = req.body.reminderDeadline;

        note.save(function (err) {
            if (err) {
                res.send(err);
                console.log('# err | put =>', err);
            }

            res.send({ message: 'updated' });
        });
    })
}

var funDelete = function (req, res) {
    Note.remove({
        _id: req.params.note_id
    }, function (err, note) {
        if (err) {
            res.send(err);
            console.log('# err | delete =>', err);
        }

        res.json({ message: 'delete' });
    });
}

module.exports = function (app) {
    app.get('/api/note', funGet);
    app.get('/api/note/:note_id', funGetById);
    app.post('/api/note', funPost);
    app.put('/api/note/:note_id', funPut);
    app.delete('/api/note/:note_id', funDelete);
};

var isValid = function(note) {
    if(note.isReminder) {
        if(note.reminderDeadline) return true
        else {
            errMsg = 'Must have a deadline';
            return false;
        }
    }
}
