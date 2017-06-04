import 'psychic-ui/dist/psychic-min.css';
import './style.css';

import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import AceEditor from 'react-ace';
import Marked from 'marked';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
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
    const { title } = this.props;
    const { value, output, duration } = this.state;
    const { cons, val } = output;

    return (<div style={{ paddingTop: '25px' }}>
        <div className="text-left text-black">
            { title }
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
                  <div className="output">
                    { (!val && !cons) ? 'Output from the example appears here' : '' }
                    { val ? <span> &gt; {val} <br/> </span> : '' }
                    { cons && cons.length > 0 ?
                      cons.map((c, i) => <span key={ i }> { c } <br/> </span>)
                    : '' }
                  </div>
                  <button className="run btn" type='button' onClick={ this.run.bind(this) }>Run</button>
              </div>
            </div>
        </div>
    </div>)
  }
}

Editor.propTypes = {
    value: PropTypes.string,
    title: PropTypes.string
};

class Text extends React.Component {
  render() {
    const { value } = this.props;

    return (
      <div style={{ paddingTop: '50px', paddingBottom: '50px'}} dangerouslySetInnerHTML={{ __html: Marked(value) }}></div>
    )
  }
}

Text.propTypes = {
    value: PropTypes.string
};

class Container extends React.Component {
  render() {
    const { title, description, source, children } = this.props;

    // Set the title of the window
    document.title = title;

    return (
      <div style={{ "height":"100%", "width":"100%" }}>
        <div className="navbar navbar-center">
          <div className="container">
            <div className="navbar-title"><span className="text-black">{ title }</span></div>
            <div className="nav"> <a href={ source } target="_blank" rel="noopener noreferrer">Source</a> </div>
          </div>
        </div>
        <div>
          <h5 className="text-center description"> { description }</h5>
          <div style={{ width: '550px', margin: '0 auto' }}>
            { children }
          </div>
        </div>
      </div>
    );
  }
}

Container.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    source: PropTypes.string,
    children: PropTypes.element.isRequired
};

render(<Container {...source}>
  { source && source.body ?
    source.body.map((block) => {
      switch(block.type) {
        case 'code':
          return <Editor {...block} />
        case 'text':
          return <Text {...block} />
      }
    })
  : '' }
</Container>, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => {
    location.reload();
  });
}
