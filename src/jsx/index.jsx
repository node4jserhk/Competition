var React = require('react');
var Flux = require('../lib/FluxMixin.js');
var State = require('./model/State.js');
var Board = require('./model/Board.js');

window.log = console.log.bind(console);

///////////////////////////////////////////////////////////
/// socket

var socket = new io();

var models = [
  { name: 'Board', handlers: Board },
  { name: 'State', handlers: State }
];

// listen broadcast
(function(){

  for(var i=models.length; i--; ){
    var model = models[i];
    for(var key in model.handlers ){
      var handler = model.handlers[key];
      if( handler.callable ) (function(handler){
        var event = [model.name, key].join('.');
        //log('listening', event);
        socket.on( event , function(data){
          handler.apply(null, data.args);
        })
      })(handler);
    }
  }

})();



///////////////////////////////////////////////////////////
/// App

var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var Frame = require('./partial/Frame.jsx');
var Registration = require('./partial/Registration.jsx');
var Lobby = require('./partial/Lobby.jsx');
var Question = require('./partial/Question.jsx');
var Instruction = require('./partial/Instruction.jsx');
var Panel = require('./partial/Panel.jsx');

//<Route name="instruction" handler={Instruction} />
//<Route path="question/:id" handler={Question} />
var routes = (
  <Route handler={Frame} >
    <DefaultRoute name="register" handler={Registration} />
    <Route name="lobby" handler={Lobby} />
    <Route name="panel" handler={Panel} />
  </Route>
);


///////////////////////////////////////////////////////////
/// initialization

// build api
function makeApi(api){
  if( Array.isArray(api) ){
    var type = api[0];
    if( type === 'call' ){
      return function(){
        socket.emit(api[1], {
          args: Array.prototype.slice.call(arguments)
        })
      }
    }
    else if( type === 'request' ){
      return function(){
        var len = arguments.length;
        if( len === 0 || typeof arguments[len-1] !== 'function' )
          throw new Error('request without callback');
        var args = Array.prototype.slice.call(arguments,0,len-1);
        var cb = arguments[len-1];
        $.ajax({
          type: 'POST',
          url: api[1],
          contentType: 'application/json',
          data: JSON.stringify(args)
        }).done(function(data){
          cb.apply(null, data);
        })
      }
    }
  }
  else if( typeof api === 'object' ){
    var t = {};
    for(var key in api ) t[key] = makeApi(api[key]);
    return t;
  }
}

$.ajax({
  type: "GET",
  url: '/api.js'
}).done(function(json){
  window.api = makeApi(json);

  // test: start the game
  //var now = Date.now();
  //api.Game.schedule(now + 1000, now + 10*60*1000);

  if( localStorage ) {
    var player = localStorage.getItem('player');
    if( player ) api.Profile.getProfile(player, function(profile){
      State.setPlayer(player);
      State.setProfile(profile);

      api.Game.getMode(State.setMode);
      api.Game.getTimes(State.setTimes);
      api.Question.getQuestions(State.setQuestions);
      api.Profile.getTop(10, State.setRank);
    });
  }

  // mount react root
  Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.body);
  });
});
