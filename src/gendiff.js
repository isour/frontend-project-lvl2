import _ from 'lodash';
import { getObjectFromYAML, isFileYAML } from './parsers/yaml.js';
import { getObjectFromJSON, isFileJSON } from './parsers/json.js';
import render from './formatters/index.js';

const isObject = (object) =>
  typeof object === 'object' && !Array.isArray(object) && object !== null;

const getDiffTree = (object1, object2) => {
  const allKeys = _.union(Object.keys(object1), Object.keys(object2)).sort();
  return allKeys.map((key) => {
    if (!Object.prototype.hasOwnProperty.call(object1, key))
      return {
        key,
        value: object2[key],
        status: 'added',
      };
    if (!Object.prototype.hasOwnProperty.call(object2, key))
      return {
        key,
        value: object1[key],
        status: 'removed',
      };

    if (isObject(object2[key]) && isObject(object2[key]))
      return {
        key,
        value: object1[key],
        status: 'nested',
        children: getDiffTree(object1[key], object2[key]),
      };

    if (object1[key] !== object2[key])
      return {
        key,
        value1: object1[key],
        value2: object2[key],
        status: 'changed',
      };

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

export default (file1, file2, formatName) => {
  const fileObject1 = isFileJSON(file1)
    ? getObjectFromJSON(file1)
    : getObjectFromYAML(file1);
  const fileObject2 = isFileJSON(file2)
    ? getObjectFromJSON(file2)
    : getObjectFromYAML(file2);

  return render(getTree(fileObject1, fileObject2), formatName);
};
