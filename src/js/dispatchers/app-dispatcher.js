var Dispatcher = require('flux').Dispatcher;
var assign = require('react/lib/Object.assign');
//Requires the facebook dispatcher to have access to the magic

var AppDispatcher = assign(new Dispatcher(), {
  handleViewAction: function(action) {
    this.dispatch({
      source: "VIEW_ACTION",
      action: action
    })
  }
});

module.exports = AppDispatcher
