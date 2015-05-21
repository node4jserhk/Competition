// similar to android Log

function Log(){
  this.debug = true;
  this.verbose = false;

  var p = console.log.bind(console);
  var d = console.log.bind(console, 'DEBUG:');
  var e = console.log.bind(console, 'ERROR:');
  var i = console.log.bind(console, 'INFO:');
  var v = console.log.bind(console, 'VERB:');
  var w = console.log.bind(console, 'WARN:');
  var wtf = console.log.bind(console,
    'WHAT A TERRIBLE FAILURE !!!!!!!!!!!!!!!!!!!!!!!!!!!!');

  // print
  this.p = function(){
    p.apply(null, arguments)
  };
  // debug
  this.d = function(){
    d.apply(null, arguments)
  };
  // error
  this.e = function(){
    e.apply(null, arguments)
  };
  // info
  this.i = function(){
    i.apply(null, arguments)
  };
  // verbose
  this.v = function(){
    v.apply(null, arguments)
  };
  // warning
  this.w = function(){
    w.apply(null, arguments)
  };
  // ??
  this.wtf = function(){
    wtf.apply(null, arguments)
  }
}


var log = new Log();

module.exports = log;