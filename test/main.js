var assert = require('chai').assert;
var nanoEqual = require('../src/index');

var objA = {
    nan: NaN,
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
    nan: NaN,
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

var objBWithAddProp = {
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
    },
    addProp: ';('
};

var recA = {};
var recB = {};

recA.a = recA;
recB.a = recB;

var recA2 = {};
var recB2 = {};

recA2.a = recA2;
recB2.a = recA2;

var recA3 = {};
var recB3 = {};

recA3.a = recB3;
recB3.a = recA3;

describe('Functional', function() {
    it('should working correctly', function() {
        assert.isTrue(nanoEqual(objA, objA));
        assert.isTrue(nanoEqual(objA, objB));
        assert.isFalse(nanoEqual(objA, objBWithAddProp));

        assert.isFalse(nanoEqual(recA, recB));
        assert.isTrue(nanoEqual(recA2, recB2));
        assert.isFalse(nanoEqual(recA3, recB3));
    });
});
