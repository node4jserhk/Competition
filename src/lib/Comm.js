var basename = require('path').basename;
var filename = basename(__filename);

///////////////////////////////////////////////////////////

var models = [
  { namespace: 'Game',  handlers: require('../model/Game.js') },
  { namespace: 'Question', handlers: require('../model/Question.js') },
  { namespace: 'Profile', handlers: require('../model/Profile.js') }
];

///////////////////////////////////////////////////////////

// for client to know what function is available
var api = {};
(function(){
  for(var i=0; i<models.length; i++){
    var model = models[i];
    var t = api[model.namespace] = {};
    for(var key in model.handlers){
      var handler = model.handlers[key];
      if( typeof handler === 'function' ){
        if( handler.callable ) {
          var eventName = model.namespace + '.' + key;
          t[key] = ['call', eventName];
        }
        else if( handler.requestable || handler.requestableAsync ){
          var path = ['/api', model.namespace, key].join('/');
          t[key] = ['request', path];
        }
      }
    }
  }
})();

// for server to build listener to client events
var patch = function(socket){
  for(var i=0; i<models.length; i++){
    var model = models[i];
    for(var key in model.handlers){
      var val = model.handlers[key];
      if( typeof val === 'function' )(function(handler){
        if( handler.callable ){
          // use array for extension
          var eventName = model.namespace + '.' + key;
          socket.on(eventName, function(x){
            handler.apply(socket, x.args);
          })
        }
      })(val);
    }
  }
};

// for server to build listener to client requests
var routes = [];
(function(){
  for(var i=0; i<models.length; i++){
    var model = models[i];
    for(var key in model.handlers){
      var val = model.handlers[key];
      if( typeof val === 'function' )(function(handler){
        if( handler.requestableAsync ){
          routes.push({
            method: 'POST',
            path: ['/api', model.namespace, key].join('/'),
            handler: function(req, rep){
              var args = req.payload;
              //console.log('payload', args);
              if( !Array.isArray(args) ) args = [args];
              args.push(function(){
                rep(Array.prototype.slice.call(arguments));
              });
              handler.apply(null, args);
            },
            config: {
              tags: [filename]
            }
          });
        }
        else if( handler.requestable ){
          routes.push({
            method: 'POST',
            path: ['/api', model.namespace, key].join('/'),
            handler: function(req, rep){
              var args = req.payload;
              //console.log('payload', args);
              var res = handler.apply(null, args);
              rep([res]);
            },
            config: {
              tags: [filename]
            }
          });
        }
      })(val);
    }
  }
})();

///////////////////////////////////////////////////////////

// json to be sent to client to build api (socket + http)
exports.api = api;

// function to patch new client socket for listening
exports.patch = patch;

// route to be exposed by hapi
exports.routes = routes;