import path from 'path';
import * as fs from 'fs';
import yaml from 'js-yaml';

const isFileYAML = (file) =>
  path.extname(file).toLowerCase() === '.yaml' ||
  path.extname(file).toLowerCase() === '.yml';

const getObjectFromYAML = (file) => {
  try {
    const doc = yaml.load(fs.readFileSync(file, 'utf8'));
    return doc;
  } catch (e) {
    return false;
  }
};

export { getObjectFromYAML, isFileYAML };
