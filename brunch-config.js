// See http://brunch.io for documentation.
exports.files = {
  javascripts: {
    joinTo: {
      'vendor.js': /^(?!app)/,
      'app.js': /^app/
    }
  }
};

exports.plugins = {
  babel: {
    presets: ['latest', 'stage-1', 'react']
  },
  uglify: {
    mangle: true,
    compress: {
      global_defs: {
        DEBUG: false
      }
    }
  }
};

exports.npm = {
  enabled: true,
  globals: {
    THREE: "three"
  }
};

exports.paths = {
  public: 'dist'
};
