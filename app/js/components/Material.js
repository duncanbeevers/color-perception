import React, { Component } from 'react';

class Material extends Component {

  //
  // Render

  render() {
    const {
      color
    } = this.props;

    return (
      <meshPhongMaterial
        color={color}
      />
    )
  }

}

export default Material;
