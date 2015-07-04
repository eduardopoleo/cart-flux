var React = require('react');
var AppActions = require('../../actions/app-actions');
//Requires app action, why?
//Pressing the button triggers the 'ACTION' of adding an item to the cart!
//Separated this from the app catalog to have content-view apart from action-view
var AddToCart = React.createClass({
  handler: function(){
    AppActions.addItem(this.props.item);
  },
  render:function(){
    return <button onClick={this.handler}>Add to Cart</button>
  }
});

module.exports = AddToCart;
