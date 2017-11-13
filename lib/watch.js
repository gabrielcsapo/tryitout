const express = require('express');

const path = require('path');
const fs = require('fs');
const ora = require('ora');
const crypto = require('crypto');
const chokidar = require('chokidar');

const compile = require('./compile');

module.exports = ({ originalConfig, output, template='code' }) => {
  // the environment to development so that webpack does not run production compilations
  process.env.NODE_ENV = 'development';

  const start = process.hrtime();
  const workingDirectory = path.dirname(originalConfig.path);
  const spinner = ora('Starting tryitout server').start();

  let config = originalConfig;
  config.dev = true;
  config.hash = crypto.createHash('sha256').update(JSON.stringify(config), 'utf8').digest().toString('hex');

  let build = '';

  const app = express();

  app.use('/build.js', (req, res) => {
    if(build) {
      var extra = '';
      res.setHeader('content-type', 'text/javascript');
      if (config.externals) {
        config.externals.forEach((e) => extra += fs.readFileSync(path.resolve(workingDirectory, e)).toString('utf8'));
      }
      res.send(`window.config=${typeof config !== 'string' ? JSON.stringify(config) : config};${build.toString()};${extra};`);
    } else {
      res.status(500);
      res.send({ error: 'build not complete' });
    }
  });

  app.use('/update', (req, res) => {
    res.send({ hash: config.hash });
  });

  app.use('/', (req, res) => {
    if(build) {
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
    } else {
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
                <div style="width:100%;position:absolute;top:50%;transform:translateY(-50%);text-align:center;">
                  Currently compiling 🐒
                  <br/>
                  <small> Page will refresh when done </small>
                </div>
                <script type="text/javascript">
                  (function() {
                    setInterval(function() {
                      var xhttp = new XMLHttpRequest();
                      xhttp.onreadystatechange = function() {
                          if (this.readyState == 4 && this.status == 200) {
                            location.reload();
                          }
                      };
                      xhttp.open("GET", "/build.js", true);
                      xhttp.send();
                    }, 500)
                  }());
                </script>
            </body>
        </html>
      `);
    }
  });

  app.listen(3000, (error) => {
    if (error) return spinner.fail(error);
  });

  compile({
    config,
    output,
    injectConfig: false,
    skipConcat: true,
    template
  }, (err, _build) => {
    if(err) throw new Error(err);

    build = _build;

    spinner.succeed(`Built and accessible at http://localhost:3000 [${process.hrtime(start)[1]/1000000}ms]\n
When you are satified with the results please run:
  tryitout
to render a built version into the corresponding output directory
    `)
  });

  chokidar.watch(originalConfig.path, {}).on('all', (event, p) => {
    if (event === 'change' && p === originalConfig.path) {
      delete require.cache[originalConfig.path];

      config = require(originalConfig.path);
      config.dev = true;
      config.hash = crypto.createHash('sha256').update(JSON.stringify(config), 'utf8').digest().toString('hex');

      console.log(`changes built, ${config.hash} 🎉`); // eslint-disable-line
    }
  });
}
