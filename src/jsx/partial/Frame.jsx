var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Flux = require('../../lib/FluxMixin.js');

var Frame = React.createClass({
  mixins: [Flux.mixin],
  getDefaultProps: function(){
    return {};
  }
  ,
  getInitialState: function(){
    return {
      message: ''
    };
  }
  ,
  componentDidMount: function(){
    var self = this;
    this.register(function(e){
      log(e);
      if( e.type === 'notify' ){
        self.setState({
          message: e.message
        })
      }
    })
  }
  ,
  componentWillUnmount: function(){
  }
  ,
  render: function(){
    var msg = this.state.message;
    var notification = null;
    if( msg !== '' ){
      notification = <div className="notification" >{msg}</div>
    }
    return <div>
      <div key="main">
        { notification }
        <RouteHandler />
      </div>
    </div>
  }
});

module.exports = Frame;