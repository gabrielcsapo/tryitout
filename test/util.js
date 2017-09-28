const test = require('tape');

const { cleanString } = require('../lib/util');

test('util', (t) => {
  t.plan(1);

  t.test('cleanString', (t) => {
    t.equal(cleanString('         hello'), 'hello');
    t.end();
  });

});
