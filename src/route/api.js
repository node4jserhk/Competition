var Socket = require('../lib/Comm.js');
var basename = require('path').basename;
var filename = basename(__filename);

module.exports = {
  method: 'GET',
  path: '/api.js',
  handler: function(req, rep) {
    rep(Socket.api);
  },
  config: {
    tags: [filename]
  }
};