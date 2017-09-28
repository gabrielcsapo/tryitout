import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import { cleanString } from '../lib/util';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

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
          c.cons.push(Array.prototype.join.call(arguments, ' '));
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
                    { (!val && !cons) ? 'Output from the example appears here' : '' }
                    { val ? <pre> &gt; {val} <br/> </pre> : '' }
                    { cons && cons.length > 0 ?
                      cons.map((c, i) => <pre key={ i }> { c } <br/> </pre>)
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
