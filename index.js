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
 * @returns Query string
 *          - E.g. For above mentioned query object
 *          - ?name=Rahul&id=213654-abc12-564ds-sa456sd&skill=nodejs&skill=hapi&skill=express&skill=orientDB
 */
function buildQuery(queryObject) {
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
                for (const value of element) {
                    arrElements.push(`${key}=` + encodeURIComponent(`${value}`));
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

module.exports = {
    buildQuery
}