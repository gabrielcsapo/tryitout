module.exports = {
    "title": "tryitout",
    "description": "Building a library should be the main priority. | Once you do that, it should be about sharing it with the world. 🌎 🎉",
    "source": "https://github.com/gabrielcsapo/tryitout",
    "body": [{
      "type": "text",
      "value": `
        > [\`tryitout\`](https://github.com/gabrielcsapo/tryitout) 🎩 a way to build interactive doc pages with configuration files
      `
    },{
      "type": "text",
      "value": `
        Using this is so simple, just simple create a \`tryitout.json\` or \`tryitout.js\` file with the contents that adhere to the following schema:

        \`\`\`json
        {
         "title": "String"
         "description": "String"
         "source": "Url",
         "output": "Path"
         "body": "Array",
         "externals": "Array"
        }
        \`\`\`

        Then all you need to do is run \`tryitout\`

        A common use case for doc websites is to show off functionality in a \`commonjs\` module.

        In the example below \`extra\` is a function that is exposed globally in \`docs/extra.js\`.

        It exposed to this page via the externals attribute as such:

        \`\`\`js
        "externals": [
          "./docs/extra.js"
        ]
        \`\`\`
        `
    }, {
      "type": "code",
      "title": "A simple code example",
      "value": `
        function Hello() {
          return extra('hello world');
        }
        Hello();
      `
    }, {
      "type": "text",
      "value": `
        The easiest way to get started is by creating \`tryitout.js\` in your current working directory with the contents:

        \`\`\`js
        module.exports = {
            title: "Hello World",
            description: "When you want a hello world example and just want a simple example cli",
            source: "https://github.com/gabrielcsapo/tryitout",
            body: [{
              type: "text",
              value: \`
                To write a simple hello world function simply do the following
              \`
            },{
              type: "code",
              title: "Hello World Example",
              value: \`
                function Hello() {
                  return 'hello world'
                }
              \`
            }],
            output: "./docs"
        }
        \`\`\`

        Then run \`tryitout --watch\`, this will spawn a webserver and editing the file will show results on subsequent page loads
      `
    }, {
      "type": "html",
      "value": `
        <div style='text-align:center'>
          <h3>Thanks for trying it out 😉</h3>
          <small>Add some cool examples of what you are using this for 🚀</small>
        </div>
      `
    }],
    "output": "./docs",
    "externals": [
      "./docs/extra.js"
    ]
}
