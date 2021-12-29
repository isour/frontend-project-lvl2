const replaceAt = (str, index, replacement) =>
  str.substr(0, index) + replacement + str.substr(index + replacement.length);

const getIndentation = (depth, symb = ' ') => {
  let string = '    '.repeat(depth);
  string = replaceAt(string, string.length - 2, symb);
  return depth === 0 ? '    ' : string;
};

const stringify = (obj, depth) => {
  if (typeof obj !== 'object' || Array.isArray(obj) || obj === null) {
    return String(obj);
  }

  const output = Object.entries(obj).map((node) =>
    convertionFunctions.unchanged({ key: node[0], value: node[1] }, depth + 1)
  );

  return `{\n${output.join('\n')}\n${getIndentation(depth)}}`;
};

const convertionFunctions = {
  root: (node, depth, fn) => {
    const result = node.children
      .map((childNode) =>
        convertionFunctions[childNode.status](childNode, depth + 1, fn)
      )
      .join('\n');
    return `{\n${result}\n}`;
  },
  added: (node, depth) =>
    `${getIndentation(depth, '+')}${node.key}: ${stringify(node.value, depth)}`,
  removed: (node, depth) =>
    `${getIndentation(depth, '-')}${node.key}: ${stringify(node.value, depth)}`,
  nested: (node, depth, fn) => {
    const result = node.children
      .map((childNode) =>
        convertionFunctions[childNode.status](childNode, depth + 1, fn)
      )
      .join('\n');
    return `${getIndentation(depth)}${node.key}: {\n${String(
      result
    )}\n${getIndentation(depth)}}`;
  },
  changed: (node, depth) =>
    `${getIndentation(depth, '-')}${node.key}: ${stringify(
      node.value1,
      depth
    )}\n${getIndentation(depth, '+')}${node.key}: ${stringify(
      node.value2,
      depth
    )}`,
  unchanged: (node, depth) =>
    `${getIndentation(depth)}${node.key}: ${stringify(node.value, depth)}`,
};

const render = (tree) => {
  const iteration = (node, depth) =>
    convertionFunctions[node.status](node, depth, iteration);

  return iteration(tree, 0);
};

export default render;
