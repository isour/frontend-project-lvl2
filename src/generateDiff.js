import _ from 'lodash';

const getDiffTree = (object1, object2) => {
  const allKeys = _.union(Object.keys(object1), Object.keys(object2));
  const sortedKeys = _.sortBy(allKeys);
  return sortedKeys.map((key) => {
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

    if (_.isObject(object1[key]) && _.isObject(object2[key])) {
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

export { getTree as default };
