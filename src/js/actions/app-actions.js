var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');
//app-Constant contains the name of the actions.
//requires the dispatcher due to the flow!

var AppActions = {
  //The info in this case will come from addToCart view.
  addItem: function(item){
    //In turn this sends the info to the dispatcher! 
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ADD_ITEM,
      item: item
    })
  },

  removeItem: function(index){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.REMOVE_ITEM,
      index: index
    })
  },

  increaseItem: function(index){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.INCREASE_ITEM,
      index: index
    })
  },

  decreaseItem: function(index){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.DEACREASE_ITEM,
      index: index
    })
  }
}

module.exports = AppActions;
