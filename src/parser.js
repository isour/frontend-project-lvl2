import yaml from 'js-yaml';

const parserPresets = {
  json: (data) => JSON.parse(data),
  yaml: (data) => {
    try {
      const doc = yaml.load(data);
      return doc;
    } catch (e) {
      return false;
    }
  },
  yml: (data) => {
    try {
      const doc = yaml.load(data);
      return doc;
    } catch (e) {
      return false;
    }
  },
};

export default (data, format) => parserPresets[format](data);
