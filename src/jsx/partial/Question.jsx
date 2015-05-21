var React = require('react');
var Modal = require('../component/modal.jsx');
var Router = require('react-router');

module.exports = React.createClass({
  mixins: [Router.Navigation],
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
  _onBackgroundClick: function(){
    this.goBack();
  }
  ,
  render: function(){
    var id = this.props.param.id;
    return <div>
      <Modal onBackgroundClick={this._onBackgroundClick} >
      </Modal>
    </div>
  }
});