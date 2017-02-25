var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    text : String,
    title : String,
    createdAt : String,
    lastModified : String
});

module.exports = mongoose.model('Note', NoteSchema);