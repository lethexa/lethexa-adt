var assert = require('assert');
var tree = require((process.env.APP_DIR_FOR_CODE_COVERAGE || '../lib/') + 'tree.js');


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
      var theTree = new tree.Tree(node1);
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
      var theTree = new tree.Tree();
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


