var U = require('../lib/utility.js');

var len = 16;
module.exports = {
  qid: 'square3',
  score: 5,
  size: len,
  level: 2,
  pattern: (function(){
    var mat = U.make(len);

    //function run(shift, len){
    //  var l = len/2;
    //  for(var i=0; i<l; i++){
    //    for(var j=0; j<l-i; j++){
    //      mat[shift + i][shift + j] = true;
    //      mat[shift + len-1-i][shift + j] = true;
    //      mat[shift + i][shift + len-1-j] = true;
    //      mat[shift + len-1-i][shift + len-1-j] = true;
    //    }
    //  }
    //  if( l > 1 ) run(shift + l/2, l);
    //}
    //run(0,len);

    var drawRect = function(x,y,width){

    };


    function run(len){
      if( len < 3 ) return;

    }


    return mat;
  })()
};