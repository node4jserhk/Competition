//var React = require('react');
//
//var Modal = React.createClass({
//  getDefaultProps: function(){
//    return {
//      onBackgroundClick: function(){}
//    }
//  }
//  ,
//  getInitialState: function(){
//    return {
//      open: true
//    }
//  }
//  ,
//  toggle: function(){
//    this.setState({
//      open: !this.state.open
//    });
//  }
//  ,
//  open: function(){
//    this.setState({ open: true });
//  }
//  ,
//  close: function(){
//    this.setState({ open: false });
//  }
//  ,
//  _onBackgroundClick: function(event){
//    //log( event.target , this.refs.background, React.findDOMNode(this.refs.background) );
//    if( event.target === React.findDOMNode(this.refs.background) ){
//      this.props.onBackgroundClick(event);
//    }
//    event.stopPropagation();
//  }
//  ,
//  render: function(){
//    var close = this.state.open ? '' : 'close';
//    return <div className="modal">
//      <div ref="background" className={ 'content ' + close } onClick={this._onBackgroundClick} >
//        { this.props.children }
//      </div>
//    </div>
//  }
//});
//
//module.exports = Modal;