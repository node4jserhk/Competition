var fs = require('fs');
var join = require('path').join;
var hapi = require('hapi');
var async = require('async');
var SocketIO = require('socket.io');
var State = require('./src/lib/State.js');


///////////////////////////////////////////////////////////
// helpers

var Config = require(join(__dirname, 'config.js'));
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
/// state

var profiles = {};

///////////////////////////////////////////////////////////
// socket


io.on('connection', function(socket){
  Log.i('new connection');

  /**
   * { name, qid }
   */
  socket.on('finish', function(m){
    var name = m.name;
    var qid = m.qid;

    State.finish(name, qid);
    // todo: broadcast
    io.emit('updates', {
      rank: State.getTop(10)
    })
  })

});

///////////////////////////////////////////////////////////

var setRoutes = function(done){
  fs.readdir( join(__dirname, 'src/routes'), function(err,files){
    if(err) return done(err);
    for(var i=0; i < files.length; i++){
      var file = files[i];
      if( file.match(/(\.js|\.json)$/) ){
        var p = join(__dirname, 'src/routes', file );
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

async.series([setRoutes, startServer]);

///////////////////////////////////////////////////////////

