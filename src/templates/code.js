import 'psychic.css/dist/psychic.min.css'
import './code.css'

import React from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import { cleanString } from '../../lib/util'

import HTML from '../HTML'
import Editor from '../Editor'
import Text from '../Text'

class Code extends React.Component {
  render () {
    const { title, description, nav, body, footer, options } = this.props
    const { width } = options

    // Set the title of the window
    document.title = title

    return (
      <div id='container'>
        <div className='navbar navbar-center'>
          <div className='container'>
            <div className='navbar-title'><span className='text-black'>{cleanString(title)}</span></div>
            <div className='nav'>
              {Object.keys(nav).map((k, i) => {
                return <a key={i} href={nav[k]} target='_blank' rel='noopener noreferrer'> {k} </a>
              })}
            </div>
          </div>
        </div>
        <div id='container-content'>
          <h5 className='text-center description'> {cleanString(description)}</h5>
          <div style={{ width, margin: '0 auto' }}>
            {body
              ? body.map((block) => {
                  switch (block.type) {
                    case 'code':
                      return <Editor {...block} />
                    case 'text':
                      return <Text {...block} />
                    case 'html':
                      return <HTML {...block} />
                  }
                })
              : ''}
          </div>
        </div>
        <div className='footer'>
          <HTML value={footer} />
        </div>
      </div>
    )
  }
}

Code.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  nav: PropTypes.object,
  body: PropTypes.array,
  footer: PropTypes.string,
  options: PropTypes.shape({
    width: PropTypes.string
  })
}

Code.defaultProps = {
  title: '',
  description: '',
  nav: {},
  body: [],
  footer: '',
  options: {
    width: '500px'
  }
}

if ((window && window.config) || global.config) {
  const injectedConfig = (window && window.config) || global.config

  render(<Code {...injectedConfig} />, document.getElementById('root'))

  if (injectedConfig.dev) {
    const hash = injectedConfig.hash

    setInterval(function () {
      const xhttp = new XMLHttpRequest()
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          const response = JSON.parse(xhttp.responseText)
          if (response.hash !== hash) {
            location.reload()
          }
        }
      }
      xhttp.open('GET', '/update', true)
      xhttp.send()
    }, 5000)
  }
} else {
  module.exports = Code
}
