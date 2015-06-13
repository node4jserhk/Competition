var U = require('../lib/utility.js');

var len = 15;
module.exports = {
  qid: 'square',
  score: 7,
  size: len,
  level: 3,
  pattern: (function(){
    var mat = U.make(len);

    for(var i=0; i <= Math.floor(len/2); i+=2){
      for(var j=i; j < len-i; j++){
        mat[i][j] = mat[len-i-1][j] = mat[j][i] = mat[j][len-i-1] = true;
      }
    }
    return mat;
  })()
};