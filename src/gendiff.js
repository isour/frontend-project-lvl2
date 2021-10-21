import _ from 'lodash';

const getSortedObject = (obj) => _(obj).toPairs().sortBy(0).fromPairs().value();

const checkPropertyExist = (obj, property) =>
  Object.prototype.hasOwnProperty.call(obj, property);

export default (object1, object2) => {
  const sortedObject1 = getSortedObject(object1);
  const sortedObject2 = getSortedObject(object2);
  const allKeys = _.union(
    Object.keys(sortedObject1),
    Object.keys(sortedObject2)
  );

  let result = '{';

  allKeys.forEach((objectKey) => {
    if (sortedObject1[objectKey] === sortedObject2[objectKey]) {
      result += `\n    ${objectKey}: '${sortedObject1[objectKey]}'`;
      return;
    }
    if (!checkPropertyExist(sortedObject2, objectKey)) {
      result += `\n  - ${objectKey}: '${sortedObject1[objectKey]}'`;
      return;
    }
    if (!checkPropertyExist(sortedObject1, objectKey)) {
      result += `\n  + ${objectKey}: '${sortedObject2[objectKey]}'`;
      return;
    }

    if (sortedObject1[objectKey] !== sortedObject2[objectKey]) {
      result += `\n  - ${objectKey}: '${sortedObject1[objectKey]}'`;
      result += `\n  + ${objectKey}: '${sortedObject2[objectKey]}'`;
    }
  });
  result += '\n}';
  return result;
};
