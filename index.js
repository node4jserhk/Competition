var fs = require('fs');
var join = require('path').join;
var hapi = require('hapi');
var async = require('async');
var SocketIO = require('socket.io');
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

var models = [
  { name: 'Game', model: require('./src/model/Game.js') }
];

function makeApi(socket){
  for(var i=0; i<models.length; i++){
    var m = models[i];
    for(var i in m){
      socket.on( m.name + '.' + i, function(){

      })
    }
  }
}


io.on('connection', function(socket){
  Log.i('new connection');

  socket.on('finish', function(m){
    var name = m.name;
    var qid = m.qid;

    Game.finish(name, qid);
    io.emit('updates', { rank: Game.getTop(10) })
  });

  socket.on('test', function(m){
    log('1', m);
  });

  socket.on('test', function(m){
    log('2', m);
  });


});

///////////////////////////////////////////////////////////

var setRoutes = function(done){
  var root = 'src/route';
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

async.series([setRoutes, startServer]);

///////////////////////////////////////////////////////////

