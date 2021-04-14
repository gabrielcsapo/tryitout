import React from 'react';

import Editor from '../Editor'

export default {
  title: 'Components/Editor',
  component: Editor
}

export const Hello = () => {
  window.extra = (string) => {
    return `!${string}!`
  }

  const options = {
    title: 'Hello World',
    subtitle: 'This is a hello world example',
    value: `
            function hello() {
            return 'hello!';
            }
            hello();
        `
  }

  return (
    <div style={{ padding: '30px' }}>
      <Editor {...options} />
    </div>
  )
}
Hello.storyName = 'hello world javascript'

export const Console = () => {
  window.extra = (string) => {
    return `!${string}!`
  }

  const options = {
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
  return (
    <div style={{ padding: '30px' }}>
      <Editor {...options} />
    </div>
  )
}
