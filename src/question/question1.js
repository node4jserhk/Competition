var size = function(n){
  var mat = new Array(n);
  for(var i=0; i<n; i++){
    mat[i] = new Array(n);
    for(var j=0; j<n; j++){
      mat[i][j] = false;
    }
  }
  return mat;
};

module.exports = {
  qid: 'abc',
  score: 5,
  size: 8,
  pattern: (function(){
    var len = 8;
    var mat = size(len);
    for(var i=0; i<len; i++) mat[i][0] = true;
    return mat;
  })()
};