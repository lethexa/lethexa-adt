/* global module, __dirname */

/**
 * Provides abstract data types like sets,lists and trees.
 * @module lethexa-adt
 */
var adt = require('./lib/adt');

module.exports.makeSet = function() {
  return new adt.Set();
};

module.exports.makeStack = function() {
  return new adt.Stack();
};

