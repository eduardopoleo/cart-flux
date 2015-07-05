var React = require('react');
var AppStore = require('../../stores/app-store.js');
var AddToCart = require('./app-addtocart.js');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin');
var CatalogItem = require('../catalog/app-catalogitem');

function getCatalog(){
  return {items: AppStore.getCatalog()};
}

//When a item is added: view->action->dispatcher->store->component updates state!
//Then the item is passed back into CatalogItem as propstr 
var Catalog = React.createClass({
  mixins:[StoreWatchMixin(getCatalog)],
  render:function(){
    var items = this.state.items.map(function(item){
      return(<CatalogItem item={item} />);
    })

    return (
      <div className="row">
        {items}
      </div>
    )
  }
});

module.exports = Catalog;
