var constant = function(x){ return function(){ return x; }};
var isUndefined = function(x){ return typeof x === 'undefined' };
var isNull = function(x){ return x === null };
var isFalsity = function(x){ return isUndefined(x) || isNull(x) };
var isFunction = function(x){ return typeof x === 'function' };
var isArray = Array.isArray;

function objectKeyValMap(obj, map){
  var arr = [];
  for(var key in obj){
    if( ! obj.hasOwnProperty(key) ) continue;
    arr.push(map.call(null, key, obj[key], arr));
  }
  return arr;
}

function arrayGroupBy(arr, groupOf){
  var groups = {};
  for(var i=0; i<arr.length; i++){
    var x = arr[i];
    var g = groupOf(x);
    var lis = groups[g];
    if( Array.isArray(lis) ) lis.push(x);
    else groups[g] = [x];
  }
  return groups;
}

module.exports = {
  constant: constant,
  isUndefined: isUndefined,
  isNull: isNull,
  isFalsity: isFalsity,
  isFunction: isFunction,
  keyValMap: objectKeyValMap,
  arrayGroupBy: arrayGroupBy
};