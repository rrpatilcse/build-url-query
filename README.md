# http-url-query

This creates URL query string for provided query data. It will reduce your efforts to build query string based on typeof parameter.

## Installing

```
npm i http-url-query
```

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Example

```
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

queryOfArrayElements = QueryBuilder.buildQuery(queryObject, { repeatedKeyWithBracket: true });
console.log(queryOfArrayElements);
//?name=Rahul&id=213654-abc12-564ds-sa456sd&skill[]=nodejs&skill[]=hapi&skill[]=express&skill[]=orientDB

queryOfArrayElements = QueryBuilder.buildQuery(queryObject, { commaSeparatedList: true });
console.log(queryOfArrayElements);
//?name=Rahul&id=213654-abc12-564ds-sa456sd&skill=nodejs,hapi,express,orientDB

queryOfArrayElements = QueryBuilder.buildQuery(queryObject, { invalidKey: true });
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
```

## Authors

* **Rahul Patil**

See also the list of [contributors](https://github.com/rrpatilcse/http-url-query/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
