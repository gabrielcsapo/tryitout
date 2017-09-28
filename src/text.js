import React from 'react';
import PropTypes from 'prop-types';
import Marked from 'marked';
import { cleanString } from '../lib/util';

class Text extends React.Component {
  render() {
    const { value } = this.props;

    return (
      <div style={{ paddingTop: '50px', paddingBottom: '50px'}} dangerouslySetInnerHTML={{ __html: Marked(cleanString(value)) }}></div>
    )
  }
}

Text.propTypes = {
    value: PropTypes.string
};

module.exports = Text;
