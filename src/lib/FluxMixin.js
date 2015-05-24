var Dispatcher = require('flux').Dispatcher;
// global setImmediate
require("setimmediate");


var id = 0;
var dispatcher = new Dispatcher();

window.dispatch = dispatcher.dispatch.bind(dispatcher);

dispatcher.mixin = {
  componentWillMount: function () {
    this.handlerIDs = [];
  }
  ,
  dispatch: function (event) {
    if (dispatcher.isDispatching()) {
      setImmediate(function () {
        dispatcher.dispatch(event);
      });
    }
    else dispatcher.dispatch(event);
  }
  ,
  register: function (handler) {
    log('register');
    var handlerId = dispatcher.register(handler);
    this.handlerIDs.push(handlerId);
    return handlerId;
  }
  ,
  componentWillUnmount: function() {
    var arr = this.handlerIDs;
    for(var i=0; i<arr.length; i++) log('unregister'), dispatcher.unregister(arr[i]);
  }
};

module.exports = dispatcher;
