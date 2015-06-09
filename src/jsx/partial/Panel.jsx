var React = require('react');
var Flux = require('../../lib/FluxMixin.js');
var State = require('../model/State.js');
var Ranking = require('../component/Ranking.jsx');

var If = require('../component/If.jsx');

function mountTime(node){
  var timer = setInterval(function(){
    var remain = State.getEndTime() + State.getDrift() - Date.now();
    if( remain <= 0 ){
      clearInterval(timer);
      remain = 0;
    }
    node.textContent = (remain/1000).toFixed(3);
  }, 17);

  return timer;
}

var Panel = React.createClass({
  mixins: [Flux.mixin],
  getDefaultProps: function(){
    return {};
  }
  ,
  getInitialState: function(){
    return {
      mode: State.getMode(),
      timer: null
    };
  }
  ,
  componentDidMount: function(){
    var self = this;

    this.register(function(e){
      if( e.type === 'State.mode.new' ){
        var elem = document.getElementById('time');
        var timer = mountTime(elem);
        self.setState({ mode: e.mode, timer: timer });
      }
    })
  }
  ,
  _start: function(){
    var m = React.findDOMNode(this.refs.duration).value;
    var p = React.findDOMNode(this.refs.password).value;
    api.Game.launch(parseInt(m),p);
  }
  ,
  render: function(){
    var mode = this.state.mode;

    return <div className="panel">

      <div className="time-remain">
        <div>Time Remaining in second</div>
        <div id="time">0.000</div>
      </div>

      <If className="ranking" condition={ mode !== 'before' }>
        <Ranking />
      </If>

      <If className="form" condition={ mode === 'before' }>
        <form className="ui form">
          <div className="fields">
            <div className="field">
              <label>Duration (minute)</label>
              <input ref="duration" type="number" />
            </div>
            <div className="field">
              <label>Pass-phrase</label>
              <input ref="password" type="password" />
            </div>
          </div>
          <div className="ui green button" onClick={this._start} >START</div>
        </form>
      </If>

    </div>
  }
});

module.exports = Panel;