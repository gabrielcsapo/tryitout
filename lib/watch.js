const express = require('express');

const path = require('path');
const fs = require('fs');
const ora = require('ora');

const chokidar = require('chokidar');

const compile = require('./compile');

module.exports = ({ originalSource=process.cwd(), output, template='code' }) => {
  const start = process.hrtime();
  const workingDirectory = path.dirname(originalSource.path);
  const spinner = ora('Starting tryitout server').start();

  let source = originalSource;
  let build = '';

  const app = express();
  compile({
    source,
    output,
    injectSource: false,
    skipConcat: true,
    template
  }, (err, _build) => {
    build = _build;

    spinner.succeed(`Built and accessible at http://localhost:3000 [${process.hrtime(start)[1]/1000000}ms]\n
When you are satified with the results please run:
  tryitout
to render a built version into the corresponding output directory
    `)
  });

  chokidar.watch(originalSource.path, {}).on('all', (event, p) => {
    if (event === 'change' && p === originalSource.path) {
      delete require.cache[originalSource.path];

      source = require(originalSource.path);
      console.log('change to source, refresh to see changes 🎉'); // eslint-disable-line
    }
  });

  app.use('/build.js', (req, res) => {
    var extra = '';
    res.setHeader('content-type', 'text/javascript');
    if (source.externals) {
      source.externals.forEach((e) => extra += fs.readFileSync(path.resolve(workingDirectory, e)).toString('utf8'));
    }
    res.send(`window.source=${typeof source !== 'string' ? JSON.stringify(source) : source};${build.toString()};${extra};`);
  });

  app.use('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <title></title>
                <meta name=viewport content="width=device-width, initial-scale=1">
                <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400" rel="stylesheet">
            </head>
            <body>
                <div id="root"></div>
                <script src="./build.js"></script>
            </body>
        </html>
      `);
  });

  app.listen(3000, (error) => {
    if (error) return spinner.fail(error);
  });
}
