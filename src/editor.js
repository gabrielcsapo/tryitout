import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import { cleanString } from '../lib/util';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

import HTML from './html';

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
    const { title, subtitle } = this.props;
    const { value, output, duration } = this.state;
    const { cons, val } = output;

    return (<div style={{ paddingTop: '25px' }}>
        <div className="text-left text-black">
            { cleanString(title) }
            { subtitle ? <div><small> { cleanString(subtitle) } </small></div> : '' }
        </div>
        <br/>
        <div className="panel">
            <div className="panel-body">
              <AceEditor
                mode="javascript"
                theme="monokai"
                name={ Date.now() }
                onChange={ this.onChange.bind(this) }
                value={ value }
                height='317px'
                width='auto'
                editorProps={{$blockScrolling: true}}
              />
            </div>
            <div className="panel-footer" style={{ overflow: 'auto' }}>
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
                          return <pre key={`${i}/${Date.now()}`} style={{ margin: '10px', border: '1px solid #f5f5f5', padding: '5px', position: 'relative' }}> <HTML value={value}/> </pre>
                        }
                        return <pre key={`${i}/${Date.now()}`} style={{ margin: '10px', border: '1px solid #f5f5f5', padding: '5px', position: 'relative' }}>{ value }</pre>
                      })
                    : '' }
                  </span>
                  <button className="run btn" type='button' onClick={ this.run.bind(this) }>Run</button>
              </div>
            </div>
        </div>
    </div>)
  }
}

Editor.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    value: PropTypes.string
};

module.exports = Editor;
