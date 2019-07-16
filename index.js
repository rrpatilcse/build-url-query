'use strict'

/**
 * Get URL query string
 *
 * @param {*} queryObject - Object to append as query
 *                        - E.g.-
 *                          {
 *                              name: 'username',
 *                              id: '213654-abc12-564ds-sa456sd',
 *                              skill: ['nodejs', 'hapi', 'express', 'orientDB']
 *                          }
 * @param {*} options - Array paramter format 
 *                    - E.g.
 *                      1. { repeatedKey: true } - this will be default
 *                      2. { repeatedKeyWithBracket: true }
 *                      3. { commaSeparatedList: true }
 * @returns Query string
 *          - E.g. For above mentioned query object
 *          - ?name=Rahul&id=213654-abc12-564ds-sa456sd&skill=nodejs&skill=hapi&skill=express&skill=orientDB
 */
function buildQuery(queryObject, options) {
    //Handle null and undefined objects
    if (!queryObject || !isObject(queryObject)) {
        return '';
    }
    let query = [];
    for (const key in queryObject) {

        if (queryObject.hasOwnProperty(key)) {

            const element = queryObject[key];
            //Handle array type query parameters
            if (Array.isArray(element)) {

                let arrElements = [];
                if (!options || options['repeatedKey'] === true) {

                    arrElements = buildArrayQuery(key, element);
                } else if (options['repeatedKeyWithBracket'] === true) {

                    arrElements = buildArrayQuery(`${key}[]`, element);
                } else if (options['commaSeparatedList'] === true) {

                    let encodedComponents = [];
                    for (const value of element) {
                        encodedComponents.push(encodeURIComponent(value));
                    }
                    arrElements.push(`${key}=` + encodedComponents.join(','));
                } else {
                    //default repeated key. If any invalid options passed
                    arrElements = buildArrayQuery(key, element);
                }

                if (arrElements.length > 0) {
                    query.push(arrElements.join('&'));
                }
            } else if (isObject(element)) {

                //Handle JSON objects as stringified query parameter
                query.push(`${key}=` + encodeURIComponent(`${JSON.stringify(element)}`));
            } else {

                query.push(`${key}=` + encodeURIComponent(`${element}`));
            }
        }
    }
    return query.length > 0 ? '?' + query.join('&') : '';
}

function isObject(value) {
    return value && typeof value === 'object' && value.constructor === Object;
}

function buildArrayQuery(key, elements) {
    let arrElements = [];
    for (const value of elements) {
        arrElements.push(`${key}=` + encodeURIComponent(`${value}`));
    }
    return arrElements;
}

module.exports = {
    buildQuery
}
