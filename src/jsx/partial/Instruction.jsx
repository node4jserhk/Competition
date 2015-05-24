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
    this.replaceWith('lobby');
  }
  ,
  render: function(){
    return <div>
      <Modal ref="modal" onBackgroundClick={this._onBackgroundClick} >
        <div className="paper">
          <h2>Instruction</h2>

          <h3>API</h3>
          <div className="ui bulleted list">
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
              <div className="header">unset(y,x)</div>
              <div className="description">Set position (y,x) to be white.</div>
            </div>
            <div className="item">
              <div className="header">unsetAll(y,x)</div>
              <div className="description">Set all position to be white.</div>
            </div>
            <div className="item">
              <div className="header">check()</div>
              <div className="description">Check whether whether the current pattern match any one of the challenge.</div>
            </div>
          </div>

          <h3>Example</h3>
        </div>
      </Modal>
    </div>
  }
});