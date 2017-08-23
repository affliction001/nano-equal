var nanoEqual = require('./../src');
var lodashEqual = require('lodash').isEqual;
var underscoreEqual = require('underscore').isEqual;
var assert = require('assert');
var nodeEqual = function(a, b) {
    try {
        assert.deepEqual(a, b);
        return true;
    } catch (e) {
        return false;
    }
};
var objA = {
    prop1: 'value1',
    prop2: 'value2',
    prop3: 'value3',
    prop4: {
        subProp1: 'sub value1',
        subProp2: {
            subSubProp1: 'sub sub value1',
            subSubProp2: [1, 2, { prop2: 1, prop: 2 }, 4, 5]
        }
    },
    prop5: 1000,
    prop6: new Date(2016, 2, 10)
};

var objB = {
    prop5: 1000,
    prop3: 'value3',
    prop1: 'value1',
    prop2: 'value2',
    prop6: new Date('2016/03/10'),
    prop4: {
        subProp2: {
            subSubProp1: 'sub sub value1',
            subSubProp2: [1, 2, { prop2: 1, prop: 2 }, 4, 5]
        },
        subProp1: 'sub value1'
    }
};

function testEqual(name, fn, a, b) {
    console.time(name);

    for (var i = 0; i < 1000000; i++) {
        if (!fn(a, b)) {
            console.timeEnd(name);
            console.log('not equal');
            return;
        }
    }

    console.timeEnd(name);
}

testEqual('nanoEqual', nanoEqual, objA, objB);
testEqual('nodejs', nodeEqual, objA, objB);
testEqual('lodash', lodashEqual, objA, objB);
testEqual('underscore', underscoreEqual, objA, objB);
