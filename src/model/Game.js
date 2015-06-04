var fs = require('fs');
var Log = require('../lib/Log.js');
var U = require('../lib/utility.js');

var join = require('path').join;

///////////////////////////////////////////////////////////
/// initialization


var profiles = {};
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

///////////////////////////////////////////////////////////

exports.startOn = function(time){

};

exports.isEnded = function(){

};

var getProfile = exports.getProfile = function(name){
  var profile = profiles[name];
  if( U.isUndefined(profile) ){
    Log.i('New Profile', name);
    profile = profiles[name] = {
      name: name,
      count: 0,
      score: 0,
      lastAnswerAt: 0,
      answer: {}
    };
  }
  return profile;
};

exports.finish = function(name, qid){
  var profile = getProfile(name);
  var question = questions[qid];
  if( U.isFalsity(question) ) return;

  profile.count += 1;
  profile.score += question.score;
  profile.lastAnswerAt = Date.now();
  profile.answer[qid] = {
    index: profile.count,
    time: Date.now()
  };
};

exports.getQuestions = function(){
  return questions;
};

exports.getTop = function(n){
  var names = Object.keys(profiles);
  names.sort(function(a,b){
    var sa = profiles[a].score;
    var sb = profiles[b].score;
    var ord = (sa < sb) - (sa > sb);
    if( ord ) return ord;
    var ta = profiles[a].lastAnswerAt;
    var tb = profiles[b].lastAnswerAt;
    return (ta > tb) - (ta < tb);
  });

  return names.slice(0,n).map(function(n){
    return profiles[n];
  })
};

