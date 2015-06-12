var React = require('react');

//module.exports = React.createClass({
//  mixins: [],
//  getDefaultProps: function(){
//    return {
//      size: '100px',
//      guide: false
//    };
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
//  render: function(){
//    var grid = this.props.grid;
//    var size = this.props.size;
//    var guide = this.props.guide;
//
//    var len = grid.length;
//    var id = 0;
//
//    var rows = grid.map(function(arr, i){
//      // shape would not change, only attributes
//      var row = arr.map(function(e, j){
//        var color = e ? 'black' : 'white' ;
//        return <div key={id++} className={"item " + color} />
//      });
//      if( guide ) row.unshift(<div className="guide">{i}</div>);
//
//      return <div className="row" key={id++} >{row}</div>
//    });
//
//    // prepend header
//    if(guide){
//      var arr = new Array(len+1);
//      arr[0] = <div key={id++} className="guide"/>;
//      for(var i=0; i<len; i++) arr[i] = <div key={id++} className="guide">{i}</div>;
//      rows.unshift(<div className="row" key={id++} >{arr}</div>);
//    }
//
//    return <div className="grid" style={{ width: size, height: size }}>{ rows }</div>
//  }
//});


module.exports = React.createClass({
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
    var grid = this.props.grid;
    var size = this.props.size;
    var guide = this.props.guide;

    var len = grid.length;
    var id = 0;
    size = parseInt(size.slice(0,size.length-2));

    var rects = [];
    var g = guide ? 1 : 0;
    var f = size/(len+g);
    for(var i=0; i<len; i++){
      for(var j=0; j<len; j++){
        rects.push(<rect
          key={id++}
          x={(j+g)*f} y={(i+g)*f}
          width={f} height={f}
          style={{
            fill: grid[i][j] ? '#888' : 'white',
            stroke: '#777',
            strokeWidth: 1
          }} />);
      }
    }

    if(guide){
      for(i=1; i<len+g; i++){
        rects.push(<text key={id++} x={(i+.5)*f} y={.8*f} style={{ textAnchor: 'middle', stroke: 'white' }}>{i-1}</text>);
        rects.push(<text key={id++} x={.5*f} y={(i+.8)*f} style={{ textAnchor: 'middle', stroke: 'white' }}>{i-1}</text>);
      }
    }

    return <svg className="grid" width={size} height={size} viewBox={"0 0 " + size + ' ' + size}>{rects}</svg>
  }
});