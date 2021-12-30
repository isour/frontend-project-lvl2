const stringify = (obj) => {
  if (typeof obj === 'string') return `'${obj}'`;
  if (obj === null) return null;
  if (typeof obj === 'object' || Array.isArray(obj)) return '[complex value]';
  return `${String(obj)}`;
};

const convertionFunctions = {
  root: (node, path, fn) => {
    const result = node.children
      .map((childNode) =>
        convertionFunctions[childNode.status](childNode, `${childNode.key}`, fn)
      )
      .join('');
    return `${result}`;
  },
  added: (node, path) =>
    `Property '${path}' was added with value: ${stringify(node.value)}\n`,
  removed: (node, path) => `Property '${path}' was removed\n`,
  nested: (node, path, fn) => {
    const result = node.children
      .map((childNode) =>
        convertionFunctions[childNode.status](
          childNode,
          `${path}.${childNode.key}`,
          fn
        )
      )
      .join('');
    return `${String(result)}`;
  },
  changed: (node, path) =>
    `Property '${path}' was updated. From ${stringify(
      node.value1
    )} to ${stringify(node.value2)}\n`,
  unchanged: () => '',
};

const render = (tree) => {
  const iteration = (node, path) =>
    convertionFunctions[node.status](node, path, iteration);

  return iteration(tree, '').trim();
};

export default render;
