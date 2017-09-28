import { configure } from '@storybook/react';

import 'psychic-ui/dist/psychic-min.css';
import '../src/style.css';

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
