var db = require('../models');
var bcrypt = require('bcrypt');
const salt = 10;

exports.createUser = function(req, res){
  let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (req.body.email.search(emailRegex) < 0) {
    res.json({"message": "Not a valid email address"})
  }
  else if (req.body.password !== req.body.passwordConf) {
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
  let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (req.body.email.search(emailRegex) < 0) {
    res.json({"message": "Not a valid email address"})
  }
  db.User.findOne({email: req.body.email})
  .then(resp => {
    (resp !== null) ?
    bcrypt.compare(req.body.password, resp.password, function(err, response) {
      if(err) {
        res.json({"message": err});
      } else {
        if (response) {
          res.json({"message": "success", id: resp._id, name: resp.firstName});
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
    if(req.body.newPassword) {
      bcrypt.hash(req.body.newPassword, salt, function(err, hash) {
        req.body.password = hash;
        db.User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true})
        .then(function(user){
            res.json({"message": "success"});
        })
        .catch(function(err){
            res.send(err);
        })
      })
    } else {
      db.User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true})
      .then(function(user){
          res.json(user);
      })
      .catch(function(err){
          res.send(err);
      })
    }
}

exports.confirmUser = function(req, res) {
  db.User.findById(req.body.userId)
  .then(function(user) {
    if(user !== null) {
      bcrypt.compare(req.body.oldPassword, user.password, function(err, resp) {
        if (err) {
          res.json({"message": err})
        } else {
          if (resp) {
            res.json({"message": "sucess"});
          } else {
            res.json({"message": "You did not enter the correct password"});
          }
        }
      })
    } else {
      res.json({"message": "User not found"});
    }
  })
}

module.exports = exports;
