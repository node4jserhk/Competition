var U = require('../lib/utility.js');

module.exports = {
  qid: 'snake',
  score: 5,
  size: 17,
  pattern: (function(){
    var len = 17;
    var mat = U.make(len);

    function draw(y,x,n){
      var i;
      for(i=0; i<n; i++) mat[y+n-1][x+i] = mat[y][x+i] = true;
      for(i=0; i<n; i++) mat[y+i][x+n-1]= true;
      for(i=2; i<n; i++) mat[y+i][x] = true;
      if( n >= 5 ){
        mat[y+2][x+1] = true;
        draw(y+2,x+2,n-4);
      }
    }
    draw(0,0,len);
    return mat;

  })()
};