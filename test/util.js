const test = require('tape');

const { cleanString } = require('../lib/util');

test('util', (t) => {
  t.plan(2);

  t.test('cleanString', (t) => {
    t.equal(cleanString('         hello'), 'hello');
    t.end();
  });

  t.test('cleanString with intentional spaces', (t) => {
    t.equal(cleanString('         hello world     '), 'hello world');
    t.end();
  });

});
