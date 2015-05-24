var React = require('react');
var Modal = require('../component/Modal.jsx');
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
    return <div>
      <Modal ref="modal" onBackgroundClick={this._onBackgroundClick} >
        <div>
        </div>
      </Modal>
    </div>
  }
});