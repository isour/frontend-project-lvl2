import renderStylish from './stylish.js';
import renderPlain from './plain.js';

const render = (tree, type) => {
  if (type === 'plain') return renderPlain(tree);
  if (type === 'json') return JSON.stringify(tree);
  if (type === 'stylish') return renderStylish(tree);
  throw new Error(`Unknown format: '${type}'`);
};

export default render;
