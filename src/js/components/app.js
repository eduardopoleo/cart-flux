var React = require('react');
var Catalog = require('../components/app-catalog');
var Cart = require('../components/app-cart')
// App just require other components!
// maybe becuase it does not hold any logic? Maybe because there is not other
//flow
var App = React.createClass({
  render:function(){
    return (
      <div>
        <h1>Lets shop</h1>
        <Catalog />
        <h1>Cart</h1>
        <Cart />
      </div>
    );
  }
});

module.exports = App;
