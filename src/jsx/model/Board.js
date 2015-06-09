var State = require('./State.js');

var size = 0;
var grid = [];

///////////////////////////////////////////////////////////

var isDirty = false;
var markDirty = function(){
  if( isDirty ) return;
  isDirty = true;
  setImmediate(function() {
    isDirty = false;
    dispatch({ type: 'Board.grid.new', grid: grid })
  });
};

exports.getGrid = function(){
  return grid;
};

exports.resize = function(n){
  if( n > 50 ) return;
  var mat = new Array(n);
  for(var i=0; i<n; i++){
    mat[i] = new Array(n);
    for(var j=0; j<n; j++){
      mat[i][j] = false;
    }
  }
  size = n;
  grid = mat;
  markDirty();
};

exports.set = function(y,x){
  if( 0 <= x && x < size && 0 <= y && y < size){
    grid[y][x] = true;
    markDirty();
  }
};

exports.unset = function(y,x){
  grid[y][x] = false;
  markDirty();
};

exports.unsetAll = function(){
  var mat = grid;
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

exports.check = function(){
  var questions = State.getQuestions();
  var profile = State.getProfile();
  var answers = profile.answer || {};

  for(var i in questions){
    if( typeof answers[i] !== 'undefined' ) continue;

    var q = questions[i];
    if( isEqual(grid, q.pattern) ){
      // notify
      if( State.getMode() === 'between' ){
        dispatch({
          type: 'notify',
          message: 'Congratulation! You have solved ' + q.qid + ' and earn ' + q.score + ' points'
        });
      }
      else {
        dispatch({
          type: 'notify',
          message: 'You have solved ' + q.qid
        })
      }
      var name = State.getPlayer();
      api.Profile.complete(name, q.qid);
    }
  }
};

exports.eval = function(s){
  var resize = exports.resize;
  var set = exports.set;
  var unset = exports.unset;
  //var check = exports.check;
  eval(s);
  exports.check();
  return;
};

///////////////////////////////////////////////////////////
// initialization

exports.resize(8);