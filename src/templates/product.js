import 'psychic.css/dist/psychic.min.css';
import './product.css';

import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { cleanString } from '../../lib/util';

class Product extends React.Component {
  render() {
    const { title, description, links, icon, demoImage, options } = this.props;
    const { width } = options;

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
              { links
                ?
                Object.keys(links).map((l, i) => <a key={i} className="btn" href={ links[l] } target="_blank" rel="noopener noreferrer"> { l }</a>)
              : '' }
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
  links: PropTypes.object,
  icon: PropTypes.string,
  demoImage: PropTypes.string,
  options: PropTypes.shape({
    width: PropTypes.string
  })
};

Product.defaultProps = {
  title: "",
  description: "",
  link: "",
  icon: "",
  demoImage: "",
  options: {
    width: "90%"
  }
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
