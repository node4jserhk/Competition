var U = require('../lib/utility.js');

var len = 9;
module.exports = {
  qid: 'line2',
  score: 5,
  size: len,
  level: 2,
  pattern: (function() {
    var mat = U.make(len);
    for (var i = 1; i < len; i += 2){
      for (var j = 0; j < len; j++) {
        mat[i][j] = true;
        mat[j][i] = true;
      }
    }
    return mat;
  })()
};