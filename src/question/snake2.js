var U = require('../lib/utility.js');
var basename = require('path').basename;

module.exports = {
  qid:  basename(__filename, '.js'),
  score: 5,
  size: 13,
  pattern: (function(){
    var len = 13;
    var mat = U.make(len);

    for(var i=0; i<len; i++){
      if( i % 2 === 0 ) for(var j=0; j<len; j++) mat[j][i] = true;
      else if( i % 4 === 1 ) mat[0][i] = true;
      else if( i % 4 === 3 ) mat[len-1][i] = true;
    }

    return mat;

  })()
};