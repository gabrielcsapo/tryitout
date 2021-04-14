import React from 'react'

import Landing from '../../templates/landing'

export default {
  title: 'Templates/Landing',
  component: Landing
}

export const Basic = () => {
  const options = {
    title: 'Steno',
    nav: {
      Docs: 'http://gabrielcsapo.com/steno'
    },
    body: `
            <div style="text-align:center;">
                <h4 style="font-weight:100">A simple SSH shortcut menu for OSX</h4>
                <img class="responsive" src="${require('../../../docs/assets/example.gif')}"/>
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
}
