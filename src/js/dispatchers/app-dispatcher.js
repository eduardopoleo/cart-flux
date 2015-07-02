var Dispatcher = require('flux').Dispatcher;
var assign = require('react/lib/Object.assign');
//Requires the facebook dispatcher to have access to the magic

var AppDispatcher = assign(new Dispatcher(), {
  handleViewAction: function(action) {
    console.log('action', action)
    //dispatch it is probably defined in the flux dispatcher (but what does it do?)
    //How does it know that it has to update the cart? Is the cart registered to the payload?
    this.dispatch({
      source: "VIEW_ACTION",
      action: action
    })
  }
});

module.exports = AppDispatcher
