var db = require('../models');

exports.getNotes = function(req, res){
  // console.log(req.query.q);
    db.Note.find()
    .then(function(notes){
        let myNotes = notes.filter(note => note.notebookId === req.query.q);
        res.json(myNotes);
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.createNote = function(req, res){
  db.Note.create(req.body)
  .then(function(newNote){
      res.status(201).json(newNote);
  })
  .catch(function(err){
      res.send(err);
  })
}

exports.getNote = function(req, res){
   db.Note.findById(req.params.noteId)
   .then(function(foundNote){
       res.json(foundNote);
   })
   .catch(function(err){
       res.send(err);
   })
}

exports.updateNote =  function(req, res){
   db.Note.findOneAndUpdate({_id: req.params.noteId}, req.body, {new: true})
   .then(function(note){
       res.json(note);
   })
   .catch(function(err){
       res.send(err);
   })
}

exports.deleteNote = function(req, res){
   db.Note.remove({_id: req.params.noteId})
   .then(function(){
       res.json({message: 'We deleted it!'});
   })
   .catch(function(err){
       res.send(err);
   })
}

module.exports = exports;
