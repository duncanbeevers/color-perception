import { Component } from 'react';
import PropTypes from 'prop-types';

function unboundAnimationCallback() {
  const animationCallback = this._animationCallback;
  // If there is no animation callback, the component has been unmounted
  if (!animationCallback) {
    return;
  }

  this.setState(() => ({ elapsed: Date.now() - this._start }));
  window.requestAnimationFrame(animationCallback);
};

class Animate extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this._start = props.start != null ? props.start : Date.now();
    this._animationCallback = unboundAnimationCallback.bind(this);

    this.state = {
      elapsed: 0,
    };
  }

  componentDidMount() {
    window.requestAnimationFrame(this._animationCallback);
  }

  componentWillUnmount() {
    this._animationCallback = null;
  }

  //
  // Render

  render() {
    const {
      start,
      mapTime,
      render,
      ...otherProps
    } = this.props;

    return render(mapTime(this.state.elapsed), otherProps);
  }
}

Animate.propTypes = {
  startTime: PropTypes.number,
  mapTime: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired
}

Animate.defaultProps = {
  mapTime: () => {}
};

export default Animate;
