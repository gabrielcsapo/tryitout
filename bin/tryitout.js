#!/usr/bin/env node

const woof = require('woof');
const updateNotifier = require('update-notifier');

const parse = require('../lib/parse');
const compile = require('../lib/compile');
const pkg = require('../package.json');

const { Loader } = require('../lib/util');

const cli = woof(`
  Usage: tryitout [options]

  Commands:

    version, -v, --version    Output the version number
    help, -h, --help          Outputs this menu

  Options:

    -s, --source <source>      The source json file that explain what you want to try out (the default file is .tryitout)
    -o, --output [directory]   The output directory (the default is ./docs)
    -t, --template <template>  The template that is to be applied to the configuration [code, landing, product, readme]
    
`, {
  version: pkg.version,
  flags: {
    source: {
      type: 'string',
      alias: 's',
      default: `${process.cwd()}/.tryitout`
    },
    output: {
      type: 'string',
      alias: 'o',
      default: `${process.cwd()}/docs`
    },
    template: {
      type: 'string',
      alias: 't',
      default: 'code'
    }
  }
});

if(cli.help || cli.version) process.exit(0);

(async function() {
  let spinner = new Loader('Parsing .tryitout').start();

  try {
    let config = await parse({
      sourcePath: cli.source,
      template: cli.template,
      output: cli.output
    });

    spinner.update('Compiling tryitout document');

    compile({ config }, (error) => {
      spinner.stop();

      if (error) return process.stdout.write(`An error occured while compiling \n ${error} \n`);
      process.stdout.write(`Generated tryitout document: ${cli.output}/index.html \n`);
    });

    updateNotifier({ pkg }).notify();
  } catch(ex) {
    spinner.stop();

    return process.stdout.write(`An error occured while compiling \n ${ex.toString()} \n`);
  }
}());
