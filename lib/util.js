const dedent = require('dedent');

module.exports.cleanString = function cleanString(string) {
  return dedent(string || ''.trim())
};
