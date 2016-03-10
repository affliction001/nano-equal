[![Build Status](https://travis-ci.org/smelukov/NanoEqual.svg?branch=master)](https://travis-ci.org/smelukov/NanoEqual)

# NanoEqual
Simple and fast realization of deep equal.

### How to use it?
```javascript
var nanoEqual = require('nano-equal');

if(nanoEqual(a, b)) {
    //....
}
```

### What is that?
This is a small and fast realization of deep equal, that supports CommonJS, AMD ang non-module definition.

Deep equal is an algorithm that comparing two values. If the values has a scalar types(string, bool, number), then comparing will be performed thru === operator.

If the values has an object types(object, array, function), then comparing will be performed recursively.

Following of the object properties is not important:
```javascript
var a = {prop1: 'some', prop2: 'some'},
    b = {prop2: 'some', prop1: 'some'};

nanoEqual(a, b); //true
```

But following of the array elements is important:
```javascript
var a = [1, 2, 3],
    b = [3, 2, 1];

nanoEqual(a, b); //false
```

As well, nano-equal supports NaN values and working correctly with recursive structures.


The list below is showing the performance comparison nano-equal with another libs:
```
nanoEqual: 6557.878ms
underscore: 7178.762ms
nodejs: 10045.062ms
shallow: 10940.088ms
lodash: 11682.599ms
```

### How to install it?
```shell
npm install nano-equal --save
```
or
```shell
bower install nano-equal --save
```

### How to build it?
```shell
gulp
```
