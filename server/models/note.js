var mongoose = require('mongoose');

var noteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    body: {
      type: String,
      default: "Begin typing here...",
      required: true
    },
    notebookId: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
});

var Note = mongoose.model('Note', noteSchema);

module.exports = Note;
