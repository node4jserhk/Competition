var React = require('react');
var Grid = require('../component/Grid.jsx');
var State = require('../model/State.js');

function formatTime(n){
  if( n <= 0 ) return '00:00';
  var pad = function(x){
    return x < 10 ? '0' + x : x.toString();
  };
  n = Math.floor(n/1000);
  var ss = n % 60;
  var mm = Math.floor(n / 60);
  return pad(mm) + ':' + pad(ss);
}

var Question = React.createClass({
  render: function(){
    var q = this.props.question;
    var ans = this.props.answer;
    var time = '';
    var stars = [];
    if( ans ){
      if( ans.time ) time = formatTime(ans.time + State.getDrift() - State.getStartTime() );
    }
    var n = q.level;
    while(n--) stars.push(<i key={n} className="yellow star icon"></i> );

    var hint = "";
    if( q.hint ) hint = <a href={q.hint} target="_blank">Hint</a>;
    return <div className="question-item">
      <Grid grid={q.pattern} size="80px"/>
      <div>Challenge #{this.props.index}</div>
      <div>{ q.qid }</div>
      <div className="meta">{q.size}x{q.size} @{q.score}</div>
      <div>{ stars }</div>
      <div>{ time }</div>
      <div>{ hint }</div>
    </div>

  }
});

module.exports = Question;