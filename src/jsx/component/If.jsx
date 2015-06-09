var React = require('React');

module.exports = React.createClass({
  mixins: [],
  getDefaultProps: function(){
    return {
      condition: true
    };
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
    if( this.props.condition ) return <div {...this.props} />;
    return <noscript />;
  }
});