var express = require('express');
var router = express.Router();
var db = require("../models");
var helpers = require("../helpers/users");

router.route('/')
 .post(helpers.createUser)

router.route('/:userId')
  .get(helpers.getUser)
  .put(helpers.updateUser)

module.exports = router;
