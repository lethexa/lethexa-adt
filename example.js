var adt = require('./index');

var set = adt.makeSet();
set.add('hello');
set.forEach( function(entry) {
	console.log('set:', entry);
});

var stack = adt.makeStack();
stack.push('hello');
console.log('stack: ', stack.pop());

