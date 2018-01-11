import './editor.css';

import React from 'react';
import PropTypes from 'prop-types';

import Textarea from './textarea.js';
import { cleanString } from '../lib/util';

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: cleanString(props.value),
      output: {},
      duration: 0
    }
  }
  run() {
    const self = this;
    const { value } = this.state;

    (function(){
      var c = {
        cons: []
      };
      c.log = function() {
        c.cons.push({
          type: 'text',
          value: Array.prototype.join.call(arguments, ' ')
        });
        self.setState({
          output: c
        });
      };
      c.html = function(html) {
        c.cons.push({
          type: 'html',
          value: html
        });
        self.setState({
          output: c
        });
      };
      const start = Date.now();
      try {
          (function(console){ // eslint-disable-line
              c.val = eval(value);
          })(c);
      } catch (err) {
          c.log("Error:", err);
      }
      self.setState({
        output: c,
        duration: Date.now() - start
      });
    })();

    return this;
  }
  onChange(value) {
    this.setState({
      value
    });
  }
  render() {
    const { value, output, duration } = this.state;
    const { cons, val } = output;

    return (<div>
      <Textarea
        onChange={ this.onChange.bind(this) }
        value={ value }
      />
      <div style={{ overflow: 'auto', border: '1px solid #cfcfc4', padding: '0', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px' }}>
       <div className="time">
         Run took { duration }ms
       </div>
        <div className="console">
            <span className="output">
              { (!val && !cons) ? <div><pre style={{ whiteSpace: 'pre-wrap', margin: 0, borderRadius: 0 }}>Output from the example appears here</pre></div> : '' }
              { val ? <div><pre style={{ whiteSpace: 'pre-wrap', margin: 0, borderRadius: 0 }}>{val.toString()}</pre></div> : '' }
              { cons && cons.length > 0 ?
                cons.map((c, i) => {
                  const { type, value } = c;
                  if(type == 'html') {
                    return <pre key={`${i}/${Date.now()}`} style={{ margin: '10px', border: '1px solid #f5f5f5', padding: '5px', position: 'relative' }}> <div dangerouslySetInnerHTML={{ __html: value.toString() }}/> </pre>
                  }
                  return <pre key={`${i}/${Date.now()}`} style={{ margin: '10px', border: '1px solid #f5f5f5', padding: '5px', position: 'relative' }}>{ value }</pre>
                })
              : '' }
            </span>
            <button className="run" type='button' onClick={ this.run.bind(this) }>Run</button>
        </div>
      </div>
    </div>)
  }
}

Editor.propTypes = {
  value: PropTypes.string
};

module.exports = Editor;
