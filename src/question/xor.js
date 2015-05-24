var U = require('../lib/utility.js');

module.exports = {
  qid: 'xor',
  score: 5,
  size: 8,
  pattern: (function(){
    var len = 8;
    var mat = U.make(len);
    for(var i=0; i<len; i++){
      for(var j=0; j<len; j++){
        if( (i+j) & 1 ) mat[i][j] = true;
      }
    }
    return mat;
  })()
};