var U = require('../lib/utility.js');

var len = 11;
module.exports = {
  qid: 'square2',
  score: 5,
  size: len,
  level: 2,
  pattern: (function(){
    var mat = U.make(len);

    var origin = Math.floor(len/2);

    var l,r;
    l = origin-1; r = origin+1;
    while(0 <= l && r < len){
      var a = l, b = r;
      for(var i=0; a+i <= b-i; i++){
        mat[origin-i][a+i] = mat[origin-i][b-i] = true;
        mat[origin+i][a+i] = mat[origin+i][b-i] = true;
      }
      l-=2; r+=2;
    }

    return mat;
  })()
};