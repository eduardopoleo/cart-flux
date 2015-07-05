var AppDispatcher = require('../dispatchers/app-dispatcher');
//Does this automatically registers it to the dispatcher?
//No but we will need to use the AppDispatcher.register method to register to that specific dispatcher
//Depening on the
var AppConstants = require('../constants/app-constants');
var assign = require('react/lib/Object.assign');
//require the assigns to define the dispatcher and the stores
var EventEmitter = require('events').EventEmitter;
//Require broadcast the changes to the action/views?

var CHANGE_EVENT = 'change';

var _catalog = [];

for(var i=1; i<9; i++) {
 _catalog.push({
  'id': 'Widget' + i,
  'title': 'Widget #' + i,
  'summary': 'This is an awesome widget',
  'description': 'Lorem ipsum big very long and boring text',
  'cost': i,
  'img' : 'assets/placeholder.jpg'
 });
}
//How does the cart get updated eveytime??
//I think this file gets loaded once. Then _cartItem just gets updated.
var _cartItems = [];
///These are helper methods
function _removeItem(index){
  _cartItems[index].inCart = false;
  _cartItems.splice(index, 1);
}

function _increaseItem(index){
  _cartItems[index].qty++;
}

function _decreaseItem(index){
  if(_cartItems[index].qty>1){
    _cartItems[index].qty--;
  }
  else{
    _removeItem(index);
  }
}


function _addItem(item){
  //inCart is not a method is hash key
  if(!item.inCart){
    item['qty'] = 1;
    item['inCart'] = true;
    _cartItems.push(item);
  }
  else{
    _cartItems.forEach(function(cartItem, i){
      if(cartItem.id===item.id){
        _increaseItem(i);
      }
    });
  }
}

function _cartTotals(){
  var qty =0, total = 0;
  _cartItems.forEach(function(cartItem){
    qty += cartItem.qty;
    total += cartItem.qty*cartItem.cost;
  });
  return{'qty': qty, 'total': total};
}
//Helper methods
//The store is an event emitter it self!.
var AppStore = assign(EventEmitter.prototype,{
  //These methods related to the information loop
  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },
  //Use in components to listen to specific events broadcasted by this store
  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback);
  },
  //Remove the listerner to avoid memory leaks
  removeChangeListener: function(){
    this.removeListener(CHANGE_EVENT, callback);
  },
  //These 3 methods are used to update the state of specific component  
  getCart: function(){
    return _cartItems;
  },

  getCatalog: function(){
    return _catalog;
  },

  getCartTotals: function(){
    return _cartTotals();
  },

  //Registering the dispatcher
  dispatcherIndex: AppDispatcher.register(function(payload){
    //payload = {source, action}, we only care about action.
    var action = payload.action;
    switch(action.actionType){
      case AppConstants.ADD_ITEM: //Having one place for the constants makes sense now.
       _addItem(payload.action.item); //action = {actiontype, item}
       break;

      case AppConstants.REMOVE_ITEM:
       _removeItem(payload.action.index); //action = {actiontype, index}
       break;

      case AppConstants.INCREASE_ITEM:
       _increaseItem(payload.action.index);
       break;

      case AppConstants.DECREASE_ITEM:
       _decreaseItem(payload.action.index);
       break;
    }
    AppStore.emitChange();
    //Broadcast the events to the views in here
    return true;
  })
});

module.exports = AppStore;
