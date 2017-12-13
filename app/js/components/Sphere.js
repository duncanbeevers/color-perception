import React, { Component } from 'react';
import PropTypes from 'prop-types';
import React3 from 'react-three-renderer';
import Solid from './Solid';

const sphereGeometry = new THREE.SphereGeometry(10, 8, 8);

class Sphere extends Solid {

  //
  // Render

  render() {
    const cubeProps = Object.assign({}, {
      geometry: sphereGeometry,
      material: this.material,
      scale: new THREE.Vector3(1, 1, 1)
    }, this.props);

    return (
      <mesh {...cubeProps} />
    );
  }
}

export default Sphere;
