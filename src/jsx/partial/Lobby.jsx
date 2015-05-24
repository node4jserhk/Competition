var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Flux = require('../../lib/FluxMixin.js');

var Grid = require('../component/Grid.jsx');


var Question = React.createClass({
  mixins: [],
  getDefaultProps: function(){
    return {};
  }
  ,
  getInitialState: function(){
    return {};
  }
  ,
  componentDidMount: function(){
  }
  ,
  componentWillUnmount: function(){
  }
  ,
  render: function(){
    var q = this.props.question;

    return <div className="ui card" >
      <div className="content">

        <div className="header">{q.qid}</div>
        <div className="meta">{q.size}x{q.size}</div>
        <span className="right floated">
          <Grid grid={q.pattern} />
        </span>
      </div>
      <div className="ui bottom attached button">
        Details
      </div>
    </div>
  }
});

module.exports = React.createClass({
  mixins: [Router.Navigation, Flux.mixin],
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
  _onInstruction: function(){
    this.transitionTo('instruction');
  }
  ,
  render: function(){
    var questions = this.state.questions;

    return <div className="lobby">

      <section className="header">
        <div className="ui red button" onClick={this._onInstruction} >Instruction</div>
        <div className="gadget">
          <header>Time Remaining</header>
          <div className="time">10:00</div>
        </div>
        <div className="gadget">
          <header>Score</header>
          <div>50</div>
        </div>
      </section>

      <section className="board">
        <div className="dialog">
          <Grid grid={this.state.grid} size="300" />
        </div>
        <div className="ui list">
          <div>Ranking</div>
          <div className="item">
            <div className="header">1. abc</div>
            <div>00:00:00</div>
          </div>
          <div className="item">
            <div className="header">2. abc</div>
            <div>00:00:00</div>
          </div>
          <div className="item">
            <div className="header">3. abc</div>
            <div>00:00:00</div>
          </div>
          <div className="item">
            <div className="header">4. abc</div>
            <div>00:00:00</div>
          </div>
          <div className="item">
            <div className="header">5. abc</div>
            <div>00:00:00</div>
          </div>
        </div>
      </section>

      <section className="ui cards">
        {
          Object.keys(questions).map(function(k){
            var q = questions[k];
            return <Question key={q.qid} question={q} />
          })
        }
      </section>

      <RouteHandler />
    </div>
  }
});