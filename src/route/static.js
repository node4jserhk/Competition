var basename = require('path').basename;
var filename = basename(__filename);

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: function(request,reply){
      reply.redirect('/www/index.html')
    },
    config: {
      tags: [filename]
    }
  },
  {
    method: 'GET',
    path: '/www/{param*}',
    handler: {
      directory: {
        path: './'
      }
    },
    config: {
      tags: [filename]
    }
  },
  {
    method: 'GET',
    path: '/js/{param*}',
    handler: {
      directory: {
        path: './js'
      }
    },
    config: {
      tags: [filename]
    }
  },
  {
    method: 'GET',
    path: '/css/{param*}',
    handler: {
      directory: {
        path: './css'
      }
    },
    config: {
      tags: [filename]
    }
  },
  {
    method: 'GET',
    path: '/img/{param*}',
    handler: {
      directory: {
        path: './img'
      }
    },
    config: {
      tags: [filename]
    }
  }
];
