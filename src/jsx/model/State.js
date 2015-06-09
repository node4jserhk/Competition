var mode = "before";
var player = null;
var profile = {};
var rank = [];
var currentQuestion = null;
var questions = {};

var startTime = null;
var endTime = null;
var drift = null;

exports.getPlayer = function(){ return player; };
exports.setPlayer = function(name){
  player = name;

};

exports.getProfile = function(){ return profile; };
exports.setProfile = function(pro){
  //log('new profile', pro);
  profile = pro;
  dispatch({ type: 'State.profile.new', profile: pro });
};

exports.getMode = function(){ return mode; };
exports.setMode = function(m){
  mode = m;
  dispatch({ type: 'State.mode.new', mode: m });
};

exports.getCurrentQuestions = function(){ return currentQuestion; };
exports.setCurrentQuestions = function(q){
  currentQuestion = q;
  dispatch({ type: 'State.currentQuestion.new', qid: q.qid });
};
exports.isCurrentQuestion = function(q){
  return q.qid == currentQuestion;
};


exports.getRank = function(){ return rank; };
exports.setRank = function(r){
  rank = r;
  dispatch({ type: 'State.rank.new', rank: r });
};

exports.getQuestions = function(){ return questions; };
exports.setQuestions = function(qs){
  questions = qs;
  dispatch({ type: 'State.questions.new', questions: qs })
};

exports.getEndTime = function(){ return endTime; };
exports.setEndTime = function(t){ endTime = t; };

exports.getStartTime = function(){ return startTime; };
exports.setStartTime = function(t){ startTime = t; };

exports.getDrift = function(){ return drift; };

exports.setTimes = function(s,e,n){
  var now = Date.now();
  drift = now - n;
  startTime = s + drift;
  endTime = e + drift;
};

exports.start = function(e){
  log('Game Start', e);

  exports.setMode(e.mode);
  exports.setStartTime(e.startTime + Date.now() - e.now);
  exports.setEndTime(e.endTime + Date.now() - e.now);

  var player = exports.getPlayer();

  api.Profile.getProfile(player, function(pro){
    exports.setProfile(pro);
  });

  api.Question.getQuestions(function(qs){
    exports.setQuestions(qs);
  });
};

exports.end = function(e){
  log('Game Over');
  exports.setMode('after');
};


///////////////////////////////////////////////////////////

exports.setProfile.callable = true;
exports.start.callable = true;
exports.end.callable = true;
exports.setRank.callable = true;