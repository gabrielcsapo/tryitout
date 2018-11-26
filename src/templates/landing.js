import 'psychic.css/dist/psychic.min.css'
import './landing.css'

import React from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import { HTML } from '../'
import { cleanString } from '../../lib/util'

class Landing extends React.Component {
  render () {
    const { title, nav, body, footer, options } = this.props
    const { width } = options

    // Set the title of the window
    document.title = title

    return (
      <div id='container' style={{ width, textAlign: 'center' }}>
        <div className='navbar'>
          <div className='container'>
            <div className='navbar-title'><span className='text-black'>{ cleanString(title) }</span></div>
            <div className='nav'>
              { Object.keys(nav).map((k, i) => {
                return <a key={i} href={nav[k]} target='_blank' rel='noopener noreferrer'> { k } </a>
              })}
            </div>
          </div>
        </div>
        <div id='container-content'>
          <div style={{ margin: '0 auto' }}>
            <HTML value={body} />
          </div>
        </div>
        <div className='footer'>
          <HTML value={footer} />
        </div>
      </div>
    )
  }
}

Landing.propTypes = {
  title: PropTypes.string,
  body: PropTypes.body,
  nav: PropTypes.array,
  options: PropTypes.shape({
    width: PropTypes.string
  }),
  footer: PropTypes.string
}

Landing.defaultProps = {
  title: '',
  body: '',
  nav: [],
  options: {
    width: '90%'
  },
  footer: ''
}

if ((window && window.config) || global.config) {
  const injectedConfig = (window && window.config) || global.config

  render(<Landing {...injectedConfig} />, document.getElementById('root'))

  if (injectedConfig.dev) {
    const hash = injectedConfig.hash

    setInterval(function () {
      var xhttp = new XMLHttpRequest()
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
  module.exports = Landing
}
