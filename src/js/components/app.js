var React = require('react');
var AppActions = require('../actions/app-actions');

var App = React.createClass({
  handler: function(){
    console.log('I am here');
    AppActions.addItem("this is an item") 
  },
  render:function(){
    return <h1 onClick= {this.handler}> My awesome Flux app </h1> 
  }
});

module.exports = App;
