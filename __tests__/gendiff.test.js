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

test('flat test', async () => {
  const json1 = JSON.parse(await readFile('file1.json'));
  const json2 = JSON.parse(await readFile('file2.json'));
  const result1 = await readFile('result1.txt');
  // const json1 = getFixturePath('file1.json');
  // const json2 = getFixturePath('file2.json');
  // console.log(gendiff(json1, json2));
  // console.log(result1);
  expect(gendiff(json1, json2)).toEqual(result1);
});
