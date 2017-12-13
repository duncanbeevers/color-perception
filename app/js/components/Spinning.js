import React, { Component } from 'react';
import PropTypes from 'prop-types';
import React3 from 'react-three-renderer';
import Animate from './Animate';

const iTimeScalar = 100;

class Spinning extends Component {

  //
  // Control

  mapTimeToRotation = (time) => {
    const t = this.props;
    const { i } = this.props;
    const scaledTime = time + i * iTimeScalar;

    const xRotScalar = 1 / 12000;
    const yRotScalar = 1 / 29000;
    const zRotScalar = 1 / 45000;

    return new THREE.Euler(
      Math.sin(scaledTime * xRotScalar) * 2 * Math.PI,
      Math.sin(scaledTime * yRotScalar) * 2 * Math.PI,
      Math.sin(scaledTime * zRotScalar) * 2 * Math.PI
    );
  };

  //
  // Render

  renderCube = (rotation) => {
    return this.props.children(rotation);
  };

  render() {
    return (
      <Animate
        start={0}
        mapTime={this.mapTimeToRotation}
        render={this.renderCube}
      />
    );
  }

}

Spinning.propTypes = {
  children: PropTypes.func.isRequired,
  i: PropTypes.number.isRequired
};

export default Spinning;
