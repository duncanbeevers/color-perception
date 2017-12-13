import React, { Component } from 'react';

const style = {
  textAlign: 'center',
  fontSize: '32px',
  fontFamily: 'sans-serif',
  fontWeight: 'strong',
  marginTop: '4px'
};

class Title extends Component {

  //
  // Render

  render() {
    return (
      <div style={style}>{this.props.children}</div>
    );
  }

}

export default Title;
