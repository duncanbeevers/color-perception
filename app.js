(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("js/components/Animate.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function unboundAnimationCallback() {
  var _this = this;

  var animationCallback = this._animationCallback;
  // If there is no animation callback, the component has been unmounted
  if (!animationCallback) {
    return;
  }

  this.setState(function () {
    return { elapsed: Date.now() - _this._start };
  });
  window.requestAnimationFrame(animationCallback);
};

var Animate = function (_Component) {
  _inherits(Animate, _Component);

  //
  // Lifecycle

  function Animate(props, context) {
    _classCallCheck(this, Animate);

    var _this2 = _possibleConstructorReturn(this, (Animate.__proto__ || Object.getPrototypeOf(Animate)).call(this, props, context));

    _this2._start = props.start != null ? props.start : Date.now();
    _this2._animationCallback = unboundAnimationCallback.bind(_this2);

    _this2.state = {
      elapsed: 0
    };
    return _this2;
  }

  _createClass(Animate, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.requestAnimationFrame(this._animationCallback);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._animationCallback = null;
    }

    //
    // Render

  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          start = _props.start,
          mapTime = _props.mapTime,
          render = _props.render,
          otherProps = _objectWithoutProperties(_props, ['start', 'mapTime', 'render']);

      return render(mapTime(this.state.elapsed), otherProps);
    }
  }]);

  return Animate;
}(_react.Component);

Animate.propTypes = {
  startTime: _propTypes2.default.number,
  mapTime: _propTypes2.default.func.isRequired,
  render: _propTypes2.default.func.isRequired
};

Animate.defaultProps = {
  mapTime: function mapTime() {}
};

exports.default = Animate;
});

require.register("js/components/App.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _hsluv = require('hsluv');

var _hslToHex = require('hsl-to-hex');

var _hslToHex2 = _interopRequireDefault(_hslToHex);

var _disGui = require('dis-gui');

var _RowOfSolidsScene = require('./RowOfSolidsScene');

var _RowOfSolidsScene2 = _interopRequireDefault(_RowOfSolidsScene);

var _Title = require('./Title');

var _Title2 = _interopRequireDefault(_Title);

var _PercentSlider = require('./PercentSlider');

var _PercentSlider2 = _interopRequireDefault(_PercentSlider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var style = {
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

var App = function (_Component) {
  _inherits(App, _Component);

  //
  // Lifecycle

  function App(props, context) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props, context));

    _this.onLightnessChange = function (lightness) {
      _this.setState(function () {
        return { lightness: lightness };
      });
    };

    _this.onSaturationChange = function (saturation) {
      _this.setState(function () {
        return { saturation: saturation };
      });
    };

    _this.onStepsChange = function (steps) {
      _this.setState(function () {
        return { steps: steps };
      });
    };

    _this.state = {
      saturation: 90,
      lightness: 60,
      steps: 12
    };
    return _this;
  }

  //
  // Listeners

  _createClass(App, [{
    key: 'render',


    //
    // Render

    value: function render() {
      var _state = this.state,
          saturation = _state.saturation,
          lightness = _state.lightness,
          steps = _state.steps;

      //
      // Set up colors

      var hueScalar = 360 / steps;
      var hsluvColors = [];
      var hslColors = [];
      for (var i = 0; i < steps; i++) {
        var hue = Math.floor(i * hueScalar);
        hsluvColors.push((0, _hsluv.hsluvToHex)([hue, saturation, lightness]));
        hslColors.push((0, _hslToHex2.default)(hue, saturation, lightness));
      }

      return _react2.default.createElement(
        'div',
        { style: style },
        _react2.default.createElement(
          _Title2.default,
          null,
          'HSLuv'
        ),
        _react2.default.createElement(_RowOfSolidsScene2.default, { colors: hsluvColors }),
        _react2.default.createElement(
          _Title2.default,
          null,
          'HSL'
        ),
        _react2.default.createElement(_RowOfSolidsScene2.default, { colors: hslColors }),
        _react2.default.createElement(
          _disGui.GUI,
          null,
          _react2.default.createElement(_PercentSlider2.default, {
            label: 'Saturation',
            value: saturation,
            onChange: this.onSaturationChange
          }),
          _react2.default.createElement(_PercentSlider2.default, {
            label: 'Ligthness',
            value: lightness,
            onChange: this.onLightnessChange
          }),
          _react2.default.createElement(_PercentSlider2.default, {
            label: 'Steps',
            value: steps,
            onChange: this.onStepsChange
          })
        )
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;
});

require.register("js/components/Cube.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactThreeRenderer = require('react-three-renderer');

var _reactThreeRenderer2 = _interopRequireDefault(_reactThreeRenderer);

var _Material = require('./Material');

var _Material2 = _interopRequireDefault(_Material);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var boxGeometry = new THREE.BoxGeometry(5, 5, 5);

var Cube = function (_Component) {
  _inherits(Cube, _Component);

  function Cube() {
    _classCallCheck(this, Cube);

    return _possibleConstructorReturn(this, (Cube.__proto__ || Object.getPrototypeOf(Cube)).apply(this, arguments));
  }

  _createClass(Cube, [{
    key: 'render',


    //
    // Render

    value: function render() {
      var _props = this.props,
          color = _props.color,
          otherProps = _objectWithoutProperties(_props, ['color']);

      return _react2.default.createElement(
        'mesh',
        otherProps,
        _react2.default.createElement(_Material2.default, { color: color }),
        _react2.default.createElement('boxGeometry', { width: 5, height: 5, depth: 5 })
      );
    }
  }]);

  return Cube;
}(_react.Component);

exports.default = Cube;
});

require.register("js/components/Material.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Material = function (_Component) {
  _inherits(Material, _Component);

  function Material() {
    _classCallCheck(this, Material);

    return _possibleConstructorReturn(this, (Material.__proto__ || Object.getPrototypeOf(Material)).apply(this, arguments));
  }

  _createClass(Material, [{
    key: 'render',


    //
    // Render

    value: function render() {
      var color = this.props.color;


      return _react2.default.createElement('meshPhongMaterial', {
        color: color
      });
    }
  }]);

  return Material;
}(_react.Component);

exports.default = Material;
});

require.register("js/components/PercentSlider.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _disGui = require('dis-gui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PercentSlider = function (_Component) {
  _inherits(PercentSlider, _Component);

  function PercentSlider() {
    _classCallCheck(this, PercentSlider);

    return _possibleConstructorReturn(this, (PercentSlider.__proto__ || Object.getPrototypeOf(PercentSlider)).apply(this, arguments));
  }

  _createClass(PercentSlider, [{
    key: 'render',


    //
    // Render

    value: function render() {
      var _props = this.props,
          label = _props.label,
          value = _props.value,
          onChange = _props.onChange;


      return _react2.default.createElement(_disGui.Number, {
        label: label,
        min: 1,
        max: 100,
        step: 1,
        value: value,
        onChange: onChange
      });
    }
  }]);

  return PercentSlider;
}(_react.Component);

PercentSlider.propTypes = {
  label: _propTypes2.default.string.isRequired,
  value: _propTypes2.default.number.isRequired,
  onChange: _propTypes2.default.func.isRequired
};

exports.default = PercentSlider;
});

require.register("js/components/Polyhedron.js", function(exports, require, module) {
// import React, { Component } from 'react';

// function generateMaterial(color) {
//   return new THREE.MeshPhongMaterial({ color });
// }

// class Polyhedron extends Component {

//   //
//   // Render

//   render() {
//     return (
//       <>
//     );
//   }

// }

// export default Polyhedron;
"use strict";
});

require.register("js/components/RowOfSolidsScene.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactThreeRenderer = require('react-three-renderer');

var _reactThreeRenderer2 = _interopRequireDefault(_reactThreeRenderer);

var _reactDimensions = require('react-dimensions');

var _reactDimensions2 = _interopRequireDefault(_reactDimensions);

var _Sparkle = require('./Sparkle');

var _Sparkle2 = _interopRequireDefault(_Sparkle);

var _Sphere = require('./Sphere');

var _Sphere2 = _interopRequireDefault(_Sphere);

var _SpinningCube = require('./SpinningCube');

var _SpinningCube2 = _interopRequireDefault(_SpinningCube);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import SpinningCube from './SpinningCube';


var style = {
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'stretch',
  flexGrow: 1
};

var cameraPosition = new THREE.Vector3(0, 20, 120);
var cameraLookAt = new THREE.Vector3(0, 0, 0);

var baseCameraProps = {
  fov: 25,
  near: 1,
  far: 2000,
  position: cameraPosition,
  lookAt: cameraLookAt
};

var RowOfSolidsScene = function (_Component) {
  _inherits(RowOfSolidsScene, _Component);

  function RowOfSolidsScene() {
    _classCallCheck(this, RowOfSolidsScene);

    return _possibleConstructorReturn(this, (RowOfSolidsScene.__proto__ || Object.getPrototypeOf(RowOfSolidsScene)).apply(this, arguments));
  }

  _createClass(RowOfSolidsScene, [{
    key: 'render',


    //
    // Render

    value: function render() {
      var _props = this.props,
          width = _props.containerWidth,
          height = _props.containerHeight,
          colors = _props.colors;


      if (!width || !height) {
        return null;
      }

      var delta = (colors.length - 1) / 2;
      var barWidth = 150;
      var spacing = barWidth / colors.length;

      var lights = [new THREE.Vector3(0, -150, -150)];

      var numLights = 1;
      var lightSpacing = barWidth / numLights;
      var lightOffset = barWidth / -2;
      var lightIntensity = 1 / numLights;
      for (var i = 0; i < numLights; i++) {
        lights.push(new THREE.Vector3((i + 0.5) * lightSpacing + lightOffset, 50, 150));
      }

      return _react2.default.createElement(
        'div',
        { style: style },
        _react2.default.createElement(
          _reactThreeRenderer2.default,
          {
            width: width,
            height: height,
            mainCamera: 'mainCamera',
            alpha: true
          },
          _react2.default.createElement(
            'scene',
            null,
            _react2.default.createElement('perspectiveCamera', _extends({
              name: 'mainCamera',
              aspect: width / height
            }, baseCameraProps)),
            lights.map(function (lightPosition, i) {
              return _react2.default.createElement('pointLight', {
                key: 'light:' + i,
                color: 0xffffff,
                position: lightPosition,
                intensity: lightIntensity
              });
            }),
            colors.map(function (color, i) {
              return _react2.default.createElement(_Sparkle2.default, {
                key: 'cube:' + i,
                color: color,
                position: new THREE.Vector3((i - delta) * spacing, 0, 0),
                i: i
              });
            })
          )
        )
      );
    }
  }]);

  return RowOfSolidsScene;
}(_react.Component);

RowOfSolidsScene.propTypes = {
  containerWidth: _propTypes2.default.number.isRequired,
  containerHeight: _propTypes2.default.number.isRequired,
  colors: _propTypes2.default.arrayOf(_propTypes2.default.string.isRequired).isRequired
};

exports.default = (0, _reactDimensions2.default)({
  containerStyle: {
    display: 'flex',
    flexGrow: 1
  },
  elementResize: true
})(RowOfSolidsScene);
});

require.register("js/components/Solid.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactThreeRenderer = require('react-three-renderer');

var _reactThreeRenderer2 = _interopRequireDefault(_reactThreeRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Solid = function (_Component) {
  _inherits(Solid, _Component);

  function Solid() {
    _classCallCheck(this, Solid);

    return _possibleConstructorReturn(this, (Solid.__proto__ || Object.getPrototypeOf(Solid)).apply(this, arguments));
  }

  return Solid;
}(_react.Component);

Solid.propTypes = {
  color: _propTypes2.default.string.isRequired
};

exports.default = Solid;
});

require.register("js/components/Sparkle.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Cube = require('./Cube');

var _Cube2 = _interopRequireDefault(_Cube);

var _Sphere = require('./Sphere');

var _Sphere2 = _interopRequireDefault(_Sphere);

var _Spinning = require('./Spinning');

var _Spinning2 = _interopRequireDefault(_Spinning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sparkle = function (_Component) {
  _inherits(Sparkle, _Component);

  //
  // Lifecycle

  function Sparkle(props, context) {
    _classCallCheck(this, Sparkle);

    var _this = _possibleConstructorReturn(this, (Sparkle.__proto__ || Object.getPrototypeOf(Sparkle)).call(this, props, context));

    _initialiseProps.call(_this);

    var maxRadius = 10;
    var minRadius = 5;

    var shapes = [];
    for (var i = 0; i < 15; i++) {
      var radius = Math.random() * (maxRadius - minRadius) + minRadius;
      var size = 1 - Math.tan(radius) / 1.5;
      var xRot = Math.random() * Math.PI * 2;
      var yRot = Math.random() * Math.PI * 2;
      var zRot = Math.random() * Math.PI * 2;
      var position = new THREE.Vector3(radius, 0, 0);
      var rotation = new THREE.Euler(xRot, yRot, zRot);

      position.applyEuler(rotation);
      var scaleScalar = 1 - Math.tan(radius / maxRadius) / 1.5;
      var scale = new THREE.Vector3(scaleScalar, scaleScalar, scaleScalar);

      shapes.push({
        position: position,
        rotation: rotation,
        scale: scale
      });
    }

    _this.shapes = shapes;
    return _this;
  }

  //
  // Render

  _createClass(Sparkle, [{
    key: 'render',
    value: function render() {
      var i = this.props.i;


      return _react2.default.createElement(
        _Spinning2.default,
        { i: i },
        this.renderGroup
      );
    }
  }]);

  return Sparkle;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.renderGroup = function (rotation) {
    var _props = _this2.props,
        color = _props.color,
        position = _props.position;


    var shapes = _this2.shapes;

    return _react2.default.createElement(
      'group',
      {
        position: position,
        rotation: rotation
      },
      shapes.map(function (shape, i) {
        return _react2.default.createElement(_Cube2.default, {
          key: i,
          position: shape.position,
          rotation: shape.rotation,
          scale: shape.scale,
          color: color
        });
      })
    );
  };
};

exports.default = Sparkle;
});

require.register("js/components/Sphere.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactThreeRenderer = require('react-three-renderer');

var _reactThreeRenderer2 = _interopRequireDefault(_reactThreeRenderer);

var _Solid2 = require('./Solid');

var _Solid3 = _interopRequireDefault(_Solid2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var sphereGeometry = new THREE.SphereGeometry(10, 8, 8);

var Sphere = function (_Solid) {
  _inherits(Sphere, _Solid);

  function Sphere() {
    _classCallCheck(this, Sphere);

    return _possibleConstructorReturn(this, (Sphere.__proto__ || Object.getPrototypeOf(Sphere)).apply(this, arguments));
  }

  _createClass(Sphere, [{
    key: 'render',


    //
    // Render

    value: function render() {
      var cubeProps = Object.assign({}, {
        geometry: sphereGeometry,
        material: this.material,
        scale: new THREE.Vector3(1, 1, 1)
      }, this.props);

      return _react2.default.createElement('mesh', cubeProps);
    }
  }]);

  return Sphere;
}(_Solid3.default);

exports.default = Sphere;
});

require.register("js/components/Spinning.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactThreeRenderer = require('react-three-renderer');

var _reactThreeRenderer2 = _interopRequireDefault(_reactThreeRenderer);

var _Animate = require('./Animate');

var _Animate2 = _interopRequireDefault(_Animate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var iTimeScalar = 100;

var Spinning = function (_Component) {
  _inherits(Spinning, _Component);

  function Spinning() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Spinning);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Spinning.__proto__ || Object.getPrototypeOf(Spinning)).call.apply(_ref, [this].concat(args))), _this), _this.mapTimeToRotation = function (time) {
      var t = _this.props;
      var i = _this.props.i;

      var scaledTime = time + i * iTimeScalar;

      var xRotScalar = 1 / 12000;
      var yRotScalar = 1 / 29000;
      var zRotScalar = 1 / 45000;

      return new THREE.Euler(Math.sin(scaledTime * xRotScalar) * 2 * Math.PI, Math.sin(scaledTime * yRotScalar) * 2 * Math.PI, Math.sin(scaledTime * zRotScalar) * 2 * Math.PI);
    }, _this.renderCube = function (rotation) {
      return _this.props.children(rotation);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  //
  // Control

  //
  // Render

  _createClass(Spinning, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_Animate2.default, {
        start: 0,
        mapTime: this.mapTimeToRotation,
        render: this.renderCube
      });
    }
  }]);

  return Spinning;
}(_react.Component);

Spinning.propTypes = {
  children: _propTypes2.default.func.isRequired,
  i: _propTypes2.default.number.isRequired
};

exports.default = Spinning;
});

require.register("js/components/SpinningCube.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Cube = require('./Cube');

var _Cube2 = _interopRequireDefault(_Cube);

var _Spinning = require('./Spinning');

var _Spinning2 = _interopRequireDefault(_Spinning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SpinningCube = function (_Component) {
  _inherits(SpinningCube, _Component);

  function SpinningCube() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SpinningCube);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SpinningCube.__proto__ || Object.getPrototypeOf(SpinningCube)).call.apply(_ref, [this].concat(args))), _this), _this.renderCube = function (rotation) {
      var _this$props = _this.props,
          color = _this$props.color,
          position = _this$props.position;


      return _react2.default.createElement(_Cube2.default, {
        color: color,
        position: position,
        rotation: rotation
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  //
  // Render

  _createClass(SpinningCube, [{
    key: 'render',
    value: function render() {
      var i = this.props.i;


      return _react2.default.createElement(
        _Spinning2.default,
        { i: i },
        this.renderCube
      );
    }
  }]);

  return SpinningCube;
}(_react.Component);

exports.default = SpinningCube;
});

require.register("js/components/Title.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var style = {
  textAlign: 'center',
  fontSize: '32px',
  fontFamily: 'sans-serif',
  fontWeight: 'strong',
  marginTop: '4px'
};

var Title = function (_Component) {
  _inherits(Title, _Component);

  function Title() {
    _classCallCheck(this, Title);

    return _possibleConstructorReturn(this, (Title.__proto__ || Object.getPrototypeOf(Title)).apply(this, arguments));
  }

  _createClass(Title, [{
    key: 'render',


    //
    // Render

    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: style },
        this.props.children
      );
    }
  }]);

  return Title;
}(_react.Component);

exports.default = Title;
});

require.register("main.js", function(exports, require, module) {
'use strict';

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _App = require('./js/components/App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  _reactDom2.default.render(_react2.default.createElement(_App2.default, { color: '#00ff00' }), window.app);
});
});

require.alias("buffer/index.js", "buffer");
require.alias("events/events.js", "events");
require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window.THREE = require("three");


});})();require('___globals___');


//# sourceMappingURL=app.js.map