var join = require('path').join;

var Log = require('../lib/Log.js');
var U = require('../lib/utility.js');

var Game = require('./Game.js');
var Question = require('./Question.js');

///////////////////////////////////////////////////////////

var profiles = {};

exports.getProfile = function(name){
  var profile = profiles[name];
  if( U.isUndefined(profile) ){
    Log.i('New Profile', name);
    profile = profiles[name] = {
      name: name,
      count: 0,           // number of question answered
      score: 0,           // total score obtained
      lastAnswerAt: 0,
      answer: {}
    };
    broadcast('State.setRank', exports.getTop(10));
  }
  return profile;
};

exports.complete = function(name, qid){
  if( Game.getMode() !== 'between' ) return;

  var profile = exports.getProfile(name);
  var questions = Question.getQuestions();
  var question = questions[qid];

  // return if no question
  if( U.isFalsity(question) ) return;

  // check whether already answered
  if( ! U.isFalsity(profile.answer[qid]) ) return;

  profile.count += 1;
  profile.score += question.score;
  profile.lastAnswerAt = Date.now();
  profile.answer[qid] = {
    index: profile.count,
    time: Date.now()
  };

  // notify client updated
  this.emit('State.setProfile', {
    args: [profile]
  });


  // broadcast new ranking
  broadcast('State.setRank', exports.getTop(10));
};

exports.getTop = function(n){
  var names = Object.keys(profiles);
  //return names.map(function(n){
  //  return profiles[n];
  //});

  names = names.filter(function(a) {
    return profiles[a].score > 0;
  });

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

///////////////////////////////////////////////////////////

exports.complete.callable = true;

exports.getProfile.requestable = true;
exports.getTop.requestable = true;