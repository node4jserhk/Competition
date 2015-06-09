var U = require('../lib/utility.js');

var len = 16;
module.exports = {
  qid: 'square2',
  score: 5,
  size: len,
  level: 2,
  pattern: (function(){
    var mat = U.make(len);

    /*
      type 0:
        x .
        . X
      type 1:
        . X
        X .
     */
    var run = function(x,y,t,type){
      var n = t >> 1;
      if( n === 0 ) return;

      var i,j;
      if( type === 0 ){
        for(i=0; i<n; i++){
          for(j=0; j<n; j++){
            mat[x+i][y+j] = mat[x+n+i][y+n+j] = true;
          }
        }
        run(x+n,y,n,1-type);
        run(x,y+n,n,1-type);
      }
      else {
        for(i=0; i<n; i++){
          for(j=0; j<n; j++){
            mat[x+i][y+n+j] = mat[x+n+i][y+j] = true;
          }
        }
        run(x,y,n,1-type);
        run(x+n,y+n,n,1-type);
      }
    };
    run(0,0,len,0);

    return mat;
  })()
};