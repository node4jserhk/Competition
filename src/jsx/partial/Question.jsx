//var React = require('react');
//var Grid = require('../component/Grid.jsx');
//var Modal = require('../component/Modal.jsx');
//var Router = require('react-router');
//
//module.exports = React.createClass({
//  mixins: [Router.Navigation],
//  getDefaultProps: function(){
//    return {};
//  }
//  ,
//  getInitialState: function(){
//    return {};
//  }
//  ,
//  componentDidMount: function(){
//  }
//  ,
//  componentWillUnmount: function(){
//  }
//  ,
//  _onBackgroundClick: function(){
//    //this.replaceWith('lobby');
//  }
//  ,
//  render: function(){
//    var qid = this.props.params.id;
//    var q = state.questions[qid]  ;
//    var size = Math.min(400, q.size * 30) + 'px';
//    return <div>
//      <Modal onBackgroundClick={this._onBackgroundClick} >
//        <div className="paper">
//          <Grid grid={q.pattern} size={size} />
//          <h2>{q.qid}</h2>
//          <h3>{q.size} x {q.size}</h3>
//        </div>
//      </Modal>
//    </div>
//  }
//});
