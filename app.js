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
  var elapsed = Date.now() - this._start;

  this.setState(function () {
    return { elapsed: elapsed };
  });

  if (this._animationCallback) {
    window.requestAnimationFrame(this._animationCallback);
  }
};

var Animate = function (_Component) {
  _inherits(Animate, _Component);

  //
  // Lifecycle

  function Animate(props, context) {
    _classCallCheck(this, Animate);

    var _this = _possibleConstructorReturn(this, (Animate.__proto__ || Object.getPrototypeOf(Animate)).call(this, props, context));

    _this._start = props.start != null ? props.start : Date.now();
    _this._animationCallback = unboundAnimationCallback.bind(_this);

    _this.state = {
      elapsed: 0
    };
    return _this;
  }

  _createClass(Animate, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      window.requestAnimationFrame(this._animationCallback);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.animationCallback = null;
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

var _CubeSceneRow = require('./CubeSceneRow');

var _CubeSceneRow2 = _interopRequireDefault(_CubeSceneRow);

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
        _react2.default.createElement(_CubeSceneRow2.default, { colors: hsluvColors }),
        _react2.default.createElement(
          _Title2.default,
          null,
          'HSL'
        ),
        _react2.default.createElement(_CubeSceneRow2.default, { colors: hslColors }),
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function generateMaterial(color) {
  return new THREE.MeshPhongMaterial({ color: color });
}

var boxGeometry = new THREE.BoxGeometry(10, 10, 10);

var Cube = function (_Component) {
  _inherits(Cube, _Component);

  //
  // Lifecycle

  function Cube(props, context) {
    _classCallCheck(this, Cube);

    var _this = _possibleConstructorReturn(this, (Cube.__proto__ || Object.getPrototypeOf(Cube)).call(this, props, context));

    var color = props.color;


    _this.material = generateMaterial(color);
    return _this;
  }

  _createClass(Cube, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.color !== this.props.color) {
        this.setMaterial(nextProps.color);
      }
    }

    //
    // Control

  }, {
    key: 'setMaterial',
    value: function setMaterial(color) {
      this.material = generateMaterial(color);
    }

    //
    // Render

  }, {
    key: 'render',
    value: function render() {
      var cubeProps = Object.assign({}, this.props, {
        geometry: boxGeometry,
        material: this.material,
        scale: new THREE.Vector3(1, 1, 1)
      });

      return _react2.default.createElement('mesh', cubeProps);
    }
  }]);

  return Cube;
}(_react.Component);

Cube.propTypes = {
  color: _propTypes2.default.string.isRequired
};

exports.default = Cube;
});

require.register("js/components/CubeSceneRow.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactThreeRenderer = require('react-three-renderer');

var _reactThreeRenderer2 = _interopRequireDefault(_reactThreeRenderer);

var _reactDimensions = require('react-dimensions');

var _reactDimensions2 = _interopRequireDefault(_reactDimensions);

var _SpinningCube = require('./SpinningCube');

var _SpinningCube2 = _interopRequireDefault(_SpinningCube);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var CubeSceneRow = function (_Component) {
  _inherits(CubeSceneRow, _Component);

  function CubeSceneRow() {
    _classCallCheck(this, CubeSceneRow);

    return _possibleConstructorReturn(this, (CubeSceneRow.__proto__ || Object.getPrototypeOf(CubeSceneRow)).apply(this, arguments));
  }

  _createClass(CubeSceneRow, [{
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

      console.log(lights);

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
              return _react2.default.createElement(_SpinningCube2.default, {
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

  return CubeSceneRow;
}(_react.Component);

CubeSceneRow.propTypes = {
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
})(CubeSceneRow);
});

require.register("js/components/Lights.js", function(exports, require, module) {
"use strict";
});

;require.register("js/components/PercentSlider.js", function(exports, require, module) {
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sparkle = function (_Component) {
  _inherits(Sparkle, _Component);

  function Sparkle() {
    _classCallCheck(this, Sparkle);

    return _possibleConstructorReturn(this, (Sparkle.__proto__ || Object.getPrototypeOf(Sparkle)).apply(this, arguments));
  }

  _createClass(Sparkle, [{
    key: 'render',


    //
    // Render

    value: function render() {
      return _react2.default.createElement(Cube, null);
    }
  }]);

  return Sparkle;
}(_react.Component);

exports.default = Sparkle;

// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import React3 from 'react-three-renderer';
// import materialCache from 'js/utils/materialCache';

// function generateMaterial(color) {
//   // return new THREE.MeshLambertMaterial({ color });
//   return new THREE.MeshPhongMaterial({ color });
//   // return new THREE.MeshStandardMaterial({ color });
//   // return new THREE.MeshBasicMaterial({ color });
//   // return new THREE.MeshNormalMaterial();
// }

// const boxGeometry = new THREE.BoxGeometry(5, 10, 10);
// // const material = new THREE.MeshPhongMaterial({ color: '#ffff00' });
// // const material = new THREE.MeshLambertMaterial({ color: '#ffff00' });
// // const material = new THREE.MeshStandardMaterial({ color: '#ffff00' });
// // const material = new THREE.MeshNormalMaterial({ color: '#fff' });
// // const material = new THREE.MeshBasicMaterial({ color: '#fff' });
// // MeshStandardMaterial

// class Cube extends Component {

//   //
//   // Lifecycle

//   constructor(props, context) {
//     super(props, context);

//     const {
//       color
//     } = props;

//     this.state = {
//       material: generateMaterial(color)
//     };
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.color !== this.props.color) {
//       this.setMaterial(nextProps.color);
//     }
//   }

//   //
//   // Control

//   setMaterial(color) {
//     // this.setState(() => ({ material: new THREE.MeshPhongMaterial({ color }) }));
//     this.setState(() => ({ material: generateMaterial(color) }));
//   }

//   //
//   // Render

//   render() {
//     const { material } = this.state;

//     const {
//       position,
//       rotation,
//       ...otherProps
//     } = this.props;

//     const { x, y, z } = position;

//     const cubeProps = Object.assign({}, otherProps, {
//       geometry: boxGeometry,
//       material,
//       scale: new THREE.Vector3(1, 1, 1)
//     });

//     return (
//       <group
//         rotation={rotation}
//         position={position}
//       >
//         <mesh
//           {...cubeProps}
//           position={new THREE.Vector3(0, 0, 0)}
//         />
//         <mesh
//           {...cubeProps}
//           position={new THREE.Vector3(5, 5, 0)}
//         />
//       </group>
//     );
//   }
// }

// Cube.propTypes = {
//   color: PropTypes.string.isRequired
// };

// export default Cube;
});

require.register("js/components/SpinningCamera.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var baseCameraProps = {
  fov: 25,
  near: 1,
  far: 800,
  lookat: new THREE.Vector3(0, 0, 0)
};

var circleScalar = 1 / 2000;
var cameraDistance = 180;

function mapTimeToPosition(time) {
  var y = Math.sin(time * circleScalar) * cameraDistance;
  var x = Math.cos(time * circleScalar) * cameraDistance;
  var z = Math.sin(time / 3000) * 20 + 15;
  return new THREE.Vector3(x, z, y);
}

var SpinningCamera = function (_Component) {
  _inherits(SpinningCamera, _Component);

  function SpinningCamera() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SpinningCamera);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SpinningCamera.__proto__ || Object.getPrototypeOf(SpinningCamera)).call.apply(_ref, [this].concat(args))), _this), _this.renderCamera = function (position) {
      var _extends2;

      var _this$props = _this.props,
          name = _this$props.name,
          aspect = _this$props.aspect;


      return _react2.default.createElement('perspectiveCamera', _extends((_extends2 = {
        name: name,
        position: position
      }, _defineProperty(_extends2, 'name', name), _defineProperty(_extends2, 'aspect', aspect), _extends2), baseCameraProps));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  //
  // Control

  _createClass(SpinningCamera, [{
    key: 'render',


    //
    // Render

    value: function render() {
      var _props = this.props,
          name = _props.name,
          apsect = _props.apsect;


      return _react2.default.createElement(_Animate2.default, {
        start: 0,
        mapTime: mapTimeToPosition,
        render: this.renderCamera
      });
    }
  }]);

  return SpinningCamera;
}(_react.Component);

SpinningCamera.propTypes = {
  aspect: _propTypes2.default.number.isRequired,
  name: _propTypes2.default.string.isRequired
};

SpinningCamera.defaultProps = {
  aspect: 1
};

exports.default = SpinningCamera;
});

require.register("js/components/SpinningCube.js", function(exports, require, module) {
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

var _Cube = require('./Cube');

var _Cube2 = _interopRequireDefault(_Cube);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var lightIntensity = 0.1;

var SpinningCube = function (_Component) {
  _inherits(SpinningCube, _Component);

  function SpinningCube() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SpinningCube);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SpinningCube.__proto__ || Object.getPrototypeOf(SpinningCube)).call.apply(_ref, [this].concat(args))), _this), _this.mapTimeToRotation = function (time) {
      var t = _this.props;
      var i = _this.props.i;

      var iTimeScalar = 100;
      var scaledTime = time + i * iTimeScalar;

      var xRotScalar = 1 / 12000;
      var yRotScalar = 1 / 29000;
      var zRotScalar = 1 / 45000;

      var xRot = Math.sin(scaledTime * xRotScalar) * 2 * Math.PI;
      var yRot = Math.sin(scaledTime * yRotScalar) * 2 * Math.PI;
      var zRot = Math.sin(scaledTime * zRotScalar) * 2 * Math.PI;

      return new THREE.Euler(xRot, yRot, zRot);
    }, _this.renderCube = function (rotation) {
      var _this$props = _this.props,
          color = _this$props.color,
          position = _this$props.position,
          i = _this$props.i;


      return _react2.default.createElement(_Cube2.default, {
        color: color,
        position: position,
        rotation: rotation
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  //
  // Control

  //
  // Render

  _createClass(SpinningCube, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_Animate2.default, {
        start: 0,
        mapTime: this.mapTimeToRotation,
        render: this.renderCube
      });
    }
  }]);

  return SpinningCube;
}(_react.Component);

SpinningCube.propTypes = {
  color: _propTypes2.default.string.isRequired,
  i: _propTypes2.default.number.isRequired,
  position: _propTypes2.default.instanceOf(THREE.Vector3).isRequired
};

exports.default = SpinningCube;
});

require.register("js/components/SpinningCubeScene.js", function(exports, require, module) {
// import Cube from './Cube';
// import Animate from './Animate';

// function mapTimeToRotation(time) {
//   return {

//   }
// }

// function renderCube() {
//   return <Cube />;
// }

// class SpinningCube extends Cube {

//   //
//   // Render

//   render() {
//     return (
//       <Animate
//         map={mapTimeToRotation}
//         render={renderCube}
//       />
//     );
//   }

// }

// export default SpinningCube;
"use strict";
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