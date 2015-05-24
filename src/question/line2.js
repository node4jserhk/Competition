var U = require('../lib/utility.js');

module.exports = {
  qid: 'line2',
  score: 5,
  size: 8,
  pattern: (function(){
    var len = 8;
    var mat = U.make(len);
    for(var i=0; i<len; i+=2)
      for(var j=0; j<len; j++)
        mat[i][j] = true;
    return mat;
  })()
};