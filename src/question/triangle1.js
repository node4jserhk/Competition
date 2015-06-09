var U = require('../lib/utility.js');

var len = 8;
module.exports = {
  qid: 'triangle1',
  score: 5,
  size: len,
  level: 2,
  pattern: (function(){
    var mat = U.make(len);

    for(var i=0; i<len; i++){
      for(var j=0; j<=i; j++){
        mat[i][j] = true;
      }
    }
    return mat;
  })()
};