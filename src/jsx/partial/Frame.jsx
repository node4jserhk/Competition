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
      message: '',
      timer: null
    };
  }
  ,
  componentDidMount: function(){
    var self = this;
    this.register(function(e){
      if( e.type === 'notify' ){
        //log('notify', e);
        var timer = self.state.timer;
        if( timer !== null ) clearTimeout(timer);
        timer = setTimeout(self.clear, 5000);
        self.setState({
          message: e.message,
          timer: timer
        })
      }
    })
  }
  ,
  clear: function(){
    this.setState({ message: '' });
  }
  ,
  componentWillUnmount: function(){
  }
  ,
  render: function(){
    var msg = this.state.message;
    var notification = null;
    var active = '';
    if( msg !== '' ) active = 'active';

    return <div>
      <RouteHandler />
      <div className={"notification " + active} >{msg}</div>
    </div>
  }
});

module.exports = Frame;