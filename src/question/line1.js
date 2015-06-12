var U = require('../lib/utility.js');

module.exports = {
  qid: 'line1',
  score: 5,
  size: 8,
  level: 2,
  pattern: (function(){
    var len = 8;
    var mat = U.make(len);
    for(var t=len-2; t<=len; t++){
      for(var i=0; i<len; i++){
        var j = t - i;
        if( 0 <= i && i < len && 0 <= j && j < len ) mat[i][j] = true;
      }
    }
    return mat;
  })()
};