const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const compile = require('./compile');

module.exports = (source, output) => {
  const app = express();
  const compiler = compile(source, output);

  app.use(webpackDevMiddleware(compiler));

  app.use(webpackHotMiddleware(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000 // eslint-disable-line
  }));

  app.use('/', (req, res) => {
      res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <meta name=viewport content="width=device-width, initial-scale=1">
                <meta charset="utf-8">
                <title></title>
                <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400" rel="stylesheet">
            </head>
            <body>
                <div id="root"></div>
                <script src="./build.js"></script>
            </body>
        </html>
      `);
  });

  app.listen(3000, function () {
    console.log("tryitout is now available at http://localhost:3000"); // eslint-disable-line
  });
}
