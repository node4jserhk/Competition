var React = require('react');

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
    var size = this.props.size || '100px';

    var id = 0;
    return <div className="grid" style={{ width: size, height: size }}>
      {
        grid.map(function(arr, i){
        // shape would not change, only attributes
        return <div className="row" key={id++} >
          {
            arr.map(function(e, j){
              var color = e ? 'black' : 'white' ;
              return <div key={id++} className={"item " + color} />
            })
          }
        </div>
        })
      }
    </div>
  }
});