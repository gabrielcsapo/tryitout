import React from 'react'

import Product from '../../templates/product'

export default {
  title: 'Templates/Product',
  component: Product
}

export const Basic = () => {
  const options = {
    title: 'Steno',
    description: 'A simple SSH shortcut menu for OSX',
    links: {
      Source: 'https://github.com/gabrielcsapo/steno',
      Download: 'https://github.com/gabrielcsapo/steno/releases'
    },
    icon: require('../../../docs/assets/steno.png'),
    demoImage: require('../../../docs/assets/example.gif'),
    footer: `
        <div class="text-black">Made with ☕️ by <a href="http://www.gabrielcsapo.com">@gabrielcsapo</a></div>
        `
  }
  return <Product {...options} />
}
