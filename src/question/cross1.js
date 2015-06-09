var U = require('../lib/utility.js');

module.exports = {
  qid: 'cross1',
  score: 5,
  size: 5,
  level: 1,
  practice: true,
  pattern: (function(){
    var size = 5;
    var mat = U.make(size);
    for(var i=0; i<size; i++){
      mat[2][i] = mat[i][2] = true;
    }
    return mat;
  })()
}