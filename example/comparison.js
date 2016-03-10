var nanoEqual = require('./../src'),
    nodeEqual = require('assert').deepEqual,
    shallowEqual = require('shallow-equal-fuzzy'),
    lodashEqual = require('lodash').isEqual,
    underscoreEqual = require('underscore').isEqual;

var objA = {
    prop1: 'value1',
    prop2: 'value2',
    prop3: 'value3',
    prop4: {
        subProp1: 'sub value1',
        subProp2: {
            subSubProp1: 'sub sub value1',
            subSubProp2: [1, 2, {prop2: 1, prop: 2}, 4, 5]
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
            subSubProp2: [1, 2, {prop2: 1, prop: 2}, 4, 5]
        },
        subProp1: 'sub value1'
    }
};

function testEqual(name, fn, a, b, amount) {
    try {
        var _amount = amount || 1000000;

        console.time(name);

        for (var i = 0; i < _amount; i++) {
            var res = fn(a, b);

            if (res !== undefined && !res) {
                console.timeEnd(name);
                throw new Error('not equal');
            }
        }

        console.timeEnd(name);
    } catch (e) {
        console.log(name + ':', e.message);
    }
}

testEqual('nanoEqual', nanoEqual, objA, objB);
testEqual('nodejs', nodeEqual, objA, objB);
testEqual('shallow', shallowEqual, objA, objB);
testEqual('lodash', lodashEqual, objA, objB);
testEqual('underscore', underscoreEqual, objA, objB);
