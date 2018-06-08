var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    name: {
        type: String,
        required: "Name cannot be blank",
        trim: true
    },
    note: {
        type: String,
        required: "Note cannot be blank",
        trim: true
    }
})

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;

