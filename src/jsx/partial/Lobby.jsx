var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Flux = require('../../lib/FluxMixin.js');

var uid = 0;

module.exports = React.createClass({
  mixins: [Flux.mixin],
  getDefaultProps: function(){
    return {};
  }
  ,
  getInitialState: function(){
    return {
      grid: window.grid,
      questions: window.questions
    };
  }
  ,
  componentDidMount: function(){
    var self = this;

    this.register(function(e){
      if( e.type === 'grid.new' ){
        self.setState({ grid: e.grid });
      }
    });

    this.register(function(e){
      if( e.type === 'question.new' ){
        self.setState({ questions: e.questions })
      }
    });
  }
  ,
  componentWillUnmount: function(){
  }
  ,
  render: function(){

    var grid = this.state.grid;
    var gridDiv = grid.map(function(arr, i){
      // force update and suppress warnings
      return <div key={uid++} >
        {
          arr.map(function(e, j){
            var color = e ? 'black' : 'white' ;
            return <div key={i + ',' + j} className={"item " + color} />
          })
        }
      </div>
    });

    var questions = this.state.questions;
    var qs = Object.keys(questions).map(function(k){
      var q = questions[k];
      return <div key={q.qid} >
        {q.qid}
      </div>
    });

    return <div className="lobby">
      <section clasNames="board">
        <div>
          <div>Time Remaining</div>
          <div>Top 10</div>
          <div className="grid">{ gridDiv }</div>
        </div>
      </section>

      <section className="question">
        { qs }
      </section>

      <RouteHandler />
    </div>
  }
});