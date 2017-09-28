import React from 'react';
import PropTypes from 'prop-types';
import { cleanString } from '../lib/util';

import HTML from './html';
import Editor from './editor';
import Text from './text';

class Container extends React.Component {
  render() {
    const { title, description, nav, options={}, body } = this.props;
    const { width="500px" } = options;

    // Set the title of the window
    document.title = title;

    return (
      <div style={{ "height":"100%", "width":"100%" }}>
        <div className="navbar navbar-center">
          <div className="container">
            <div className="navbar-title"><span className="text-black">{ cleanString(title) }</span></div>
            <div className="nav">
              { Object.keys(nav).map((k, i) => {
                return <a key={i} href={ nav[k] } target="_blank" rel="noopener noreferrer"> { k } </a>
              })}
            </div>
          </div>
        </div>
        <div>
          <h5 className="text-center description"> { cleanString(description) }</h5>
          <div style={{ width, margin: '0 auto' }}>
           { body ?
             body.map((block) => {
               switch(block.type) {
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
      </div>
    );
  }
}

Container.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    nav: PropTypes.object,
    body: PropTypes.array,
    options: PropTypes.object,
    children: PropTypes.element.isRequired
};

module.exports = Container;
