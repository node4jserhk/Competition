var React = require('react');
var Flux = require('../lib/FluxMixin.js');

window.log = console.log.bind(console);

///////////////////////////////////////////////////////////
/// socket

window.socket = new io();

socket.on('updates', function(e){
  log('update', e);
});

///////////////////////////////////////////////////////////
/// game

window.grid = [];
window.questions = {};

$.ajax({
  type: 'GET',
  url: '/questions'
}).done(function(qs){
  window.questions = qs;
  dispatch({
    type: 'question.new',
    questions: qs
  })
});


window.size = function(n){
  var mat = new Array(n);
  for(var i=0; i<n; i++){
    mat[i] = new Array(n);
    for(var j=0; j<n; j++){
      mat[i][j] = false;
    }
  }
  window.grid = mat;
  dispatch({
    type: 'grid.new',
    grid: window.grid
  })
};

window.set = function(x,y){
  window.grid[y][x] = true;
  dispatch({
    type: 'grid.new',
    grid: window.grid
  })
};

window.unset = function(x,y){
  window.grid[y][x] = false;
  dispatch({
    type: 'grid.new',
    grid: window.grid
  })
};

window.clear = function(){
  var mat = window.grid;
  var len = mat.length;
  for(var i=0; i<len; i++){
    for(var j=0; j<len; j++){
      mat[i][j] = false;
    }
  }
  dispatch({
    type: 'grid.new',
    grid: window.grid
  })
};

window.check = function(){
  socket.emit('finish', {

  })
};

size(8);

///////////////////////////////////////////////////////////
/// App

var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;


var Frame = require('./partial/Frame.jsx');
var Registration = require('./partial/Registration.jsx');
var Lobby = require('./partial/Lobby.jsx');
var Question = require('./partial/Question.jsx');

var routes = (
  <Route handler={Frame} >
    <DefaultRoute name="register" handler={Registration} />
    <Route name="lobby" handler={Lobby} >
      <Route name="question/:id" handler={Question} />
    </Route>
  </Route>
);


Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});