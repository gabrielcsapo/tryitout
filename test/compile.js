const test = require('tape');
const path = require('path');
const fs = require('fs');
const compile = require('../lib/compile');

test('compile', (t) => {
  t.plan(2);

  t.test('should compile an example code hello world', { timeout: 100000 }, (t) => {
    const source = {
      "title": "Hello World",
      "description": "When you want a hello world example and just want a simple example cli",
      "source": "https://github.com/gabrielcsapo/tryitout",
      "body": [{
        "type": "text",
        "value": "To write a simple hello world function simply do the following"
      }, {
        "type": "code",
        "title": "Hello World Example",
        "value": "function Hello() {\n    return 'hello world'\n}"
      }],
      "output": path.resolve(__dirname, 'tmp'),
      "path": path.resolve(__dirname)
    };
    const output = path.resolve(__dirname, 'tmp', 'code');

    compile({
      source,
      output
    }, (error) => {
      if (error) return t.fail(error);
      t.ok(!fs.existsSync(path.resolve(__dirname, 'tmp', 'code', 'build.js')));
      t.ok(!fs.existsSync(path.resolve(__dirname, 'tmp', 'code', 'vendor.js')));
      t.ok(fs.existsSync(path.resolve(__dirname, 'tmp', 'code', 'index.html')));
      t.end();
    });
  });

  t.test('should compile an example product', { timeout: 10000 }, (t) => {
    const source = {
      title: "Steno",
      description: "A simple SSH shortcut menu for OSX",
      sourceCodeLink: 'https://github.com/gabrielcsapo/steno',
      downloadLink: 'https://github.com/gabrielcsapo/steno/releases',
      icon: '../../fixtures/steno.png',
      demoImage: '../../fixtures/example.gif'
    };
    const output = path.resolve(__dirname, 'tmp', 'product');
    compile({
      source,
      output,
      template: 'product'
    }, (error) => {
      if (error) return t.fail(error);
      t.ok(!fs.existsSync(path.resolve(__dirname, 'tmp', 'product', 'build.js')));
      t.ok(fs.existsSync(path.resolve(__dirname, 'tmp', 'product', 'index.html')));
      t.end();
    });
  })

});
