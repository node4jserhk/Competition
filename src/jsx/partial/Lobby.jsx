var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Flux = require('../../lib/FluxMixin.js');

var Grid = require('../component/Grid.jsx');
var If = require('../component/If.jsx');
var Ranking = require('../component/Ranking.jsx');
var Board = require('../model/Board.js');
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


function mountEditor(node){
  var s = "resize(5);\nfor(var i=0; i&lt;size; i++){\n    set(i, 2);\nset(2,i);\n}";
  $(node).append(
    $('<pre id="editor" >' + s + '</pre>')
  );

  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/tomorrow_night");
  editor.getSession().setMode("ace/mode/javascript");
  editor.commands.addCommand({
    name: 'myCommand',
    bindKey: {win: 'Ctrl-Enter',  mac: 'Command-Enter'},
    exec: function(editor) {
      try{
        Board.eval(editor.getValue());
      }
      catch(ex){
        log(ex);
      }
    },
    readOnly: true
  });
}

function mountTimer(node){
  setInterval(function(){
    var mode = State.getMode();
    if( mode === 'between' ){
      var n = Math.max(0, State.getEndTime() - Date.now());
      node.textContent = formatTime(n);
    }
    else if( mode === 'before' ){
      node.textContent = "--:--";
    }
    else if( mode === "after" ){
      node.textContent = "End";
    }
    else node.textContent = "";
  }, 500);
}

///////////////////////////////////////////////////////////

var Instruction = React.createClass({
  render: function(){
    return <div className="ui bulleted list">
      <div className="item">
        <div className="header">size</div>
        <div className="description">The size of one side of board.</div>
      </div>
      <div className="item">
        <div className="header">resize(n)</div>
        <div className="description">Create a new N x N board.</div>
      </div>
      <div className="item">
        <div className="header">set(y,x)</div>
        <div className="description">Set position (y,x) to be black.</div>
      </div>
      <div className="item">
        <div className="header"><strong>Ctrl-Enter (Win)</strong> or <strong>Cmd-Enter (Mac)</strong></div>
        <div className="description">Submit solution.</div>
      </div>
    </div>
  }
});

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

    return <div className="question-item">
      <Grid grid={q.pattern} size="80px"/>
      <div>Challenge #{this.props.index}</div>
      <div>{ q.qid }</div>
      <div>{ stars }</div>
      <div className="meta">{q.size}x{q.size}</div>
      <div>{ time }</div>
    </div>

  }
});



///////////////////////////////////////////////////////////

var Lobby = React.createClass({
  mixins: [Flux.mixin],
  getDefaultProps: function(){
    return {};
  }
  ,
  getInitialState: function(){
    return {
      questions: {},
      profile: State.getProfile(),
      grid: Board.getGrid(),
      mode: State.getMode(),
      showQuestions: true,
      showRanking: true
    };
  }
  ,
  componentDidMount: function(){
    var self = this;

    mountEditor(React.findDOMNode(this.refs.editor));
    mountTimer(React.findDOMNode(this.refs.timer));

    this.register(function(e){
      if( e.type === 'Board.grid.new' ){
        self.setState({ grid: e.grid })
      }
    });

    this.register(function(e){
      if( e.type === 'State.mode.new' ){
        self.setState({ mode: State.getMode() });
      }
    });

    this.register(function(e){
      if( e.type === 'State.questions.new' ){
        self.setState({ questions: e.questions });
      }
    });

    this.register(function(e){
      if( e.type === 'State.profile.new' ){
        self.setState({ profile: e.profile });
      }
    });
  }
  ,
  componentWillUnmount: function(){
    log('This should never be unmounted!!');
  }
  ,
  _toggleQuestions: function(){
    this.setState({ showQuestions: !this.state.showQuestions });
  }
  ,
  _toggleRanking: function(){
    this.setState({ showRanking: !this.state.showRanking });
  }
  ,
  render: function(){
    var mode = this.state.mode;
    var player = State.getPlayer();
    var profile = this.state.profile;
    var answers = profile.answer || {};
    var questions = this.state.questions;
    var grid = this.state.grid;

    var modeStr = "";
    if( mode === 'before' ) modeStr = "Practice";
    else if( mode === 'between' ) modeStr = "Contest";
    else if( mode === "after" ) modeStr = "Revision";


    var sortedQuestions = Object.keys(questions).map(function(k){
      return questions[k];
    });
    sortedQuestions.sort(function(a,b){
      if( a.level === b.level ){
        var x = a.name;
        var y = b.name;
        return (x > y) - (x < y);
      }
      return a.level < b.level ? -1 : 1;
    });

    return <div className="lobby">

      <section className="header">

        <div className="button tooltip">
          <div className="ui red button" >Instruction</div>
          <div className="tooltip-content"><Instruction /></div>
        </div>
        <div className="ui purple button" onClick={ this._toggleRanking }>Toggle Ranking</div>
        <div className="ui purple button" onClick={ this._toggleQuestions } >Toggle Questions</div>

        <div className="gadget">
          <header>Player</header>
          <div>{player}</div>
        </div>
        <div className="gadget">
          <header>Mode</header>
          <div>{modeStr}</div>
        </div>
        <div className="gadget">
          <header>Time Remaining</header>
          <div ref="timer">--:--</div>
        </div>
        <div className="gadget">
          <header>Score</header>
          <div>{profile.score || 0}</div>
        </div>
      </section>

      <section className="content">

        <If key="questions" condition={this.state.showQuestions}  className="questions">
          <p>Challenges</p>
          {
            sortedQuestions.map(function(q, i){
              return <div key={q.qid} >
                <Question index={i+1} question={q} answer={answers[q.qid]} />
              </div>
            })
          }
        </If>

        <div key="dashboard" className="dashboard">
          <div className="group">
            <p>Result</p>
            <Grid grid={grid} size="250px" guide={false}/>
          </div>
          <div id="editor" ref="editor"></div>
        </div>

        <If key="ranking" condition={this.state.showRanking} className="ranking">
          <div className="group">
            <p>Ranking</p>
            <Ranking />
          </div>
        </If>

      </section>

    </div>
  }
});

module.exports = Lobby;