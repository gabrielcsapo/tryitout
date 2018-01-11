const test = require('tape');
const path = require('path');
const fs = require('fs');

const parse = require('../lib/parse');
const compile = require('../lib/compile');

test('compile', (t) => {
  t.plan(4);

  t.test('should compile an example code hello world', { timeout: 100000 }, (async (t) => {
    const config = await parse({
      sourcePath: path.resolve(__dirname, 'fixtures', 'code', '.tryitout')
    });

    compile({
      config
    }, (error) => {
      if (error) return t.fail(error);
      t.ok(!fs.existsSync(path.resolve(__dirname, '..', 'docs', 'code', 'build.js')));
      t.ok(!fs.existsSync(path.resolve(__dirname, '..', 'docs', 'code', 'vendor.js')));
      t.ok(fs.existsSync(path.resolve(__dirname, '..', 'docs', 'code', 'index.html')));
      t.end();
    });
  }));

  t.test('should compile an example product', { timeout: 100000 }, (async (t) => {
    const config = await parse({
      sourcePath: path.resolve(__dirname, 'fixtures', 'product', '.tryitout')
    });

    compile({
      config
    }, (error) => {
      if (error) return t.fail(error);
      t.ok(!fs.existsSync(path.resolve(__dirname, '..', 'docs', 'product', 'build.js')));
      t.ok(fs.existsSync(path.resolve(__dirname, '..', 'docs', 'product', 'index.html')));
      t.end();
    });
  }));

  t.test('should compile an example landing', { timeout: 100000 }, (async (t) => {
    const config = await parse({
      sourcePath: path.resolve(__dirname, 'fixtures', 'landing', '.tryitout')
    });

    compile({
      config
    }, (error) => {
      if (error) return t.fail(error);
      t.ok(!fs.existsSync(path.resolve(__dirname, '..', 'docs', 'landing', 'build.js')));
      t.ok(fs.existsSync(path.resolve(__dirname, '..', 'docs', 'landing', 'index.html')));
      t.end();
    });
  }));

  t.test('should compile an example readme', { timeout: 100000 }, (async (t) => {
    const config = await parse({
      sourcePath: path.resolve(__dirname, 'fixtures', 'readme', '.tryitout')
    });

    compile({
      config
    }, (error) => {
      if (error) return t.fail(error);
      t.ok(!fs.existsSync(path.resolve(__dirname, '..', 'docs', 'readme', 'build.js')));
      t.ok(fs.existsSync(path.resolve(__dirname, '..', 'docs', 'readme', 'index.html')));
      t.end();
    });
  }));

});
