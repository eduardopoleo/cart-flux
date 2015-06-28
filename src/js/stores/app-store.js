var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;


var CHANGE_EVENT = 'change';

var _catalog = [];

for(var i=1; i<9; i++) {
 _catalog.push({
  'id': 'Widget' + i,
  'title': 'Widget #' + i,
  'summary': 'This is an awesome widget',
  'description': 'Lorem ipsum big very long and boring text',
  'cost': i
 }); 
}

var _cartItems = [];

function _removeItem(index){
  _cartItem[index].inCart = false;
  _cartItem.splice(index, 1);
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

var AppStore = assign(EventEmmiter.prototype,{
  emitChange: function(){
    this.emit(CHANGE_EVENT)  
  },

  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener: function(){
    this.removeListener(CHANGE_EVENT, callback)
  },

  getCart: function(){
    return _cartItems 
  },

  getCatalog: function(){
    return _catalog
  },

  getCartTotals: function(){
    return _cartTotals() 
  },

  dispatcherIndex: AppDispatcher.register(function(payload){
    var action = payload.action; //Action from handleViewAction
    switch(action.actionType){
      case AppConstants.ADD_ITEM:
       _addItem(payload.action.item); 
       break;

      case AppConstants.REMOVE_ITEM:
       _addItem(payload.action.index); 
       break;

      case AppConstants.INCREASE_ITEM:
       _addItem(payload.action.index); 
       break;

      case AppConstants.DECREASE_ITEM:
       _addItem(payload.action.index); 
       break;
    } 
    AppStore.emitChange();

    return true;
  })
})
