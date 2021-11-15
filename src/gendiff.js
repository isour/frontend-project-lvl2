import _ from 'lodash';
import { getObjectFromYAML, isFileYAML } from './parsers/yaml.js';
import { getObjectFromJSON, isFileJSON } from './parsers/json.js';

const getSortedObject = (obj) => _(obj).toPairs().sortBy(0).fromPairs().value();

const checkPropertyExist = (obj, property) =>
  Object.prototype.hasOwnProperty.call(obj, property);

const compareObjects = (object1, object2) => {
  let result = '{';
  const allKeys = _.union(Object.keys(object1), Object.keys(object2));
  allKeys.forEach((objectKey) => {
    if (object1[objectKey] === object2[objectKey]) {
      result += `\n    ${objectKey}: '${object1[objectKey]}'`;
      return;
    }
    if (!checkPropertyExist(object2, objectKey)) {
      result += `\n  - ${objectKey}: '${object1[objectKey]}'`;
      return;
    }
    if (!checkPropertyExist(object1, objectKey)) {
      result += `\n  + ${objectKey}: '${object2[objectKey]}'`;
      return;
    }

    if (object1[objectKey] !== object2[objectKey]) {
      result += `\n  - ${objectKey}: '${object1[objectKey]}'`;
      result += `\n  + ${objectKey}: '${object2[objectKey]}'`;
    }
  });
  result += '\n}';
  return result;
};

export default (file1, file2) => {
  let sortedObject1;
  let sortedObject2;
  if (isFileJSON(file1)) {
    sortedObject1 = getObjectFromJSON(file1);
    sortedObject2 = getObjectFromJSON(file2);
  }
  if (isFileYAML(file1)) {
    sortedObject1 = getObjectFromYAML(file1);
    sortedObject2 = getObjectFromYAML(file2);
  }
  return compareObjects(
    getSortedObject(sortedObject1),
    getSortedObject(sortedObject2)
  );
};
