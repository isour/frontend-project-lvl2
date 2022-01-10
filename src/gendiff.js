import * as fs from 'fs';
import path from 'path';
import parse from './parser.js';
import render from './formatters/index.js';
import getDiffTree from './generateDiff.js';

const getFileExtension = (file) =>
  path.extname(file).toLowerCase().replace(/\./g, '');

const readFile = (file) => fs.readFileSync(file);

const getTree = (object1, object2) => ({
  status: 'root',
  children: getDiffTree(object1, object2),
});

export default (file1, file2, formatName) => {
  const fileObject1 = parse(
    readFile(file1).toString(),
    getFileExtension(file1)
  );
  const fileObject2 = parse(
    readFile(file2).toString(),
    getFileExtension(file2)
  );

  return render(getTree(fileObject1, fileObject2), formatName);
};
