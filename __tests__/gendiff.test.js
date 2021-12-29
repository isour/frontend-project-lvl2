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

// test('flat test json', async () => {
//   const result1 = await readFile('result1.txt');
//   expect(
//     gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'))
//   ).toEqual(result1);
// });

// test('flat test yaml', async () => {
//   const result1 = await readFile('result1.txt');
//   expect(
//     gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'))
//   ).toEqual(result1);
// });

test('rec test json', async () => {
  const result1 = await readFile('result2.txt');
  expect(
    gendiff(getFixturePath('file3.json'), getFixturePath('file4.json'))
  ).toEqual(result1);
});

// test('rec test yaml', async () => {
//   const result1 = await readFile('result2.txt');
//   expect(
//     gendiff(getFixturePath('file3.yaml'), getFixturePath('file4.yaml'))
//   ).toEqual(result1);
// });
