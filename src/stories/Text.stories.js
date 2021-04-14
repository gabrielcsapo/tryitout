import React from 'react';

import Text from '../Text'

export default {
  title: 'Components/Text',
  component: Text
}

export const Basic = () => {
  return (
    <div style={{ padding: '30px' }}>
      <Text value='Hello I am text!' />
    </div>
  )
}

export const Markdown = () => {
  return (
    <div style={{ padding: '30px' }}>
      <Text value='> *Hello* I am text!' />
    </div>
  )
}
