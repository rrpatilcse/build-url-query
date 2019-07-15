const QueryBuilder = require('http-url-query');

let queryString = QueryBuilder.buildQuery({ name: 'Rahul', id: '213654-abc12-564ds-sa456sd' });
console.log(queryString);
//output=>?name=Rahul&id=213654-abc12-564ds-sa456sd

let queryObject = {
    name: 'Rahul',
    id: '213654-abc12-564ds-sa456sd',
    skill: ['nodejs', 'hapi', 'express', 'orientDB']
}
let queryOfArrayElements = QueryBuilder.buildQuery(queryObject);
console.log(queryOfArrayElements);
//?name=Rahul&id=213654-abc12-564ds-sa456sd&skill=nodejs&skill=hapi&skill=express&skill=orientDB
console.log(QueryBuilder.buildQuery(null));                 //empty string
console.log(QueryBuilder.buildQuery(undefined));            //empty string
console.log(QueryBuilder.buildQuery(['some elements']));    //empty string

queryObject = {
    filter: {
        where: {
            key: 'skill',
            value: ['nodejs', 'hapi', 'express', 'orientDB'],
            op: 'in',
            and: [{
                key: 'experience',
                value: 2,
                op: '>='
            }]
        }
    }
};
console.log(QueryBuilder.buildQuery(queryObject)); //encoded URL query string