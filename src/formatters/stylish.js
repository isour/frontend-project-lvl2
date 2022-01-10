const replaceAt = (str, index, rpc) =>
  str.substr(0, index) + rpc + str.substr(index + rpc.length);

const getIndentation = (depth, symb = ' ') => {
  let string = '    '.repeat(depth);
  string = replaceAt(string, string.length - 2, symb);
  return depth === 0 ? '    ' : string;
};

const stringify = (obj, depth) => {
  if (typeof obj !== 'object' || Array.isArray(obj) || obj === null) {
    return String(obj);
  }

  const output = Object.entries(obj).map((node) => conversionFunctions.unchanged({ key: node[0], value: node[1] }, depth + 1));

  return `{\n${output.join('\n')}\n${getIndentation(depth)}}`;
};

const conversionFunctions = {
  root: (node, depth, fn) => {
    const result = node.children
      .map((childNode) => conversionFunctions[childNode.status](childNode, depth + 1, fn))
      .join('\n');
    return `{\n${result}\n}`;
  },
  added: (node, depth) => `${getIndentation(depth, '+')}${node.key}: ${stringify(node.value, depth)}`,
  removed: (node, depth) => `${getIndentation(depth, '-')}${node.key}: ${stringify(node.value, depth)}`,
  nested: (node, depth, fn) => {
    const result = node.children
      .map((childNode) => conversionFunctions[childNode.status](childNode, depth + 1, fn))
      .join('\n');
    return `${getIndentation(depth)}${node.key}: {\n${String(
      result,
    )}\n${getIndentation(depth)}}`;
  },
  changed: (node, depth) => `${getIndentation(depth, '-')}${node.key}: ${stringify(
    node.value1,
    depth,
  )}\n${getIndentation(depth, '+')}${node.key}: ${stringify(
    node.value2,
    depth,
  )}`,
  unchanged: (node, depth) => `${getIndentation(depth)}${node.key}: ${stringify(node.value, depth)}`,
};

const render = (tree) => {
  const iteration = (node, depth) => conversionFunctions[node.status](node, depth, iteration);

  return iteration(tree, 0);
};

export default render;
