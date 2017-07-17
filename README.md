# tryitout

[![Build Status](https://travis-ci.org/gabrielcsapo/tryitout.svg?branch=master)](https://travis-ci.org/gabrielcsapo/tryitout)
[![Dependency Status](https://david-dm.org/gabrielcsapo/tryitout.svg)](https://david-dm.org/gabrielcsapo/tryitout)
[![devDependency Status](https://david-dm.org/gabrielcsapo/tryitout/dev-status.svg)](https://david-dm.org/gabrielcsapo/tryitout#info=devDependencies)
[![Coverage Status](https://node-coverage-server.herokuapp.com/badge/github%2Ecom/gabrielcsapo/tryitout.svg)](https://node-coverage-server.herokuapp.com/coverage/github%2Ecom/gabrielcsapo/tryitout)
[![npm](https://img.shields.io/npm/dt/tryitout.svg?maxAge=2592000)]()
[![npm](https://img.shields.io/npm/dm/tryitout.svg?maxAge=2592000)]()

> a way to try out libraries on the browser

Do you have a cool client side library that you want to show a quick tutorial about how to use it?

What if you could build a quick demo application with the following;

```json
{
    "title": "Hello World",
    "description": "When you want a hello world example and just want a simple example cli",
    "source": "https://github.com/gabrielcsapo/tryitout",
    "body": [{
      "type": "text",
      "value": "To write a simple hello world function simply do the following"
    },{
      "type": "code",
      "title": "Hello World Example",
      "value": "function Hello() {\n    return 'hello world'\n}"
    }],
    "output": "./docs"
}
```

> If you create a file named `tryitout.json` all you have to do is call `tryitout` and it will pick up that file by default in the current working directory

## Usage

```
Usage: tryitout [options]

Options:

  -h, --help             output usage information
  -V, --version          output the version number
  -s, --source <source>  The source json file that explain what you want to try out
  -o, --out [directory]  The output directory
  -w, --watch            Watch for changes and compile when changes are made
```
