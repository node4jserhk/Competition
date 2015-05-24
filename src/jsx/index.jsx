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

window.size = 0;
window.grid = [];
var isDirty = false;
var markDirty = function(){
  if( isDirty ) return;
  isDirty = true;
  setImmediate(function() {
    isDirty = false;
    dispatch({
      type: 'grid.new',
      grid: window.grid
    })
  });
};

window.resize = function(n){
  var mat = new Array(n);
  for(var i=0; i<n; i++){
    mat[i] = new Array(n);
    for(var j=0; j<n; j++){
      mat[i][j] = false;
    }
  }
  window.size = n;
  window.grid = mat;
  markDirty();
};

window.set = function(y,x){
  var size = window.size;
  if( 0 <= x && x < size && 0 <= y && y < size){
    window.grid[y][x] = true;
    markDirty();
  }
};

window.unset = function(y,x){
  window.grid[y][x] = false;
  markDirty();
};

window.unsetAll = function(){
  var mat = window.grid;
  var len = mat.length;
  for(var i=0; i<len; i++){
    for(var j=0; j<len; j++){
      mat[i][j] = false;
    }
  }
  markDirty();
};

window.check = function(){
  socket.emit('finish', {

  })
};

resize(8);

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

var routes = (
  <Route handler={Frame} >
    <DefaultRoute name="register" handler={Registration} />
    <Route name="lobby" handler={Lobby} >
      <Route name="question/:id" handler={Question} />
      <Route name="instruction" handler={Instruction} />
    </Route>
  </Route>
);


Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});