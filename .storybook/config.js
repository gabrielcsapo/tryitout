import { configure } from '@storybook/react';

import 'psychic-ui/dist/psychic-min.css';

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
