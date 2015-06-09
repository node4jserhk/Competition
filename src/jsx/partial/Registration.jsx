var React = require('react');
var Router = require('react-router');
var FluxMixin = require('../../lib/FluxMixin.js');
var State = require('../model/State.js');


module.exports = React.createClass({
  mixins: [Router.Navigation, FluxMixin],
  getDefaultProps: function(){
    return {};
  }
  ,
  getInitialState: function(){
    return {
      name: "",
      error: ""
    };
  }
  ,
  componentDidMount: function(){
    var self = this;
    if( localStorage ) {
      var player = localStorage.getItem('player');
      if (player !== null) self.enter(player);
    }
  }
  ,
  componentWillUnmount: function(){

  }
  ,
  _onUsernameChange: function(event){
    this.setState({ name: event.target.value });
  }
  ,
  _onRegister: function() {
    var name = this.state.name;
    if (name === '') {
      this.setState({ error: 'Sorry, player name cannot be empty.' });
    }
    else this.enter(name);
  }
  ,
  enter: function(name){
    var self = this;
    api.Profile.getProfile(name, function(profile){
      if( localStorage ) localStorage.setItem('player', name);
      State.setPlayer(name);
      State.setProfile(profile);

      api.Game.getMode(State.setMode);
      api.Game.getTimes(State.setTimes);
      api.Question.getQuestions(State.setQuestions);
      api.Profile.getTop(10, State.setRank);

      self.transitionTo('lobby');
    });
  }
  ,
  render: function(){
    return <div className="registration" >
      <div className="dialog">
        <form onSubmit={this._onRegister} >
          <div className="ui right action input">
            <input type="text" placeholder="Player Name" onChange={this._onUsernameChange} />
            <button className="ui teal button" >Enter</button>
          </div>
        </form>
        <div className="error" >{ this.state.error }</div>
      </div>
    </div>
  }
});