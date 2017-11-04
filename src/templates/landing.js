import 'psychic.css/dist/psychic.min.css';
import './landing.css';

import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { HTML } from '../';
import { cleanString } from '../../lib/util';

class Landing extends React.Component {
  render() {
    const { title, nav, body, footer, options } = this.props;
    const { width } = options;

    // Set the title of the window
    document.title = title;

    return (
      <div id="container" style={{ width }}>
        <div className="navbar">
          <div className="container">
            <div className="navbar-title"><span className="text-black">{ cleanString(title) }</span></div>
            <div className="nav">
              { Object.keys(nav).map((k, i) => {
                return <a key={i} href={ nav[k] } target="_blank" rel="noopener noreferrer"> { k } </a>
              })}
            </div>
          </div>
        </div>
        <div id="container-content">
          <div style={{ margin: '0 auto' }}>
            <HTML value={body}/>
          </div>
        </div>
        <div className="footer">
          <HTML value={footer}/>
        </div>
      </div>
    );
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
};

Landing.defaultProps = {
  title: "",
  body: "",
  nav: [],
  options: {
    width: "90%"
  },
  footer: ""
};

if((window && window.config) || global.config) {
  const injectedConfig = (window && window.config) || global.config;

  render(<Landing {...injectedConfig}/>, document.getElementById('root'));

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
      location.reload();
    });
  }
} else {
  module.exports = Landing;
}
