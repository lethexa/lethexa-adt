var EventEmitter = require('events');
var util = require('util');



module.exports.Node = function(tree) {
  var self = this;
  var parent;
  var children = [];

  this.setParent = function(p) {
    parent = p;
  };

  this.getParent = function() {
    return parent;
  };

  this.addChild = function(child) {
    var index = children.indexOf(child);
    if(index >= 0)
      return;
    children.push(child);
    child.setParent(self);
    tree.signalSubTreeAdded(self);
  };

  this.removeChild = function(child) {
    var index = children.indexOf(child);
    if(index < 0)
      return;
    children.splice(index, 1);
    child.setParent(undefined);
    tree.signalSubTreeRemoved(self);
  };

  this.getChildren = function() {
    return children;
  };

  this.preOrderIterate = function(callback) {
    callback(self);
    children.forEach(function(child) {
      child.preOrderIterate(callback);
    });
  };
 
  this.postOrderIterate = function(callback) {
    children.forEach(function(child) {
      child.postOrderIterate(callback);
    });
    callback(self);
  };
};



module.exports.Tree = function() {
  EventEmitter.call(this);
  var self = this;

  this.signalSubTreeAdded = function(child) {
    if(child === undefined)
      return;
    self.emit('add', child);
    child.getChildren().forEach(function(subChild) {
      self.signalSubTreeAdded(subChild);
    });
  };

  this.signalSubTreeRemoved = function(child) {
    if(child === undefined)
      return;
    child.getChildren().forEach(function(subChild) {
      self.signalSubTreeRemoved(subChild);
    });
    self.emit('remove', child);
  };
};
util.inherits(module.exports.Tree, EventEmitter);





