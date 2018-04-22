var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    authorId: {
      type: String,
      required: true
    }
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
