var db = require('../models');

exports.getNotebooks = function(req, res){
    db.Notebook.find()
    .then(function(notebooks){
        let myNotebooks = notebooks.filter(notebook => notebook.userId === req.query.q);
        res.json(myNotebooks);
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.createNotebook = function(req, res){
  db.Notebook.create(req.body)
  .then(function(newNotebook){
      res.status(201).json(newNotebook);
  })
  .catch(function(err){
      res.send(err);
  })
}

exports.getNotebook = function(req, res){
   db.Notebook.findById(req.params.notebookId)
   .then(function(foundNotebook){
       res.json(foundNotebook);
   })
   .catch(function(err){
       res.send(err);
   })
}

exports.updateNotebook =  function(req, res){
   db.Notebook.findOneAndUpdate({_id: req.params.notebookId}, req.body, {new: true})
   .then(function(notebook){
       res.json(notebook);
   })
   .catch(function(err){
       res.send(err);
   })
}

exports.deleteNotebook = function(req, res){
   db.Notebook.remove({_id: req.params.notebookId})
   .then(function(){
       res.json({message: 'We deleted it!'});
   })
   .catch(function(err){
       res.json({message: err});
   })
}

module.exports = exports;
