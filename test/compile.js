const test = require('tape');
const path = require('path');
const fs = require('fs');
const compile = require('../lib/compile');

test('compile', (t) => {
  t.plan(3);

  t.test('should compile an example code hello world', { timeout: 1000000 }, (t) => {
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

  t.test('should compile an example product', { timeout: 100000 }, (t) => {
    const source = {
      title: "Steno",
      description: "A simple SSH shortcut menu for OSX",
      links: {
        Source: 'https://github.com/gabrielcsapo/steno',
        Download: 'https://github.com/gabrielcsapo/steno/releases',
      },
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
  });

  t.test('should compile an example landing', { timeout: 100000 }, (t) => {
    const source = {
        title: 'Steno',
        nav: {
          Docs: 'http://gabrielcsapo.com/steno'
        },
        body: `
          <div style="text-align:center;">
            <h4 style="font-weight:100">A simple SSH shortcut menu for OSX</h4>
            <img class="responsive" src="../../fixtures/example.gif"/>
          </div>
        `,
        options: {
          width: '50%'
        },
        footer: {
          author: 'Gabriel J. Csapo',
          website: 'http://www.gabrielcsapo.com'
        }
    }
    const output = path.resolve(__dirname, 'tmp', 'landing');
    compile({
      source,
      output,
      template: 'landing'
    }, (error) => {
      if (error) return t.fail(error);
      t.ok(!fs.existsSync(path.resolve(__dirname, 'tmp', 'landing', 'build.js')));
      t.ok(fs.existsSync(path.resolve(__dirname, 'tmp', 'landing', 'index.html')));
      t.end();
    });
  })

});
