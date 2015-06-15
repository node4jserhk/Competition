var Log = require('../lib/Log.js');
var U = require('../lib/utility.js');
var config = require('../../config.js');

///////////////////////////////////////////////////////////
/// initialization


var mode = config.initialMode || "before" ;
var startTime = null;
var endTime = null;
var timer = null;

///////////////////////////////////////////////////////////

exports.launch = function(minute, password){
  Log.d('launch', minute, password);
  if( typeof minute !== 'number' || password !== 'node4jser' ) return;
  var now = Date.now();
  exports.schedule(now, now + minute * 60 * 1000);
};

exports.schedule = function(s, e){
  if( typeof s !== 'number' || typeof e !== 'number' || e <= s ) return;

  startTime = s;
  endTime = e;
  var now = Date.now();
  if( timer !== null ){
    clearTimeout(timer);
    timer = null;
  }

  if( now < startTime ){
    mode = 'before';
    timer = setTimeout(function() {
      exports.start();
      timer = setTimeout(exports.end, endTime - Date.now());
    }, startTime - now);

  }
  else if( now < endTime ){
    timer = setTimeout(exports.end, endTime - now);
    exports.start();
  }
  else {
    exports.end();
  }
};

exports.start = function(){
  mode = 'between';
  broadcast('State.start', {
    mode: mode,
    startTime: startTime,
    endTime: endTime,
    now: Date.now()
  });
};

exports.end = function(){
  mode = 'after';
  broadcast('State.end', {
    mode: mode,
    startTime: startTime,
    endTime: endTime,
    now: Date.now()
  });
};

exports.getMode = function(){
  return mode;
};

exports.isStarted = function(){
  return mode === 'between';
};

exports.isEnded = function(){
  return mode === 'after';
};

exports.getTimes = function(callback){
  callback(startTime, endTime, Date.now());
};

///////////////////////////////////////////////////////////

// allow client to see and call them
exports.schedule.callable = true;
exports.launch.callable = true;

// allow clients to call and reply to them
// callback is appended to the last arguments
exports.getMode.requestable = true;
exports.isStarted.requestable = true;
exports.isEnded.requestable = true;

// requestable Async
exports.getTimes.requestableAsync = true;