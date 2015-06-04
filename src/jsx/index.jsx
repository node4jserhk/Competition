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

// before, after, between
var state = window.state = {
  mode: "before",
  profile: {},
  questions: {},
  size: 0,
  grid: [],
  rank: []
};

var isDirty = false;
var markDirty = function(){
  if( isDirty ) return;
  isDirty = true;
  setImmediate(function() {
    isDirty = false;
    dispatch({
      type: 'grid.new',
      grid: state.grid
    })
  });
};

window.resize = function(n){
  if( n > 50 ) return;
  var mat = new Array(n);
  for(var i=0; i<n; i++){
    mat[i] = new Array(n);
    for(var j=0; j<n; j++){
      mat[i][j] = false;
    }
  }
  state.size = n;
  state.grid = mat;
  markDirty();
};

window.set = function(y,x){
  var size = window.size;
  if( 0 <= x && x < size && 0 <= y && y < size){
    state.grid[y][x] = true;
    markDirty();
  }
};

window.unset = function(y,x){
  state.grid[y][x] = false;
  markDirty();
};

window.unsetAll = function(){
  var mat = state.grid;
  var len = mat.length;
  for(var i=0; i<len; i++){
    for(var j=0; j<len; j++){
      mat[i][j] = false;
    }
  }
  markDirty();
};

function isEqual(a,b){
  if( a.length !== b.length ) return false;
  var len = a.length;
  for(var i=0; i<len; i++){
    for(var j=0; j<len; j++){
      if( a[i][j] !== b[i][j] ) return false;
    }
  }
  return true;
}

window.check = function(){
  for(var i in questions){
    var q = questions[i];
    if( isEqual(grid, q.pattern ) ){
      dispatch({
        type: 'notify',
        message: 'Congratulation! You have solved ' + q.qid + ' and earn ' + q.score + ' points'
      });
      socket.emit('finish', {
        // todo
      })
    }
  }
};

///////////////////////////////////////////////////////////
/// initialization

$.ajax({
  type: 'GET',
  url: '/questions'
}).done(function(qs){
  state.questions = qs;
  dispatch({
    type: 'question.new',
    questions: qs
  })
});

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
      <Route path="question/:id" handler={Question} />
      <Route name="instruction" handler={Instruction} />
    </Route>
  </Route>
);


Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});