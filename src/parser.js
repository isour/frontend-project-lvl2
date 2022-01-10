import yaml from 'js-yaml';

const parserPresets = {
  json: (file) => JSON.parse(file),
  yaml: (file) => {
    try {
      const doc = yaml.load(file);
      return doc;
    } catch (e) {
      return false;
    }
  },
};

export default (file, format) => parserPresets[format](file);
