#!/usr/bin/env node

import program from "commander";
// import gendiff from "../src/gendiff";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const packageFile = require("../package.json");
   
program
    .version(packageFile.version)
    .description(packageFile.description)
    .usage("[options]")
    .option('-f, --format [type]', 'output format')
    .parse(process.argv);