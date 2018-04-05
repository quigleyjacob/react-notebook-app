var db = require('../models');
var bcrypt = require('bcrypt');
const salt = 10;

exports.createUser = function(req, res){
  if (req.body.password !== req.body.passwordConf) {
    res.json({"message": "Passwords do not match"});
  } else {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      req.body.password = hash;
      db.User.create(req.body)
      .then(function(newUser){
          res.status(201).json({"message": "success"});
      })
      .catch(function(err){
          res.json({"message" : err});
      })
    });
  }
}

exports.loginUser = function(req, res) {
  db.User.findOne({email: req.body.email})
  .then(resp => {
    (resp !== null) ?
    bcrypt.compare(req.body.password, resp.password, function(err, response) {
      if(err) {
        res.json({"message": err});
      } else {
        if (response) {
          res.json({"message": "success", id: resp._id});
        } else {
          res.json({"message": "Incorrect password"});
        }
      }
    })
    : res.json({"message": "No user associated with that email"});
  })
}

exports.getUser = function(req, res){
   db.User.findById(req.params.userId)
   .then(function(foundUser){
       res.json(foundUser);
   })
   .catch(function(err){
       res.send(err);
   })
}

exports.updateUser =  function(req, res){
   db.User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true})
   .then(function(user){
       res.json(user);
   })
   .catch(function(err){
       res.send(err);
   })
}

module.exports = exports;
