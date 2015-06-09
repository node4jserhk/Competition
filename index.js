var fs = require('fs');
var join = require('path').join;
var hapi = require('hapi');
var async = require('async');
var SocketIO = require('socket.io');
var Comm = require('./src/lib/Comm.js');
var Game = require('./src/model/Game.js');

///////////////////////////////////////////////////////////
// helpers

var Config = require(join(__dirname, 'config.js'));
var log = console.log.bind(console);
var Log = require(join(__dirname, 'src/lib/Log.js'));

///////////////////////////////////////////////////////////
// server

var server = new hapi.Server();

server.connection({
  port: Config.port || 80
});
// set relative path
server.path(join(__dirname, 'www'));

// attach socket.io to web server
var io = SocketIO(server.listener);

///////////////////////////////////////////////////////////
// socket

io.on('connection', function(socket){
  Log.i('new connection');

  Comm.patch(socket);
});

global.broadcast = function(event){
  var len = arguments.length;
  var args = Array.prototype.slice.call(arguments,1,len);
  io.emit(event, { args: args } )
};

//var cnt = 0;
//setInterval(function(){
//  log('sending');
//  broadcast('Board.test', 'a', cnt++ );
//}, 1000);

///////////////////////////////////////////////////////////

var registerLout = function(done){
  server.register({ register: require('lout') }, function(err) {
    done()
  });
};

var setRoutes = function(done){
  var root = 'src/route';

  // api
  server.route(Comm.routes);

  fs.readdir( join(__dirname, root), function(err,files){
    if(err) return done(err);
    for(var i=0; i<files.length; i++){
      var file = files[i];
      if( file.match(/(\.js|\.json)$/) ){
        var p = join(__dirname, root, file );
        Log.i('setRoutes:', p);
        server.route( require(p) );
      }
    }
    done()
  })
};

var startServer = function(done){
  server.start(function(){
    Log.i('listening', server.info.uri);
    done()
  })
};

async.series([registerLout, setRoutes, startServer]);

///////////////////////////////////////////////////////////

