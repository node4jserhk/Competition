var U = require('../lib/utility.js');

module.exports = {
  qid: 'triangle1',
  score: 5,
  size: 16,
  pattern: (function(){
    var len = 16;
    var mat = U.make(len);

    for(var i=0; i<len; i++){
      for(var j=0; j<=i; j++){
        mat[i][j] = true;
      }
    }
    return mat;
  })()
};