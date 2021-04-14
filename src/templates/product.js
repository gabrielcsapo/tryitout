import 'psychic.css/dist/psychic.min.css'
import './product.css'

import React from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import { cleanString } from '../../lib/util'

import HTML from '../HTML'

class Product extends React.Component {
  render () {
    const { title, description, links, icon, demoImage, footer, options } = this.props
    const { width } = options

    // Set the title of the window
    document.title = title

    return (
      <div id='container'>
        <div id='container-content'>
          <div style={{ width, margin: '20px auto', padding: '15px' }}>
            <div className='grid'>
              <div className='col-lg-6-12 col-md-6-12 col-sm-12-12 col-xs-12-12 text-center'>
                <img src={icon} width='150' />
                <h1>{cleanString(title)}</h1>
                <h3 style={{ fontWeight: '300' }}>{cleanString(description)}</h3>
                {links
                  ? Object.keys(links).map((l, i) => <a key={i} className='btn' href={links[l]} target='_blank' rel='noopener noreferrer'> {l}</a>)
                  : ''}
              </div>
              <div className='col-lg-6-12 col-md-6-12 col-sm-12-12 col-xs-12-12'>
                <img className='responsive' src={demoImage} />
              </div>
            </div>
          </div>
        </div>
        <div className='footer'>
          <HTML value={footer} />
        </div>
      </div>
    )
  }
}

Product.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  links: PropTypes.object,
  icon: PropTypes.string,
  demoImage: PropTypes.string,
  footer: PropTypes.string,
  options: PropTypes.shape({
    width: PropTypes.string
  })
}

Product.defaultProps = {
  title: '',
  description: '',
  link: '',
  icon: '',
  demoImage: '',
  footer: '',
  options: {
    width: '90%'
  }
}

if ((window && window.config) || global.config) {
  const injectedConfig = (window && window.config) || global.config

  render(<Product {...injectedConfig} />, document.getElementById('root'))

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
  module.exports = Product
}
