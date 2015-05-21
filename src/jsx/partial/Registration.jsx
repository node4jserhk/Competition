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
    this.setState({ name: event.target.value })
  }
  ,
  _onRegister: function(){
    var self = this;
    $.ajax({
      type: 'GET',
      url: '/getProfile?name=' + this.state.name
    }).done(function(profile){
      window.profile = profile;
      // todo: persisent name
      self.transitionTo('lobby');
    });
  }
  ,
  render: function(){
    return <div>
      <div>Please Enter Your Name</div>
      <form onSubmit={this._onRegister} >
        <input type="text" onChange={this._onUsernameChange}  />
        <button className="ui primary button">Register</button>
      </form>
    </div>
  }
});