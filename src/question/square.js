var U = require('../lib/utility.js');

module.exports = {
  qid: 'square',
  score: 5,
  size: 17,
  level: 2,
  pattern: (function(){
    var len = 17;
    var mat = U.make(len);

    for(var i=0; i <= Math.floor(len/2); i+=2){
      for(var j=i; j < len-i; j++){
        mat[i][j] = mat[len-i-1][j] = mat[j][i] = mat[j][len-i-1] = true;
      }
    }
    return mat;
  })()
};