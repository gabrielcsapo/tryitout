import 'psychic-ui/dist/psychic-min.css';
import './src/style.css';

import React from 'react';
import { render } from 'react-dom';
import { Container } from './src/index';

const injectedSource = (window && window.source) || source;

render(<Container {...injectedSource}/>, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => {
    location.reload();
  });
}
