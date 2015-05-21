var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Frame = React.createClass({
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
    return <div>
      <RouteHandler />
    </div>
  }
});

module.exports = Frame;