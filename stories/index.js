import React from 'react';

import { storiesOf } from '@storybook/react';

import { HTML, Text, Editor } from '../src/index';

import Code from '../src/templates/code.js';
import Product from '../src/templates/product.js';
import Landing from '../src/templates/landing.js';

storiesOf('Text', module)
  .add('basic text', () => <Text value="Hello I am text!"></Text>)
  .add('markdown text', () => <Text value="> *Hello* I am text!"></Text>);

storiesOf('HTML', module)
  .add('basic html', () => <HTML value="<blockquote><b>Hello</b></blockquote>"></HTML>);

storiesOf('Editor', module)
  .add('hello world javascript', () => {
    window.extra = (string) => {
      return `!${string}!`
    }

    var options = {
      title: "Hello World",
      subtitle: "This is a hello world example",
      value: `
        function hello() {
          return 'hello!';
        }
        hello();
      `
    }
    return <Editor {...options}></Editor>
  });

storiesOf('Code Template', module)
  .add('Example Code Template', () => {
    var options = {
        title: "tryitout",
        description: "Building a library should be the main priority. | Once you do that, it should be about sharing it with the world. 🌎 🎉",
        nav: {
          Source: "https://github.com/gabrielcsapo/tryitout",
          Docs: "https://github.com/gabrielcsapo/tryitout"
        },
        body: [{
          type: "text",
          value: `
            > [\`tryitout\`](https://github.com/gabrielcsapo/tryitout) 🎩 a way to build interactive doc pages with configuration files
          `
        }, {
          type: "code",
          title: "A simple code example",
          value: `
            function Hello() {
              return extra('hello world');
            }
            Hello();
          `
        }]
    }
    return <Code {...options}></Code>
  });

storiesOf('Product Template', module)
  .add('Example Product Template', () => {
    var options = {
        title: "Steno",
        description: "A simple SSH shortcut menu for OSX",
        links: {
          Source: 'https://github.com/gabrielcsapo/steno',
          Download: 'https://github.com/gabrielcsapo/steno/releases',
        },
        icon: require('../test/fixtures/steno.png'),
        demoImage: require('../test/fixtures/example.gif')
    }
    return <Product {...options}/>
  });

storiesOf('Landing Template', module)
  .add('Example Landing Template', () => {
    const options = {
        title: 'Steno',
        nav: {
          Docs: 'http://gabrielcsapo.com/steno'
        },
        body: `
          <div style="text-align:center;">
            <h4 style="font-weight:100">A simple SSH shortcut menu for OSX</h4>
            <img class="responsive" src="${require('../test/fixtures/example.gif')}"/>
          </div>
        `,
        options: {
          width: '50%'
        },
        footer: {
          author: 'Gabriel J. Csapo',
          website: 'http://www.gabrielcsapo.com'
        }
    };
    return <Landing {...options}/>
  });
