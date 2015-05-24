var React = require('react');
var Router = require('react-router');
var FluxMixin = require('../../lib/FluxMixin.js');

module.exports = React.createClass({
  mixins: [Router.Navigation, FluxMixin],
  getDefaultProps: function(){
    return {};
  }
  ,
  getInitialState: function(){
    return {
      name: ""
    };
  }
  ,
  componentDidMount: function(){

  }
  ,
  componentWillUnmount: function(){
  }
  ,
  _onUsernameChange: function(event){
    this.setState({ name: event.target.value });
  }
  ,
  _onRegister: function(){
    var self = this;
    var name = this.state.name;
    if( name === '' ){
      this.setState({error: 'Sorry, player name cannot be empty.'});
    }
    else {
      $.ajax({
        type: 'GET',
        url: '/getProfile?name=' + this.state.name
      }).done(function(profile){
        window.profile = profile;
        // todo: persisent name
        self.transitionTo('lobby');
      });
    }
  }
  ,
  render: function(){
        //<form className="ui form segment" onSubmit={this._onRegister} >
        //  <div className="fields">
        //    <div className="field">
        //      <label>Please Enter Player Name</label>
        //      <input type="text" onChange={this._onUsernameChange}  />
        //      <div className="error" >{ this.state.error }</div>
        //    </div>
        //  </div>
        //  <button className="ui primary button">Register</button>
        //</form>
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