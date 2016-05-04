var assert = require('assert');
var adt = require((process.env.APP_DIR_FOR_CODE_COVERAGE || '../lib/') + 'adt.js');


describe('Stack', function () {
  var TestItem = function(name) {
    this.name = name;
  };

  describe('when children are created in the stack', function () {
    it('a sequence of itens is added', function () {
      var item3 = new TestItem('N3');
      var item2 = new TestItem('N2');
      var item1 = new TestItem('N1');
      var theStack = new adt.Stack();
      
      theStack.push(item1);
      theStack.push(item2);
      theStack.push(item3);

      assert.equal(item3, theStack.pop());
      assert.equal(item2, theStack.pop());
      assert.equal(item1, theStack.pop());
    });
  });

  describe('when an entry is added to a stack', function () {
    it('the value is in the parameters of the event ', function () {
      var item1 = new TestItem('N1');
      var theMap = new adt.Stack();
      var addedElement = undefined;
      var addedKey = undefined;

      theMap.on('add', function(value) {
        addedElement = value;
      });
      theMap.push(item1);

      assert.equal(item1, addedElement);
    });
  });

});



describe('Map', function () {
  var TestItem = function(name) {
    this.name = name;
  };

  describe('when an entry is added to a map', function () {
    it('the added entry can be found', function () {
      var item = new TestItem('N1');
      var theMap = new adt.Map();
      
      theMap.put('test', item);

      assert.equal(item, theMap.get('test'));
    });
  });

  describe('when two entries are added to a map', function () {
    it('they are found in a loop', function () {
      var item1 = new TestItem('N1');
      var item2 = new TestItem('N2');
      var theMap = new adt.Map();
      
      theMap.put('A', item1);
      theMap.put('B', item2);

      var found1 = false;
      var found2 = false;
      theMap.forEach(function(entry, key) {
        if(entry === item1) found1 = true;
        if(entry === item2) found2 = true;
      });
      assert.equal(true, found1);
      assert.equal(true, found2);
    });
  });

  describe('when two entries are added to a map', function () {
    it('they are found via contains ', function () {
      var item1 = new TestItem('N1');
      var item2 = new TestItem('N2');
      var theMap = new adt.Map();
      
      theMap.put('A', item1);
      theMap.put('B', item2);

      assert.equal(true, theMap.contains('A'));
      assert.equal(true, theMap.contains('B'));
      assert.equal(false, theMap.contains('C'));
    });
  });

  describe('when an entry is added to a map', function () {
    it('an event is emitted ', function () {
      var item1 = new TestItem('N1');
      var theMap = new adt.Map();
      var eventEmitted = false;
      var addedElement = undefined;

      theMap.on('add', function(value) {
        eventEmitted = true;
      });
      theMap.put('A', item1);

      assert.equal(true, eventEmitted);
    });
  });

  describe('when an entry is added to a map', function () {
    it('the value is in the parameters of the event ', function () {
      var item1 = new TestItem('N1');
      var theMap = new adt.Map();
      var addedElement = undefined;
      var addedKey = undefined;

      theMap.on('add', function(value, key) {
        addedElement = value;
        addedKey = key;
      });
      theMap.put('A', item1);

      assert.equal('A', addedKey);
      assert.equal(item1, addedElement);
    });
  });

  describe('when an entry is removed from a map', function () {
    it('the value is in the parameters of the event ', function () {
      var item1 = new TestItem('N1');
      var theMap = new adt.Map();
      var removedElement = undefined;
      var removedKey = undefined;

      theMap.put('A', item1);
      theMap.on('remove', function(value, key) {
        removedElement = value;
        removedKey = key;
      });
      theMap.remove('A');

      assert.equal('A', removedKey);
      assert.equal(item1, removedElement);
    });
  });

});



describe('Tree', function () {
  var TestNode = function(name, children) {
    this.name = name;
    this.getChildren = function() {
      return children;
    };
  };

  describe('when children are created in the tree', function () {
    it('a sequence of nodes is added', function () {
      var node3 = new TestNode('N3', []);
      var node2 = new TestNode('N2', [node3]);
      var node1 = new TestNode('N1', [node2]);
      var result = [];
      var theTree = new adt.Tree(node1);
      theTree.on('add', function(node) {
        result.push(node);
      });
      theTree.signalSubTreeAdded(node1);

      assert.equal(node1, result[0]);
      assert.equal(node2, result[1]);
      assert.equal(node3, result[2]);
    });
  });

  describe('when children are removed from tree', function () {
    it('a sequence of nodes is removed', function () {
      var node3 = new TestNode('N3', []);
      var node2 = new TestNode('N2', [node3]);
      var node1 = new TestNode('N1', [node2]);
      var result = [];
      var theTree = new adt.Tree();
      theTree.on('remove', function(node) {
        result.push(node);
      });
      theTree.signalSubTreeRemoved(node1);

      assert.equal(node3, result[0]);
      assert.equal(node2, result[1]);
      assert.equal(node1, result[2]);
    });
  });

});



