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
      mode: state.mode,
      grid: state.grid,
      questions: state.questions
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

    var s = "resize(8);\nfor(var i=0; i&lt;size; i++) set(i, 0);\ncheck();";
    $(React.findDOMNode(this.refs.editor)).append($('<pre id="editor" style="width: 400px; height: 300px;">' + s + '</pre>'));

    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/tomorrow_night");
    editor.getSession().setMode("ace/mode/javascript");
    editor.commands.addCommand({
      name: 'myCommand',
      bindKey: {win: 'Ctrl-Enter',  mac: 'Command-Enter'},
      exec: function(editor) {
        try{
          eval(editor.getValue());
        }
        catch(ex){
          log(ex);
        }
      },
      readOnly: true
    });
  }
  ,
  componentWillUnmount: function(){
    log('this should never be unmounted!!');
  }
  ,
  _onInstruction: function(){
    this.transitionTo('instruction');
  }
  ,
  _onQuestionClick: function(qid){
    var self = this;
    return function(){
      self.transitionTo('/lobby/question/' + qid);
    }
  }
  ,
  render: function(){
    var self = this;
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
          <Grid grid={this.state.grid} size="300px" />
        </div>
        <div ref="editor" />

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
            return <div key={q.qid} onClick={self._onQuestionClick(k)}>
              <Question question={q} />
            </div>
          })
        }
      </section>

      <RouteHandler />
    </div>
  }
});