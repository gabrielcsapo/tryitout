import { configure } from '@storybook/react';

import 'psychic.css/dist/psychic.min.css';

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
