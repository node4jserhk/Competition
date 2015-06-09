var React = require('react');

module.exports = React.createClass({
  mixins: [],
  getDefaultProps: function(){
    return {
      size: '100px',
      guide: false
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
    var grid = this.props.grid;
    var size = this.props.size;
    var guide = this.props.guide;

    var len = grid.length;
    var id = 0;

    var rows = grid.map(function(arr, i){
      // shape would not change, only attributes
      var row = arr.map(function(e, j){
        var color = e ? 'black' : 'white' ;
        return <div key={id++} className={"item " + color} />
      });
      if( guide ) row.unshift(<div className="guide">{i}</div>);

      return <div className="row" key={id++} >{row}</div>
    });

    // prepend header
    if(guide){
      var arr = new Array(len+1);
      arr[0] = <div key={id++} className="guide"/>;
      for(var i=0; i<len; i++) arr[i] = <div key={id++} className="guide">{i}</div>;
      rows.unshift(<div className="row" key={id++} >{arr}</div>);
    }

    return <div className="grid" style={{ width: size, height: size }}>{ rows }</div>
  }
});