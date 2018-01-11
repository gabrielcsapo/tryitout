import React from 'react';
import PropTypes from 'prop-types';

const DEFAULT_HEIGHT = 20;

class Textarea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: DEFAULT_HEIGHT,
      value: props.value || '',
    };

    this.setValue = this.setValue.bind(this);
    this.setFilledTextareaHeight = this.setFilledTextareaHeight.bind(this);
  }

  componentDidMount() {
    this.mounted = true;

    this.setFilledTextareaHeight();
  }

  setFilledTextareaHeight() {
    if (this.mounted) {
      const element = this.hidden;

      this.setState({
        height: element.clientHeight,
      });
    }
  }

  setValue(event) {
    const { onChange } = this.props;
    const { value } = event.target;

    this.setState({ value });

    if(onChange) onChange(value);
  }

  getExpandableField() {
    const isOneLine = this.state.height <= DEFAULT_HEIGHT;
    const { height, value } = this.state;

    return (<textarea
      className="textarea"
      name="textarea"
      id="textarea"
      autoFocus={true}
      defaultValue={value}
      style={{
        height,
        resize: isOneLine ? "none" : null
      }}
      onChange={this.setValue}
      onKeyUp={this.setFilledTextareaHeight}
    />);
  }

  getGhostField() {
    return (
      <div
        className="textarea textarea--hidden"
        ref={(c) => this.hidden = c}
        aria-hidden="true"
      >
        {this.state.value}
      </div>
    );
  }

  render() {
    return (
      <div className="textarea-container">
        {this.getExpandableField()}
        {this.getGhostField()}
      </div>
    );
  }
}

Textarea.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.function
};

module.exports = Textarea;
