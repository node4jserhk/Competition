var U = require('../lib/utility.js');

module.exports = {
  qid: 'line1',
  score: 5,
  size: 8,
  pattern: (function(){
    var len = 8;
    var mat = U.make(len);
    for(var i=0; i<len; i++) mat[i][0] = true;
    return mat;
  })()
};