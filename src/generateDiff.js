import _ from 'lodash';

const isObject = (test) =>
  typeof test === 'object' && !Array.isArray(test) && test !== null;

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

    if (isObject(object1[key]) && isObject(object2[key]))
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

export { getDiffTree as default };
