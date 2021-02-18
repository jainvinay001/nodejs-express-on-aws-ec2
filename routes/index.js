/**
 * Module dependencies.
 */
var Strategy = require('./strategy')
var express = require('express');
var router = express.Router();
var express = require('express');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * Expose `Strategy` directly from package.
 */
module.exports = Strategy

/**
 * Export constructors.
 */
module.exports.Strategy = Strategy
module.exports = router;
