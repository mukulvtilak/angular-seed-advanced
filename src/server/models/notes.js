var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    text : String,
    title : String,
    createdAt : String,             //  Change to DateTime
    lastModified : String,          //  Change to DateTime
    isReminder : Boolean,
    reminderDeadline : String       //  Change to DateTime
});

module.exports = mongoose.model('Note', NoteSchema);
