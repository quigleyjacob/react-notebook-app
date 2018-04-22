var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/notebook');

mongoose.Promise = Promise;

module.exports.User = require("./user");
module.exports.Notebook = require("./notebook");
module.exports.Note = require("./note");
module.exports.Todo = require("./todo");
