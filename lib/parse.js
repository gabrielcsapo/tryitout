const fs = require('fs');
const path = require('path');

module.exports = function parse(options = {}) {
  return new Promise(function(resolve, reject) {
    let { sourcePath=false, template='code', output=false } = options;

    try {
      if (sourcePath) {
        if (fs.existsSync(path.resolve(process.cwd(), sourcePath))) {
          sourcePath = path.resolve(process.cwd(), sourcePath);
        } else {
          return reject('invalid source');
        }
      } else if (fs.existsSync(path.resolve(process.cwd(), 'tryitout.js'))) {
        sourcePath = path.resolve(process.cwd(), 'tryitout.js');
      } else if (fs.existsSync(path.resolve(process.cwd(), 'tryitout.json'))) {
        sourcePath = path.resolve(process.cwd(), 'tryitout.json');
      } else {
        return reject('invalid source');
      }
    } catch (ex) {
      return reject('invalid source');
    }

    let config = require(sourcePath);
    config.path = sourcePath;
    // use the given template over the one defined in the config
    config.template = template || config.template;
    // use the given output directory over the one defined in the config
    config.output = path.resolve(process.cwd(), output || config.output);

    return resolve(config);
  });
}
