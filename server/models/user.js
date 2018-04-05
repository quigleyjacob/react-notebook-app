var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true,
      required: true,
      dropDups: true
    },
    password: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;
