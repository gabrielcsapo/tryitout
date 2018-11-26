import 'psychic.css/dist/psychic.min.css'

import React from 'react'

import { storiesOf } from '@storybook/react'

import dedent from 'dedent'

import { HTML, Text, Editor } from '../src/index'

import Code from '../src/templates/code.js'
import Product from '../src/templates/product.js'
import Landing from '../src/templates/landing.js'
import Readme from '../src/templates/readme.js'

storiesOf('Text', module)
  .add('basic text', () => {
    return <div style={{ padding: '30px' }}>
      <Text value='Hello I am text!' />
    </div>
  })
  .add('markdown text', () => {
    return <div style={{ padding: '30px' }}>
      <Text value='> *Hello* I am text!' />
    </div>
  })

storiesOf('HTML', module)
  .add('basic html', () => {
    return <div style={{ padding: '30px' }}>
      <HTML value='<blockquote><b>Hello</b></blockquote>' />
    </div>
  })

storiesOf('Editor', module)
  .add('hello world javascript', () => {
    window.extra = (string) => {
      return `!${string}!`
    }

    var options = {
      title: 'Hello World',
      subtitle: 'This is a hello world example',
      value: `
        function hello() {
          return 'hello!';
        }
        hello();
      `
    }
    return <div style={{ padding: '30px' }}>
      <Editor {...options} />
    </div>
  })
  .add('console.html', () => {
    window.extra = (string) => {
      return `!${string}!`
    }

    var options = {
      title: 'Hello World',
      subtitle: 'This is a hello world example',
      value: `
        function html() {
          return \`
            <b> \${hello()} </b>
            <div class="badge badge-default" style="position: absolute; top: 0; right: 0;top: 50%;margin-right:10px;transform: translateY(-50%);">hi</div>
          \`
        }
        function hello() {
          return 'hello!';
        }
        console.log(JSON.stringify({
            name: 'Gabriel J. Csapo',
            age: 23
        }, null, 4))
        console.log(hello());
        console.html(html());
      `
    }
    return <div style={{ padding: '30px' }}>
      <Editor {...options} />
    </div>
  })

storiesOf('Templates', module)
  .add('Code', () => {
    global.extra = (str) => `!${str}!`

    var options = {
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
  })
  .add('Product', () => {
    var options = {
      title: 'Steno',
      description: 'A simple SSH shortcut menu for OSX',
      links: {
        Source: 'https://github.com/gabrielcsapo/steno',
        Download: 'https://github.com/gabrielcsapo/steno/releases'
      },
      icon: require('../docs/assets/steno.png'),
      demoImage: require('../docs/assets/example.gif'),
      footer: `
          <div class="text-black">Made with ☕️ by <a href="http://www.gabrielcsapo.com">@gabrielcsapo</a></div>
        `
    }
    return <Product {...options} />
  })
  .add('Landing', () => {
    const options = {
      title: 'Steno',
      nav: {
        Docs: 'http://gabrielcsapo.com/steno'
      },
      body: `
          <div style="text-align:center;">
            <h4 style="font-weight:100">A simple SSH shortcut menu for OSX</h4>
            <img class="responsive" src="${require('../docs/assets/example.gif')}"/>
          </div>
        `,
      options: {
        width: '50%'
      },
      footer: `
          <div class="text-black" style="font-weight: 100;">Made with ☕️ by <a href="http://www.gabrielcsapo.com">@gabrielcsapo</a></div>
        `
    }
    return <Landing {...options} />
  })
  .add('README', () => {
    const options = {
      title: 'testitout',
      nav: {
        'Source': 'https://github.com/gabrielcsapo/testitout',
        'Docs': 'https://github.com/gabrielcsapo/testitout/docs'
      },
      readme: dedent(`
        # testitout

        > 🚀 run \`go\` and see what happens

        - [Installation](#installation)
        - [Usage](#usage)

        ## Installation

        \`\`\`
        npm install testitout --save-dev
        \`\`\`

        ## Usage

        \`\`\`javascript
        const { go } = require('testitout');
        go();
        \`\`\`
      `)
    }
    return <Readme {...options} />
  })
