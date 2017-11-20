const path = require('path');

module.exports = {
  template: 'code',
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
    "./extra.js"
  ],
  output: path.resolve(__dirname, '..', '..', '..', 'docs', 'code')
};
