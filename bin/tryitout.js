#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const ora = require('ora');
const updateNotifier = require('update-notifier');

const compile = require('../lib/compile');
const parse = require('../lib/parse');
const watch = require('../lib/watch');
const pkg = require('../package.json')

program
  .version(pkg.version)
  .option('-s, --source <source>', 'The source json file that explain what you want to try out (the default files that it will look for will be tryitout.json or tryitout.js)')
  .option('-o, --output [directory]', 'The output directory')
  .option('-w, --watch', 'Watch for changes and compile when changes are made')
  .option('-t, --template <template>', 'The template to be used to generate your site [code, product, landing]')
  .parse(process.argv);

(async function() {
  let config = {};

  try {
    config = await parse({
      source: program.source || false,
      template: program.template,
      output: program.output || false
    });
  } catch (ex) {
    console.error(`` + // eslint-disable-line
      `
      please configure a valid source file using

        tryitout --source <filename>

      or place a tryitout.json or tryitout.js file
      in your current working directory
    `);
    process.exit(1);
  }

  let spinner;

  try {
    if (program.watch) {
      watch({
        config,
        output: config.output,
        template: config.template
      });
    } else {
      spinner = ora('Generating tryitout document').start();

      compile({
        config,
        output: config.output,
        template: config.template
      }, (error) => {
        if (error) return spinner.fail(error); // eslint-disable-line
        spinner.succeed(`Generated tryitout document: ${path.resolve(config.output, 'index.html')}`);
      });
    }
  } catch (ex) {
    if (program.watch) {
      console.log(`` + // eslint-disable-line
      `Encountered an issue while watching changes:
        ${ex.toString()}
      `);
    } else {
      spinner.fail(`Encountered an issue while compiling:
        ${ex.toString()}
      `);
    }
  }
}());

updateNotifier({ pkg }).notify();
