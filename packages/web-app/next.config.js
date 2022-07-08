const withImages = require('next-images')

module.exports = withImages({
  esModule: true,
})

const withTM = require('next-transpile-modules')(['@language-app/common']); // pass the modules you would like to see transpiled

module.exports = withTM({});
