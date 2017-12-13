const ghpages = require('gh-pages');

ghpages.publish('dist', {
  repo: 'git@github.com:duncanbeevers/color-perception.git'
});
