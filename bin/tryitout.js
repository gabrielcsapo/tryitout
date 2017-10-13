#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const program = require('commander');
const ora = require('ora');
const updateNotifier = require('update-notifier');

const compile = require('../lib/compile');
const watch = require('../lib/watch');
const pkg = require('../package.json')

program
  .version(pkg.version)
  .option('-s, --source <source>', 'The source json file that explain what you want to try out (the default files that it will look for will be tryitout.json or tryitout.js)')
  .option('-o, --output [directory]', 'The output directory', process.cwd())
  .option('-w, --watch', 'Watch for changes and compile when changes are made')
  .option('-t, --template <template>', 'The template to be used to generate your site [code, product, landing]', 'code')
  .parse(process.argv);

// look for the defaults
let sourcePath = '';

try {
  if(program.source) {
    if(fs.existsSync(path.resolve(process.cwd(), program.source))) {
      sourcePath = path.resolve(process.cwd(), program.source);
    }
  } else if(fs.existsSync(path.resolve(process.cwd(), 'tryitout.js'))) {
    sourcePath = path.resolve(process.cwd(), 'tryitout.js');
  } else if (fs.existsSync(path.resolve(process.cwd(), 'tryitout.json'))) {
    sourcePath = path.resolve(process.cwd(), 'tryitout.json');
  } else {
    console.error(`` + // eslint-disable-line
    `
      please configure a valid source file using

        tryitout --source <filename>

      or place a tryitout.json or tryitout.js file
      in your current working directory
    `);
    process.exit(1);
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

const template = program.template;
const source = Object.assign(require(sourcePath), {
    path: sourcePath
});
const output = path.resolve(process.cwd(), source.output || program.output);

if(!program.watch) {
  const spinner = ora('Generating tryitout document').start();
  compile({ source, output, template }, (error) => {
    if(error) return spinner.fail(error); // eslint-disable-line
    spinner.succeed(`Generated tryitout document: ${path.resolve(output, 'index.html')}`);

    updateNotifier({pkg}).notify();
  });
} else {
  updateNotifier({pkg}).notify();
  
  process.env.NODE_ENV = 'development';

  watch({ originalSource: source, output, template });
}
