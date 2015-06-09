var U = require('../lib/utility.js');

/***
 *
 * Encoding
 *
 * YYXX (4-bits)
 * 00: -1
 * 01: 0
 * 10: 1
 *
 *    1
 *  4 5 6
 *    9
 */

var dy = function(n){
  return (n >> 2) -1;
};

var dx = function(x){
  return (x & 3) -1;
};

// clockwise 90
var cw = function(n){
  var x = dx(n);
  var y = dy(n);
  return ((1-x) << 2) + (y+1);
};

// counter-clockwise 90
var ccw = function(n){
  var x = dx(n);
  var y = dy(n);
  return ((x+1) << 2) + (1-y);
};

var len = 17;
module.exports = {
  qid: 'hilbert',
  score: 5,
  size: len,
  level: 5,
  hint: "http://en.wikipedia.org/wiki/Hilbert_curve#Representation_as_Lindenmayer_system",
  pattern: (function(){
    var mat = U.make(len);

    var y = 1;
    var x = 1;
    var dir = 6;

    var forward = function(){
      for(var i=0; i<2; i++){
        x += dx(dir);
        y += dy(dir);
        mat[y][x] = true;
      }
    };
    var turnLeft = function(){
      dir = cw(dir);
    };
    var turnRight = function(){
      dir = ccw(dir);
    };

    var A = function(depth){
      if( depth < 0 ) return;
      depth--;

      turnRight();
      B(depth);
      forward();
      turnLeft();
      A(depth);
      forward();
      A(depth);
      turnLeft();
      forward();
      B(depth);
      turnRight();
    };
    var B = function(depth){
      if(depth < 0) return;
      depth--;

      turnLeft();
      A(depth);
      forward();
      turnRight();
      B(depth);
      forward();
      B(depth);
      turnRight();
      forward();
      A(depth);
      turnLeft();
    };

    mat[y][x] = true;
    A(2);

    return mat;
  })()
};