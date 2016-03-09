lethexa-adt
----------------

Provides abstract data types like sets,lists and trees.

Installation
------------

	npm install
	grunt

Example
-------

	npm start

Usage
-----

	var adt = require('lethexa-adt');

	var set = adt.makeSet();
	set.add('hello');
	set.forEach( function(entry) {
		console.log(entry);
	});

	var stack = adt.makeStack();
	stack.push('hello');
	console.log(stack.pop());


License
-------

This library is published under MIT license.
