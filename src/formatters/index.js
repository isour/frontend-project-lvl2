import renderStylish from './stylysh.js';
import renderPlain from './plain.js';

const render = (tree, type) => {
  if (type === 'plain') return renderPlain(tree);
  if (type === 'json') return tree;
  return renderStylish(tree);
};

export default render;
