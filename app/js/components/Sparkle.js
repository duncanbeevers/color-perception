import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cube from './Cube';
import Sphere from './Sphere';
import Spinning from './Spinning';

class Sparkle extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    const maxRadius = 10;
    const minRadius = 5;

    const shapes = [];
    for (let i = 0; i < 15; i++) {
      const radius = Math.random() * (maxRadius - minRadius) + minRadius;
      const size = 1 - Math.tan(radius) / 1.5;
      const xRot = Math.random() * Math.PI * 2;
      const yRot = Math.random() * Math.PI * 2;
      const zRot = Math.random() * Math.PI * 2;
      const position = new THREE.Vector3(radius, 0, 0);
      const rotation = new THREE.Euler(
        xRot,
        yRot, zRot
      );

      position.applyEuler(rotation);
      const scaleScalar = 1 - Math.tan(radius / maxRadius) / 1.5;
      const scale = new THREE.Vector3(scaleScalar, scaleScalar, scaleScalar);

      shapes.push({
        position,
        rotation,
        scale
      });
    }

    this.shapes = shapes;
  }

  //
  // Render

  renderGroup = (rotation) => {
    const {
      color,
      position
    } = this.props;

    const shapes = this.shapes;

    return (
      <group
        position={position}
        rotation={rotation}
      >

        {
          shapes.map((shape, i) => (
            <Cube
              key={i}
              position={shape.position}
              rotation={shape.rotation}
              scale={shape.scale}
              color={color}
            />
          ))
        }

      </group>
    );
  };

  render() {
    const {
      i
    } = this.props;

    return (
      <Spinning i={i}>
        {this.renderGroup}
      </Spinning>
    );
  }

}

export default Sparkle;
