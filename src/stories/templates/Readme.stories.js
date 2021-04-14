import React from 'react'
import dedent from 'dedent'

import Readme from '../../templates/readme'

export default {
  title: 'Templates/Readme',
  component: Readme
}

export const Basic = () => {
  const options = {
    title: 'testitout',
    nav: {
      Source: 'https://github.com/gabrielcsapo/testitout',
      Docs: 'https://github.com/gabrielcsapo/testitout/docs'
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
}
