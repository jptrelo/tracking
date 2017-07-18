var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'tracking'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/tracking-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'tracking'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/tracking-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'tracking'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/tracking-production'
  }
};

module.exports = config[env];
