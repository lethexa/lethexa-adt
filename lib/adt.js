var EventEmitter = require('events');
var util = require('util');



module.exports.Map = function() {
  EventEmitter.call(this);
  var entries = {};
  var self = this;

  this.put = function(key, entry) {
    self.emit('add', entry, key);
    entries[key] = entry;
  };

  this.remove = function(key) {
    if(entries[key] === undefined)
      return;
    var entry = entries[key];
    delete entries[key];
    self.emit('remove', entry, key);
    return entry;    
  };

  this.get = function(key) {   
    if(entries.hasOwnProperty(key)) {
      return entries[key];
    }
    else {
      return undefined;
    }
  };

  this.contains = function(key) {
    return self.get(key) !== undefined;
  };

  this.forEach = function(callback) {
    for(var key in entries) {
      if(entries.hasOwnProperty(key)) {
        callback(entries[key], key);
      }
    }
  };
};
util.inherits(module.exports.Map, EventEmitter);





module.exports.Stack = function() {
  EventEmitter.call(this);
  var items = [];
  var self = this;

  this.push = function(item) {
    self.emit('add', item);
    items.push(item);
  };
 
  this.pop = function() {
    var item = items.pop();
    self.emit('remove', item);
    return item;
  };

  this.forEach = function(callback) {
    return items.forEach(callback);
  };
 
  this.size = function() {
    return items.length;
  };
  
  this.isEmpty = function() {
    return items.length === 0;
  };

  this.clear = function() {
    items.forEach(function(item) {
      self.emit('remove', item);
    });
    items = [];
  };
};
util.inherits(module.exports.Stack, EventEmitter);




module.exports.Set = function() {
  EventEmitter.call(this);
  var models = [];
  var self = this;

  this.add = function(model) {
    var index = models.indexOf(model);
    if(index >= 0)
      return;
    models.push(model);
    self.emit('add', model);
  };
 
  this.remove = function(model) {
    var index = models.indexOf(model);
    if(index < 0)
      return;
    models.splice(index, 1);
    self.emit('remove', model);
  };

  this.contains = function(model) {
    return models.indexOf(model) >= 0;
  };

  this.forEach = function(callback) {
    return models.forEach(callback);
  };
 
  this.length = function() {
    return models.length;
  };
  
  this.isEmpty = function() {
    return models.length === 0;
  };

  this.clear = function() {
    models.forEach(function(item) {
      self.emit('remove', item);
    });
    models = [];
  };
};
util.inherits(module.exports.Set, EventEmitter);




