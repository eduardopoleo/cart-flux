var React = require('react');
var AppStore = require('../stores/app-store');

var StoreWatchMixin = function(cb){
  return{
    getInitialState: function(){
      return cb();
    },
    //After mount it listen for the event and then triggers the on_chage
    //This methods just says. Hey there is a change go there to do something about it.
    componentWillMount: function(){
      AppStore.addChangeListener(this._onChange);
    },

    componentWillUnMount: function(){
      AppStore.removeChangeListener(this._onChange);
    },
    //On change what it does is to retrieve the store cart item :) yei
    _onChange: function(){
      this.setState(cb());
    }
  };
};

module.exports = StoreWatchMixin;
