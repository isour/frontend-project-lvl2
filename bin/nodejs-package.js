#!/usr/bin/env node

import program from 'commander';
import * as fs from 'fs';
import { createRequire } from 'module';
import gendiff from '../index.js';

const require = createRequire(import.meta.url);
const packageFile = require('../package.json');

program
  .version(packageFile.version)
  .description(packageFile.description)
  .usage('[options]')
  .option('-f, --format <type>', 'output format')
  .action(() => {
    const file1 = fs.readFileSync(program.args[0]);
    const file2 = fs.readFileSync(program.args[1]);

    console.log(
      gendiff(JSON.parse(file1.toString()), JSON.parse(file2.toString()))
    );
  })
  .parse();
