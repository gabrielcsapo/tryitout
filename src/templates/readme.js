import 'psychic.css/dist/psychic.min.css';
import './readme.css';
import './code.css';

import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import Markdown from 'react-markdown';
import { cleanString } from '../../lib/util';

import HTML from '../html';
import Editor from '../editor';

class Readme extends React.Component {
  render() {
    const { title, nav, readme, footer, options } = this.props;
    const { width } = options;

    // Set the title of the window
    document.title = title;

    return (
      <div id="container">
        <div className="navbar navbar-center">
          <div className="container">
            <div className="navbar-title"><span className="text-black">{ cleanString(title) }</span></div>
            <div className="nav">
              { Object.keys(nav).map((k, i) => {
                return <a key={i} href={ nav[k] } target="_blank" rel="noopener noreferrer"> { k } </a>
              }, [])}
            </div>
          </div>
        </div>
        <div id="container-content">
          <div style={{ width, margin: '0 auto' }}>
            <Markdown source={readme} renderers={{
              'code': function(prop) {
                if(prop.language === 'javascript') {
                    return <Editor value={prop.value}/>
                }
                return <pre className="code">
                  <code> { prop.value } </code>
                </pre>
              }
            }}
            />
          </div>
        </div>
        <div className="footer">
          <HTML value={footer}/>
        </div>
      </div>
    );
  }
}

Readme.propTypes = {
  title: PropTypes.string,
  nav: PropTypes.object,
  readme: PropTypes.string,
  footer: PropTypes.string,
  options: PropTypes.shape({
    width: PropTypes.string
  })
};

Readme.defaultProps = {
  title: "",
  nav: {},
  readme: "",
  footer: "",
  options: {
    width: "90%"
  }
};

if((window && window.config) || global.config) {
  const injectedConfig = (window && window.config) || global.config;

  render(<Readme {...injectedConfig}/>, document.getElementById('root'));

  if (injectedConfig.dev) {
    const hash = injectedConfig.hash;

    setInterval(function() {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            const response = JSON.parse(xhttp.responseText);
            if(response.hash !== hash) {
              location.reload();
            }
          }
      };
      xhttp.open("GET", "/update", true);
      xhttp.send();
    }, 5000)
  }
} else {
  module.exports = Readme;
}
