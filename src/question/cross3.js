var U = require('../lib/utility.js');

var len = 12;
module.exports = {
  qid: 'cross3',
  score: 5,
  size: len,
  level: 3,
  pattern: (function(){
    var mat = U.make(len);

    for(var i=0; i<len; i+=3){
      for(var j=0; j<len; j+=3){
        if( (i+j)/3 % 2 === 0 ){
          mat[i][j] = mat[i+1][j+1] = mat[i+2][j+2] = true;
        }
        else {
          mat[i+2][j] = mat[i+1][j+1] = mat[i][j+2] = true;
        }
      }
    }

    return mat;
  })()
};