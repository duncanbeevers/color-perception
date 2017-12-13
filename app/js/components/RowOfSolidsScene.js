import PropTypes from 'prop-types';
import React, { Component } from 'react';
import React3 from 'react-three-renderer';
import Dimensions from 'react-dimensions';
// import SpinningCube from './SpinningCube';
import Sparkle from './Sparkle';
import Sphere from './Sphere';
import SpinningCube from './SpinningCube';

const style = {
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'stretch',
  flexGrow: 1
};

const cameraPosition = new THREE.Vector3(0, 20, 120);
const cameraLookAt = new THREE.Vector3(0, 0, 0);

const baseCameraProps = {
  fov: 25,
  near: 1,
  far: 2000,
  position: cameraPosition,
  lookAt: cameraLookAt
};

class RowOfSolidsScene extends Component {

  //
  // Render

  render() {
    const {
      containerWidth: width,
      containerHeight: height,
      colors
    } = this.props;

    if (!width || !height) {
      return null;
    }

    const delta = (colors.length - 1) / 2;
    const barWidth = 150;
    const spacing = barWidth / colors.length;

    const lights = [
      new THREE.Vector3(0, -150, -150)
    ];

    const numLights = 1;
    const lightSpacing = barWidth / numLights;
    const lightOffset = barWidth / -2;
    const lightIntensity = 1 / numLights;
    for (let i = 0; i < numLights; i++) {
      lights.push(new THREE.Vector3((i + 0.5) * lightSpacing + lightOffset, 50, 150));
    }

    return (
      <div style={style}>

        <React3
          width={width}
          height={height}
          mainCamera="mainCamera"
          alpha={true}
        >

          <scene>

            <perspectiveCamera
              name="mainCamera"
              aspect={width / height}
              {...baseCameraProps}
            />

            {
              lights.map((lightPosition, i) => (
                <pointLight
                  key={`light:${i}`}
                  color={0xffffff}
                  position={lightPosition}
                  intensity={lightIntensity}
                />
              ))
            }

            {
              colors.map((color, i) => (
                <Sparkle
                  key={`cube:${i}`}
                  color={color}
                  position={new THREE.Vector3((i - delta) * spacing, 0, 0)}
                  i={i}
                />
              ))
            }

          </scene>

        </React3>

      </div>
    );
  }
}

RowOfSolidsScene.propTypes = {
  containerWidth: PropTypes.number.isRequired,
  containerHeight: PropTypes.number.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export default Dimensions({
  containerStyle: {
    display: 'flex',
    flexGrow: 1
  },
  elementResize: true
})(RowOfSolidsScene);
