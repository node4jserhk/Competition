var fs = require('fs');
var Log = require('../lib/Log.js');
var U = require('../lib/utility.js');
var join = require('path').join;

var Game = require('./Game.js');

///////////////////////////////////////////////////////////

var questions = {};

fs.readdir( join(__dirname, '../question'), function(err,files){
  if(err) return done(err);
  for(var i=0; i < files.length; i++){
    var file = files[i];
    if( file.match(/(\.js|\.json)$/) ){
      var p = join(__dirname, '../question/', file );
      var q = require(p);
      questions[q.qid] = q;
      Log.i('loading questions', q.qid);
    }
  }
});

exports.getQuestions = function(){
  //return questions; // for testing
  if( Game.isStarted() ) return questions;

  var res = {};
  for(var k in questions){
    var q = questions[k];
    if( q.practice ) res[k] = q;
  }
  return res;
};

exports.getQuestions.requestable = true;