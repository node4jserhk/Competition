var React = require('react');
var Flux = require('../../lib/FluxMixin.js');
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

var Ranking = React.createClass({
  mixins: [Flux.mixin],
  getInitialState: function(){
    var rank = State.getRank();
    rank.sort(this._compare);
    return { rank: rank };
  }
  ,
  componentDidMount: function(){
    var self = this;
    this.register(function(e){
      if( e.type === 'State.rank.new' ){
        e.rank.sort(self._compare);
        self.setState({ rank: e.rank });
      }
    })
  }
  ,
  _compare: function(a,b){
    if( a.score === b.score ){
      return a.lastAnswerAt < b.lastAnswerAt ? -1 : 1;
    }
    return a.score < b.score ? 1 : -1;
  }
  ,
  render: function(){
    var rank = this.state.rank;

    return <table className="ui table" >
      <thead>
      <td>#</td>
      <td>Player</td>
      <td>Score</td>
      <td>Last</td>
      </thead>
      <tbody>
      {
        rank.map(function(pro, i){
          var t = formatTime(pro.lastAnswerAt + State.getDrift() - State.getStartTime());
          return  <tr key={i} className="item">
            <td>{i+1}</td>
            <td className="header">{pro.name}</td>
            <td>{pro.score}</td>
            <td>{t}</td>
          </tr>
        })
      }
      </tbody>
    </table>
  }
});

module.exports = Ranking;