const test = require('tape');
const path = require('path');
const fs = require('fs');
const compile = require('../lib/compile');

test('compile', (t) => {
  t.plan(1);

  t.test('should compile an example hello world', {
    timeout: 100000
  }, (t) => {
    compile({
        "title": "Hello World",
        "description": "When you want a hello world example and just want a simple example cli",
        "source": "https://github.com/gabrielcsapo/tryitout",
        "body": [{
          "type": "text",
          "value": "To write a simple hello world function simply do the following"
        },{
          "type": "code",
          "title": "Hello World Example",
          "value": "function Hello() {\n    return 'hello world'\n}"
        }],
        "output": path.resolve(__dirname, 'tmp'),
        "path": path.resolve(__dirname)
    }, path.resolve(__dirname, 'tmp'), (error) => {
      if(error) return t.fail(error);
      t.ok(fs.existsSync(path.resolve(__dirname, 'tmp', 'build.js')));
      t.end();
    });
  });

});
