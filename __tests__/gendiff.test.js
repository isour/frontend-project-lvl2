import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import { dirname, join } from 'path';
import fs from 'fs';
import gendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) =>
  join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => {
  const dd = fs.readFileSync(getFixturePath(filename), 'utf-8', (err, data) => {
    if (err) throw err;
    return data;
  });
  return dd;
};

test.each([
  {
    file1: getFixturePath('file1.json'),
    file2: getFixturePath('file2.json'),
    outputFormat: 'stylysh',
    expected: await readFile('result1.txt'),
  },
  {
    file1: getFixturePath('file1.yaml'),
    file2: getFixturePath('file2.yaml'),
    outputFormat: 'stylysh',
    expected: await readFile('result1.txt'),
  },
  {
    file1: getFixturePath('file3.json'),
    file2: getFixturePath('file4.json'),
    outputFormat: 'stylysh',
    expected: await readFile('result2.txt'),
  },
  {
    file1: getFixturePath('file3.json'),
    file2: getFixturePath('file4.json'),
    outputFormat: 'plain',
    expected: await readFile('result_plain.txt'),
  },
  {
    file1: getFixturePath('file3.json'),
    file2: getFixturePath('file4.yaml'),
    outputFormat: 'plain',
    expected: await readFile('result_plain.txt'),
  },
  {
    file1: getFixturePath('file3.yaml'),
    file2: getFixturePath('file4.yaml'),
    outputFormat: 'stylysh',
    expected: await readFile('result2.txt'),
  },
  {
    file1: getFixturePath('file3.json'),
    file2: getFixturePath('file4.json'),
    outputFormat: 'json',
    expected: await readFile('result3.json'),
  },
])(
  'test file1: $file1, file2: $file2, outputFormat: $outputFormat)',
  ({ file1, file2, outputFormat, expected }) => {
    expect(gendiff(file1, file2, outputFormat)).toBe(expected);
  }
);
