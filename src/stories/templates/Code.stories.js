import React from 'react'

import Code from '../../templates/code'

export default {
  title: 'Templates/Code',
  component: Code
}

export const Basic = () => {
  global.extra = (str) => `!${str}!`

  const options = {
    title: 'tryitout',
    description: 'Building a library should be the main priority. | Once you do that, it should be about sharing it with the world. 🌎 🎉',
    nav: {
      Source: 'https://github.com/gabrielcsapo/tryitout',
      Docs: 'https://github.com/gabrielcsapo/tryitout'
    },
    body: [{
      type: 'text',
      value: `
            > [\`tryitout\`](https://github.com/gabrielcsapo/tryitout) 🎩 a way to build interactive doc pages with configuration files
          `
    }, {
      type: 'code',
      title: 'A simple code example',
      value: `
            function Hello() {
              return extra('hello world');
            }
            Hello();
          `
    }],
    footer: `
          <div class="text-black">Made with ☕️ by <a href="http://www.gabrielcsapo.com">@gabrielcsapo</a></div>
        `
  }
  return <Code {...options} />
}
