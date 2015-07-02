var React = require('react');
var AppStore = require('../stores/app-store.js')
var RemoveFromCart = require('./app-removefromcart.js')
var Increase = require('./app-decreaseitem')
var Decrease = require('./app-increaseitem')
//Cart needs components and react
//it also needs the store, why?

function cartItems(){
  return {items: AppStore.getCart()}
}
//here it is this is how it extracts the value of items from the appStore
//Now how does it know when to trigger this?, how does emit work?

var Cart = React.createClass({
  getInitialState: function(){
    return cartItems()
  },
  //After mount it listen for the event and then triggers the on_chage
  //This methods just says. Hey there is a change go there to do something about it.
  componentWillMount: function(){
    AppStore.addChangeListener(this._onChange)
  },
  //On change what it does is to retrieve the store cart item :) yei
  _onChange: function(){
    this.setState(cartItems())
  },

  render:function(){
    var total = 0;
    var items = this.state.items.map(function(item, i){
      var subtotal = item.cost * item.qty;
      total += subtotal;
      return(
        <tr key={i}>
          <td><RemoveFromCart index={1}/></td>
          <td>{item.title}</td>
          <td>{item.qty}</td>
          <td>{item.title}</td>
          <td>
            <Increase index={i} />
            <Decrease index={i} />
          </td>
          <td>{subtotal}</td>
        </tr>
      );
    })
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th></th>
            <th>Item</th>
            <th>Qty</th>
            <th></th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
        <tfoot>
          <tr>
            <td className="text-right">
             Total
            </td>
            <td>${total}</td>
          </tr>
        </tfoot>
      </table>
    )
  }
});

module.exports = Cart;
