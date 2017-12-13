import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Number } from 'dis-gui';

class PercentSlider extends Component {

  //
  // Render

  render() {
    const {
      label,
      value,
      onChange
    } = this.props;

    return (
      <Number
        label={label}
        min={1}
        max={100}
        step={1}
        value={value}
        onChange={onChange}
      />
    );
  }

}

PercentSlider.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default PercentSlider;
