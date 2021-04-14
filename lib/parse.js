const fs = require('fs')
const path = require('path')

module.exports = function parse (options = {}) {
  return new Promise(function (resolve, reject) {
    let { sourcePath = path.resolve(process.cwd(), '.tryitout'), template, output } = options

    try {
      if (fs.existsSync(path.resolve(process.cwd(), sourcePath))) {
        sourcePath = path.resolve(process.cwd(), sourcePath)
      } else {
        return reject(new Error('invalid source'))
      }
    } catch (ex) {
      return reject(new Error('invalid source'))
    }

    const config = require(sourcePath)

    config.path = sourcePath
    // use the given template over the one defined in the config
    config.template = template || config.template || 'code'
    // use the given output directory over the one defined in the config
    config.output = path.resolve(path.dirname(config.path), output || config.output || './')

    // we need to get the contents of the readme file and wire it into memory
    if (config.template === 'readme') {
      config.readme = fs.readFileSync(path.resolve(path.dirname(config.path), 'README.md')).toString()
    }

    return resolve(config)
  })
}
