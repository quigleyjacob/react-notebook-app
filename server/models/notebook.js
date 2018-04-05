var mongoose = require('mongoose');

var notebookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    body: {
      type: String,
      default: 'Begin typing here...',
      last_updated: {
        type: Date,
        default: Date.now
      }
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

var Notebook = mongoose.model('Notebook', notebookSchema);

module.exports = Notebook;
