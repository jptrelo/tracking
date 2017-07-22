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
    db: 'mongodb://heroku_rw4r176t:8hje24s6l5tkp2nrk345ut4jl8@ds145997.mlab.com:45997/heroku_rw4r176t'
  }
};

module.exports = config[env];
