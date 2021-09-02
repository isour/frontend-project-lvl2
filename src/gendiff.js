import _ from 'lodash';

export default (object1, object2) => {
    const sortedObject1 = _(object1).toPairs().sortBy(0).fromPairs().value();
    const sortedObject2 = _(object2).toPairs().sortBy(0).fromPairs().value();
    const allKeys = _.union(Object.keys(sortedObject1), Object.keys(sortedObject2));
    allKeys.forEach(function(objectKey) {
        if (sortedObject1[objectKey] === sortedObject2[objectKey]) {
            console.log(`  ${objectKey}: '${sortedObject1[objectKey]}'`)
            return;
        }
        if (sortedObject1[objectKey] !== sortedObject2[objectKey]) {
            console.log(`- ${objectKey}: '${sortedObject1[objectKey]}'`)
            console.log(`+ ${objectKey}: '${sortedObject2[objectKey]}'`)
            return;
        }

        if (!sortedObject2.hasOwnProperty(objectKey)) {
            console.log(`- ${objectKey}: '${sortedObject1[objectKey]}'`)
            return;
        }

        if (!sortedObject1.hasOwnProperty(objectKey)) {
            console.log(`+ ${objectKey}: '${sortedObject2[objectKey]}'`)
            return;
        }
    })
    console.log('}');
}