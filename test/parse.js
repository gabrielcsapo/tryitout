const test = require('tape')
const path = require('path')
const fs = require('fs')

const parse = require('../lib/parse')

test('parse', (t) => {
  t.plan(3)

  t.test('should be able to read config in working directory', async (t) => {
    t.plan(8)

    fs.writeFileSync(path.resolve(process.cwd(), '.tryitout'), `
      module.exports = {
        title: 'hello',
        description: 'test',
        nav: [],
        body: [],
        output: '',
        externals: [],
        path: '',
        template: ''
      };
    `)

    const config = await parse()

    t.ok(config.title)
    t.ok(config.description)
    t.ok(config.nav)
    t.ok(config.body)
    t.ok(config.output)
    t.ok(config.externals)
    t.ok(config.path)
    t.ok(config.template)

    fs.unlinkSync(path.resolve(process.cwd(), '.tryitout'))
  })

  t.test('should be able to read config in from path provided directory', async (t) => {
    t.plan(7)

    const config = await parse({ sourcePath: './test/fixtures/.tryitout' })

    t.ok(config.title)
    t.ok(config.description)
    t.ok(config.nav)
    t.ok(config.body)
    t.ok(config.output)
    t.ok(config.path)
    t.ok(config.template)
  })

  t.test('should throw error if source does not exist', async (t) => {
    t.plan(1)

    try {
      t.ok(!await parse({ sourcePath: './test/fixtures/doesnotexist/.tryitout' }), 'should not be able to parse no-existent config')
    } catch (ex) {
      t.equal(ex.message, 'invalid source')
    }
  })
})
