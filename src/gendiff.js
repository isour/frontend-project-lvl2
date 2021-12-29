import _ from 'lodash';
import { getObjectFromYAML, isFileYAML } from './parsers/yaml.js';
import { getObjectFromJSON, isFileJSON } from './parsers/json.js';
import renderStylish from './formatters/stylysh.js';

const getSortedObject = (obj) => _(obj).toPairs().sortBy(0).fromPairs().value();

const checkPropertyExist = (obj, property) =>
  Object.prototype.hasOwnProperty.call(obj, property);

const isObject = (object) =>
  typeof object === 'object' && !Array.isArray(object) && object !== null;

const compareArrays = (array1, array2) => {
  const array2Sorted = array2.slice().sort();
  return (
    array1.length === array2.length &&
    array1
      .slice()
      .sort()
      .every((value, index) => value === array2Sorted[index])
  );
};

const getDiffTree = (object1, object2) => {
  const allKeys = _.union(Object.keys(object1), Object.keys(object2)).sort();
  return allKeys.map((key) => {
    if (!Object.prototype.hasOwnProperty.call(object1, key)) {
      return {
        key,
        value: object2[key],
        status: 'added',
      };
    }
    if (!Object.prototype.hasOwnProperty.call(object2, key)) {
      return {
        key,
        value: object1[key],
        status: 'removed',
      };
    }
    if (isObject(object2[key]) && isObject(object2[key])) {
      return {
        key,
        value: object1[key],
        status: 'nested',
        children: getDiffTree(object1[key], object2[key]),
      };
    }
    if (object1[key] !== object2[key]) {
      return {
        key,
        value1: object1[key],
        value2: object2[key],
        status: 'changed',
      };
    }
    return {
      key,
      value: object1[key],
      status: 'unchanged',
    };
  });
};

const getTree = (object1, object2) => ({
  status: 'root',
  children: getDiffTree(object1, object2),
});

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
  return renderStylish(getTree(sortedObject1, sortedObject2));
};
