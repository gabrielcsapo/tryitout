import React from 'react';

import HTML from '../HTML'

export default {
  title: 'Components/HTML',
  component: HTML
}

export const Basic = () => {
  return (
    <div style={{ padding: '30px' }}>
      <HTML value='<blockquote><b>Hello</b></blockquote>' />
    </div>
  )
}
