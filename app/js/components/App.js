import React, { Component } from 'react';
import { hsluvToHex } from 'hsluv';
import hslToHex from 'hsl-to-hex';
import { GUI, Number } from 'dis-gui';
import RowOfSolidsScene from './RowOfSolidsScene';
import Title from './Title';
import PercentSlider from './PercentSlider';

const style = {
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'stretch',
  flexDirection: 'column',
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};

class App extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      saturation: 90,
      lightness: 60,
      steps: 12
    };
  }

  //
  // Listeners

  onLightnessChange = (lightness) => {
    this.setState(() => ({ lightness }));
  };

  onSaturationChange = (saturation) => {
    this.setState(() => ({ saturation }));
  };

  onStepsChange = (steps) => {
    this.setState(() => ({ steps }));
  };

  //
  // Render

  render() {
    const {
      saturation,
      lightness,
      steps
    } = this.state;

    //
    // Set up colors

    const hueScalar = 360 / steps;
    const hsluvColors = [];
    const hslColors = [];
    for (let i = 0; i < steps; i++) {
      const hue = Math.floor(i * hueScalar);
      hsluvColors.push(hsluvToHex([hue, saturation, lightness]));
      hslColors.push(hslToHex(hue, saturation, lightness));
    }

    return (
      <div style={style}>
        <Title>HSLuv</Title>
        <RowOfSolidsScene colors={hsluvColors} />

        <Title>HSL</Title>
        <RowOfSolidsScene colors={hslColors} />

        <GUI>
          <PercentSlider
            label="Saturation"
            value={saturation}
            onChange={this.onSaturationChange}
          />
          <PercentSlider
            label="Ligthness"
            value={lightness}
            onChange={this.onLightnessChange}
          />
          <PercentSlider
            label="Steps"
            value={steps}
            onChange={this.onStepsChange}
          />
        </GUI>

      </div>
    );
  }

}

export default App;
