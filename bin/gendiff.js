#!/usr/bin/env node

import program from 'commander';
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
    console.log(
      gendiff(program.args[0], program.args[1], program.opts().format)
    );
  })
  .parse();
