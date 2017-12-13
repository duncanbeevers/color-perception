import React, { Component } from 'react';
import PropTypes from 'prop-types';
import React3 from 'react-three-renderer';
import Material from './Material';

const boxGeometry = new THREE.BoxGeometry(5, 5, 5);

class Cube extends Component {

  //
  // Render

  render() {
    const {
      color,
      ...otherProps
    } = this.props;

    return (
      <mesh {...otherProps}>
        <Material color={color} />
        <boxGeometry width={5} height={5} depth={5} />
      </mesh>
    );
  }
}

export default Cube;
