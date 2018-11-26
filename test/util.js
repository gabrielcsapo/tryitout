const test = require('tape')

const { cleanString } = require('../lib/util')

test('util', (t) => {
  t.plan(2)

  t.test('cleanString', (t) => {
    t.plan(1)
    t.equal(cleanString('         hello'), 'hello')
  })

  t.test('cleanString with intentional spaces', (t) => {
    t.plan(1)
    t.equal(cleanString('         hello world     '), 'hello world')
  })
})
