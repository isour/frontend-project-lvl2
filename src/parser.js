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

parserPresets.yml = parserPresets.yaml;

export default (file, format) => parserPresets[format](file);
