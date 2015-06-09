var U = require('../lib/utility.js');

module.exports = {
  qid: 'cross2',
  score: 5,
  size: 5,
  level: 1,
  practice: true,
  pattern: (function(){
    var size = 5;
    var mat = U.make(size);
    for(var i=0; i<size; i++){
      mat[i][i] = mat[size-i-1][i] = true;
    }
    return mat;
  })()
};