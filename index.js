/* global module, __dirname */

/**
 * Provides abstract data types like sets,lists and trees.
 * @module lethexa-adt
 */
var adt = require('./lib/adt');
var tree = require('./lib/tree')

module.exports.makeSet = function() {
  return new adt.Set();
};

module.exports.makeStack = function() {
  return new adt.Stack();
};

module.exports.makeMap = function() {
  return new adt.Map();
};

module.exports.Node = tree.Node;

module.exports.makeTree = function() {
  return new tree.Tree();
};
