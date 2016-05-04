/* global exports */

(function (exports) {
  'use strict';

  var EventProvider = function() {
    var self = this;
    var nameToListeners = {};

    var getListenersByName = function(name) {
      return nameToListeners[name];
    };

    this.on = function(name, listener) {
      self.addListener(name, listener);
    };

    this.addListener = function(name, listener) {
      var listeners = nameToListeners[name];
      if(listeners === undefined) {
        listeners = [];
        nameToListeners[name] = listeners;
      }
      listeners.push(listener);
   };

    this.removeListener = function(name, listener) {
      var listeners = nameToListeners[name];
      if(listeners === undefined)
        return;
      var index = listeners.indexOf(listener);
      if(index < 0)
        return;
      listeners.splice(index, 1);
      if(listeners.length === 0) {
        delete nameToListeners[name];
      }
    };

    this.emit = function(name) {
      var listeners = nameToListeners[name];
      if(listeners === undefined)
        return;
      var args = [].slice.call(arguments, 1);
      listeners.forEach(function(listener) {
        listener.apply(this, args);
      });
    };
  };



  exports.Map = function() {
    EventProvider.call(this);
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
  exports.Map.prototype = new EventProvider();





  exports.Stack = function() {
    EventProvider.call(this);
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
  exports.Stack.prototype = new EventProvider();




  exports.Set = function() {
    EventProvider.call(this);
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
  exports.Set.prototype = new EventProvider();




  exports.Node = function() {
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
    };

    this.removeChild = function(child) {
      var index = children.indexOf(child);
      if(index < 0)
        return;
      children.splice(index, 1);
      child.setParent(undefined);
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



  exports.Tree = function() {
    EventProvider.call(this);
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
  exports.Tree.prototype = new EventProvider();


})(typeof exports === 'undefined' ? this.adt = {} : exports);


