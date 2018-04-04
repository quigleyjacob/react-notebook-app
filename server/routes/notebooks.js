var express = require('express');
var router = express.Router();
var db = require("../models");
var helpers = require("../helpers/notebooks");

router.route('/')
 .get(helpers.getNotebooks)
 .post(helpers.createNotebook)

router.route('/:notebookId')
  .get(helpers.getNotebook)
  .delete(helpers.deleteNotebook)

module.exports = router;
