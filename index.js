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

module.exports.makeMap = function() {
  return new adt.Map();
};

module.exports.Node = tree.Node;

module.exports.makeTree = function() {
  return new adt.Tree();
};


module.exports.Set = adt.Set;
module.exports.Stack = adt.Stack;
module.exports.Map = adt.Map;
module.exports.Node = adt.Node;
module.exports.Tree = adt.Tree;



