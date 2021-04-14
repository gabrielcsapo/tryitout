import React from 'react'
import PropTypes from 'prop-types'
import { cleanString } from '../lib/util'

class HTML extends React.Component {
  render () {
    const { value } = this.props

    return (
      <div dangerouslySetInnerHTML={{ __html: cleanString(value.toString()) }} />
    )
  }
}

HTML.propTypes = {
  value: PropTypes.string
}

export default HTML
