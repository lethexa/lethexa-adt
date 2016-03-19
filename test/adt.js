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

});


