var fs = require('fs');
var join = require('path').join;
var assert = require('assert');

var Game = require('../src/model/Game.js');
var Profile = require('../src/model/Profile.js');
var Questions = require('../src/model/Question.js');

var log = console.log.bind(console);

///////////////////////////////////////////////////////////

global.broadcast = function(){};

var questions = null;
var names = null;

describe('Profile', function(){

  before(function(done){
    // wait question to be read...
    setTimeout(function(){
      Game.launch(10, 'node4jser');
      questions = Questions.getQuestions();
      names = Object.keys(questions);
      done();
    }, 500);
  });

  describe('getTop', function(){

    it('test 1', function(){
      var len = names.length;

      var players = [];
      for(var i=0; i<len; i++){
        players.unshift(Profile.getProfile('Player'+i));
      }

      for(var i=0; i<len; i++){
        for(var j=0; j<i; j++){
          var dummy = { emit: function(){} };
          Profile.complete.call(dummy, 'Player'+i, names[j]);
        }
      }

      var rank = Profile.getTop(100);
      for(var i=0; i<rank.length; i++){
        assert.equal( rank[i], players[i] );
      }
    })

  })

});