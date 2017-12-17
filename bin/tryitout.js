#!/usr/bin/env node

const path = require('path');
const ora = require('ora');
const updateNotifier = require('update-notifier');

const compile = require('../lib/compile');
const parse = require('../lib/parse');
const watch = require('../lib/watch');
const pkg = require('../package.json')

let program = {};

const args = process.argv.slice(2);

args.forEach((a, i) => {
  switch(a) {
  case '-v':
  case '--version':
      console.log(`v${require('../package.json').version}`); // eslint-disable-line
      process.exit(0);
    break;
  case 'help':
  case '-h':
  case '--help':
    console.log(``+ // eslint-disable-line
  `
    Usage: tryitout [options]

    Commands:

      version, -v, --version    Output the version number
      watch, -w, --watch        Watch for changes and compile when changes are made
      help, -h, --help          Outputs this menu

    Options:

      -s, --source <source>      The source json file that explain what you want to try out (the default files that it will look for will be [tryitout.json|tryitout.js|.tryitoutrc.json|.tryitoutrc.js])
      -o, --output [directory]   The output directory
      -t, --template <template>  The template to be used to generate your site [code, product, landing]
      -h, --help                 output usage information
  `);
    process.exit(0);
    break;
    case '-w':
    case '--watch':
    case 'watch':
      program.watch = true;
    break
    case '-s':
    case '--source':
    case 'source':
      program.source = args[i + 1];
    break;
    case '-o':
    case '--output':
    case 'output':
      program.output = args[i + 1];
    break;
    case '-t':
    case '--template':
    case 'template':
      program.template = args[i + 1];
    break;
  }
});

(async function() {
  let config = {};

  try {
    config = await parse({
      sourcePath: program.source,
      template: program.template,
      output: program.output
    });
  } catch (ex) {
    console.error(`` + // eslint-disable-line
      `
      please configure a valid source file using

        tryitout --source <filename>

      or place a tryitout.json or tryitout.js file
      in your current working directory

      failed with message: \n\n ${ex.message}
    `);
    process.exit(1);
  }

  let spinner;

  try {
    if (program.watch) {
      watch({
        originalConfig: config,
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
