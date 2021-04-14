import './Editor.css'

import React from 'react'
import PropTypes from 'prop-types'
import MonacoEditor from 'react-monaco-editor'

import { cleanString } from '../lib/util'

class Editor extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: cleanString(props.value),
      output: {},
      duration: 0
    }
  }

  run () {
    const self = this
    const { value } = this.state;

    (function () {
      const c = {
        cons: []
      }
      c.log = function () {
        c.cons.push({
          type: 'text',
          value: Array.prototype.join.call(arguments, ' ')
        })
        self.setState({
          output: c
        })
      }
      c.html = function (html) {
        c.cons.push({
          type: 'html',
          value: html
        })
        self.setState({
          output: c
        })
      }
      const start = Date.now()
      try {
          (function(console){ // eslint-disable-line
          c.val = eval(value) // eslint-disable-line
        })(c)
      } catch (err) {
        c.log('Error:', err)
      }
      self.setState({
        output: c,
        duration: Date.now() - start
      })
    })()

    return this
  }

  onChange (value) {
    this.setState({
      value
    })
  }

  render () {
    const { title, subtitle } = this.props
    const { value, output, duration } = this.state
    const { cons, val } = output

    return (
      <div className='editor'>
        <div className='text-left text-black' style={{ marginBottom: '5px' }}>
          {cleanString(title)}
          {subtitle ? <div><small> {cleanString(subtitle)} </small></div> : ''}
        </div>

        <div className='textarea' style={{ position: 'relative', border: '1px solid rgb(207, 207, 196)', borderBottom: 0, borderTopRightRadius: '5px', borderTopLeftRadius: '5px', padding: '6px' }}>
          <MonacoEditor
            width='100%'
            height='200px'
            language='javascript'
            theme='vs'
            value={value}
            options={{ selectOnLineNumbers: true }}
            onChange={this.onChange.bind(this)}
          />
        </div>
        <div style={{ overflow: 'auto', border: '1px solid #cfcfc4', padding: '0', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px' }}>
          <div className='time'>
            Run took {duration}ms
          </div>
          <div className='console'>
            <span className='output'>
              {(!val && !cons) ? <div><pre style={{ whiteSpace: 'pre-wrap', margin: 0, borderRadius: 0 }}>Output from the example appears here</pre></div> : ''}
              {val ? <div><pre style={{ whiteSpace: 'pre-wrap', margin: 0, borderRadius: 0 }}>{val.toString()}</pre></div> : ''}
              {cons && cons.length > 0
                ? cons.map((c, i) => {
                    const { type, value } = c
                    if (type === 'html') {
                      return <pre key={`${i}/${Date.now()}`} style={{ margin: '10px', border: '1px solid #f5f5f5', padding: '5px', position: 'relative' }}> <div dangerouslySetInnerHTML={{ __html: value.toString() }} /> </pre>
                    }
                    return <pre key={`${i}/${Date.now()}`} style={{ margin: '10px', border: '1px solid #f5f5f5', padding: '5px', position: 'relative' }}>{value}</pre>
                  })
                : ''}
            </span>
            <button className='run' type='button' onClick={this.run.bind(this)}>Run</button>
          </div>
        </div>
      </div>
    )
  }
}

Editor.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  value: PropTypes.string
}

export default Editor
