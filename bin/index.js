#!/usr/bin/env node
const path = require('path');
const program = require('commander');
const ora = require('ora');
const compile = require('../lib/compile');
const watch = require('../lib/watch');

program
  .version(require('../package.json').version)
  .option('-s, --source <source>', 'The source json file that explain what you want to try out', 'tryitout.json')
  .option('-o, --output [directory]', 'The output directory', process.cwd())
  .option('-w, --watch', 'Watch for changes and compile when changes are made')
  .parse(process.argv);

if(!program.source) throw new Error('please pass a source file in 😩 \n\n tryitout --source <filename> \n');

const sourcePath = path.resolve(process.cwd(), program.source);
const source = Object.assign(require(sourcePath), {
    path: sourcePath
});

const output = path.resolve(process.cwd(), source.output || program.output);

if(!program.watch) {
  const spinner = ora('Generating tryitout document...').start();
  compile(source, output, (error) => {
    if(error) return spinner.fail(error); // eslint-disable-line
    spinner.succeed('Generated tryitout document!')
  });
} else {
  watch(source, output);
}
