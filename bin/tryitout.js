#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const program = require('commander');
const ora = require('ora');

const compile = require('../lib/compile');
const watch = require('../lib/watch');

program
  .version(require('../package.json').version)
  .option('-s, --source <source>', 'The source json file that explain what you want to try out (the default files that it will look for will be tryitout.json or tryitout.js)')
  .option('-o, --output [directory]', 'The output directory', process.cwd())
  .option('-w, --watch', 'Watch for changes and compile when changes are made')
  .parse(process.argv);

// look for the defaults
let sourcePath = '';

if(fs.existsSync(path.resolve(process.cwd(), 'tryitout.js'))) {
  sourcePath = path.resolve(process.cwd(), 'tryitout.js');
} else if(fs.existsSync(path.resolve(process.cwd(), 'tryitout.json'))) {
  sourcePath = path.resolve(process.cwd(), 'tryitout.json');
} else {
  try {
    if(fs.existsSync(path.resolve(process.cwd(), program.source))) {
      sourcePath = path.resolve(process.cwd(), program.source);
    }
  } catch(ex) {
    console.error(`` + // eslint-disable-line
    `
      please configure a valid source file using

        tryitout --source <filename>

      or place a tryitout.json or tryitout.js file
      in your current working directory
    `);
    process.exit(1);
  }
}

const source = Object.assign(require(sourcePath), {
    path: sourcePath
});
const output = path.resolve(process.cwd(), source.output || program.output);

if(!program.watch) {
  process.env.NODE_ENV = 'development';
  
  const spinner = ora('Generating tryitout document').start();
  compile({ source, output }, (error) => {
    if(error) return spinner.fail(error); // eslint-disable-line
    spinner.succeed(`Generated tryitout document: ${path.resolve(output, 'index.html')}`);
  });
} else {
  watch(source, output);
}
