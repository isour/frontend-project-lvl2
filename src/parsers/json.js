import path from 'path';
import * as fs from 'fs';

const isFileJSON = (file) => path.extname(file).toLowerCase() === '.json';

const readFile = (file) => fs.readFileSync(file);

const getObjectFromJSON = (fileStr) => JSON.parse(readFile(fileStr).toString());

export { getObjectFromJSON, isFileJSON };
