var State = require('../lib/State.js');

module.exports = [
  {
    method: 'GET',
    path: '/getProfile',
    handler: function(req, rep){
      var name = req.query.name;
      rep(State.getProfile(name));
    }
  }
  ,
  {
    method: 'GET',
    path: '/questions',
    handler: function(req, rep){
      rep(State.getQuestions() );
    }
  }
];