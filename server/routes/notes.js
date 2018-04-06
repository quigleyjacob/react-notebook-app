var express = require('express');
var router = express.Router();
var db = require("../models");
var helpers = require("../helpers/notes");

router.route('/')
 .post(helpers.createNote)
 .get(helpers.getNotes)

router.route('/:noteId')
  .get(helpers.getNote)
  .put(helpers.updateNote)
  .delete(helpers.deleteNote)

module.exports = router;
