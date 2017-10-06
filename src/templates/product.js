import 'psychic-ui/dist/psychic-min.css';
import '../style.css';

import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { cleanString } from '../../lib/util';

class Product extends React.Component {
  render() {
    const { title, description, sourceCodeLink, downloadLink, icon, demoImage, options } = this.props;
    const { width="90%" } = options;

    // Set the title of the window
    document.title = title;

    return (
      <div style={{ "width":"100%", "position": "absolute", "top":"50%", "transform":"translateY(-50%)" }}>
        <div style={{ width, margin: '0 auto', "padding": "15px" }}>
          <div className="grid">
            <div className="col-6-12 text-center">
              <img src={ icon } width="150"/>
              <h1>{ cleanString(title) }</h1>
              <h3 style={{ "fontWeight": "300" }}>{ cleanString(description) }</h3>
              <a className="btn" href={ sourceCodeLink } target="_blank" rel="noopener noreferrer">Source Code</a>
              <a className="btn" href={ downloadLink } target="_blank" rel="noopener noreferrer">Download</a>
            </div>
            <div className="col-6-12">
              <img className="responsive" src={ demoImage }/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Product.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  sourceCodeLink: PropTypes.string,
  downloadLink: PropTypes.string,
  icon: PropTypes.string,
  demoImage: PropTypes.string,
  options: PropTypes.object
};

Product.defaultProps = {
  title: "",
  description: "",
  sourceCodeUrl: "",
  icon: "",
  demoImage: "",
  options: {}
};

if((window && window.source) || global.source) {
  const injectedSource = (window && window.source) || global.source;

  render(<Product {...injectedSource}/>, document.getElementById('root'));

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
      location.reload();
    });
  }
} else {
  module.exports = Product;
}
