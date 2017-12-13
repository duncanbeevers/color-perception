import React, { Component } from 'react';
import Cube from './Cube';
import Spinning from './Spinning';

class SpinningCube extends Component {

  //
  // Render

  renderCube = (rotation) => {
    const {
      color,
      position
    } = this.props;

    return (
      <Cube
        color={color}
        position={position}
        rotation={rotation}
      />
    );
  };

  render() {
    const {
      i
    } = this.props;

    return (
      <Spinning i={i}>
        {this.renderCube}
      </Spinning>
    );
  }
}

export default SpinningCube;
