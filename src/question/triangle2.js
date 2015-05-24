var U = require('../lib/utility.js');

var log = console.log.bind(console);

module.exports = {
  qid: 'triangle2',
  score: 5,
  size: 32,
  pattern: (function(){
    var len = 32;
    var mat = U.make(len);

    var row = new Array(len);
    for(var i=0; i<len; i++) row[i] = 0;
    row[0] = 1;

    for(var i=0; i<len; i++){
      for(var j=len; j--;){
        if( row[j] % 2 == 1) mat[i][j] = true;
        if( j >= 1 ) row[j] += row[j-1];
      }
    }
    return mat;
  })()
};