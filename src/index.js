/**
 * @licence
 * @author Sergey Melyukov 2016
 */

/**
 * Is two arrays is equal?
 * The following of the elements are important!
 *
 * @param {Array} a
 * @param {Array} b
 *
 * @returns {boolean}
 */
function eqArray(a, b) {
    if (a.length === b.length) {
        return a.every(function(val, key) {
            return nanoEqual(val, b[key]);
        });
    }

    return false;
}

/**
 * Is two objects is equal?
 * The following of the elements are not important!
 *
 * @param {Object} a
 * @param {Object} b
 *
 * @returns {boolean}
 */
function eqObject(a, b) {
    if (a === b) {
        return true;
    }

    var aKeys = Object.keys(a),
        bKeys = Object.keys(b);

    if (aKeys.length === bKeys.length) {
        return aKeys.every(function(aKey) {
            if (a[aKey] === a || b[aKey] === b) {
                return a[aKey] === b[aKey];
            }

            return b.hasOwnProperty(aKey) && nanoEqual(a[aKey], b[aKey]);
        });
    }

    return false;
}

/**
 * Is value like array?
 *
 * @param {*} a
 * @returns {boolean}
 */
function isArrayLike(a) {
    if (Array.isArray(a)) {
        return true;
    }

    var len = a.length;

    if (typeof len === 'number' && len >= 0) {
        if (len > 0) {
            return 0 in a && len - 1 in a;
        }

        return true;
    }

    return false;
}

/**
 * Get type of value.
 *
 * @param {*} a
 * @returns {string}
 */
function getType(a) {
    var type = typeof a;

    if (type === 'object') {
        if (!a) {
            type = 'null';
        } else if (a instanceof Date) {
            type = 'date';
        } else if (isArrayLike(a)) {
            type = 'array';
        } else {
            type = 'object';
        }
    }

    return type;
}

/**
 * Deep equal of the values
 *
 * @param {*} a
 * @param {*} b
 * @returns {boolean}
 */
function nanoEqual(a, b) {
    var typeA = getType(a),
        typeB = getType(b);

    if (typeA !== typeB) {
        return false;
    }

    switch (typeA) {
        case 'object':
        {
            return eqObject(a, b);
        }

        case 'array':
        {
            return eqArray(a, b);
        }

        case 'date':
        {
            return a.getTime() === b.getTime();
        }

        default:
        {
            //nan
            if (a !== a && b !== b) {
                return true;
            }

            return a === b;
        }
    }
}

module.exports = nanoEqual;
