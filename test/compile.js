const test = require('tape');
const path = require('path');
const fs = require('fs');
const compile = require('../lib/compile');

test('compile', (t) => {
  t.plan(3);

  t.test('should compile an example code hello world', { timeout: 1000000 }, (t) => {
    const config = {
      title: "Hello World",
      description: "When you want a hello world example and just want a simple example cli",
      nav: {
        "Source": "https://github.com/gabrielcsapo/tryitout"
      },
      body: [{
        type: "text",
        value: "To write a simple hello world function simply do the following"
      }, {
        type: "code",
        title: "A simple code example",
        value: `
          function Hello() {
          \treturn extra('hello world');
          }
          Hello();
        `
      }],
      footer: `
        <div class="text-black">Made with ☕️ by <a href="http://www.gabrielcsapo.com">@gabrielcsapo</a></div>
      `,
      externals: [
        "./docs/assets/extra.js"
      ],
      output: path.resolve(__dirname, '..', 'docs', 'code'),
      path: path.resolve(__dirname)
    };
    const output = path.resolve(__dirname, '..', 'docs', 'code');

    compile({
      config,
      output
    }, (error) => {
      if (error) return t.fail(error);
      t.ok(!fs.existsSync(path.resolve(__dirname, '..', 'docs', 'code', 'build.js')));
      t.ok(!fs.existsSync(path.resolve(__dirname, '..', 'docs', 'code', 'vendor.js')));
      t.ok(fs.existsSync(path.resolve(__dirname, '..', 'docs', 'code', 'index.html')));
      t.end();
    });
  });

  t.test('should compile an example product', { timeout: 100000 }, (t) => {
    const config = {
      title: "Steno",
      description: "A simple SSH shortcut menu for OSX",
      links: {
        Source: 'https://github.com/gabrielcsapo/steno',
        Download: 'https://github.com/gabrielcsapo/steno/releases',
      },
      icon: '../assets/steno.png',
      demoImage: '../assets/example.gif',
      footer: `
        <div class="text-black">Made with ☕️ by <a href="http://www.gabrielcsapo.com">@gabrielcsapo</a></div>
      `,
    };
    const output = path.resolve(__dirname, '..', 'docs', 'product');
    compile({
      config,
      output,
      template: 'product'
    }, (error) => {
      if (error) return t.fail(error);
      t.ok(!fs.existsSync(path.resolve(__dirname, '..', 'docs', 'product', 'build.js')));
      t.ok(fs.existsSync(path.resolve(__dirname, '..', 'docs', 'product', 'index.html')));
      t.end();
    });
  });

  t.test('should compile an example landing', { timeout: 100000 }, (t) => {
    const config = {
        title: 'Steno',
        nav: {
          Docs: 'http://gabrielcsapo.com/steno'
        },
        body: `
          <div style="text-align:center;">
            <h4 style="font-weight:100">A simple SSH shortcut menu for OSX</h4>
            <img class="responsive" src="../assets/example.gif"/>
          </div>
        `,
        options: {
          width: '50%'
        },
        footer: `
          <div class="text-black">Made with ☕️ by <a href="http://www.gabrielcsapo.com">@gabrielcsapo</a></div>
        `
    };
    const output = path.resolve(__dirname, '..', 'docs', 'landing');
    compile({
      config,
      output,
      template: 'landing'
    }, (error) => {
      if (error) return t.fail(error);
      t.ok(!fs.existsSync(path.resolve(__dirname, '..', 'docs', 'landing', 'build.js')));
      t.ok(fs.existsSync(path.resolve(__dirname, '..', 'docs', 'landing', 'index.html')));
      t.end();
    });
  })

});
