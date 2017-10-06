import React from 'react';

import { storiesOf } from '@storybook/react';

import { HTML, Text, Editor } from '../src/index';
import Code from '../src/templates/code.js';
import Product from '../src/templates/product.js';

storiesOf('Text', module)
  .add('basic text', () => <Text value="Hello I am text!"></Text>)
  .add('markdown text', () => <Text value="> *Hello* I am text!"></Text>);

storiesOf('HTML', module)
  .add('basic html', () => <HTML value="<blockquote><b>Hello</b></blockquote>"></HTML>);

storiesOf('Editor', module)
  .add('hello world javascript', () => {
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
        sourceCodeLink: 'https://github.com/gabrielcsapo/steno',
        downloadLink: 'https://github.com/gabrielcsapo/steno/releases',
        icon: require('../test/fixtures/steno.png'),
        demoImage: require('../test/fixtures/example.gif')
    }
    return <Product {...options}/>
  });
