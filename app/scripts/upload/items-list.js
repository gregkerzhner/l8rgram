var React = require('react');

var ItemList = React.createClass({
  render: function(){
    var listItems = this.props.items.map(function(item, index){
      return (
        <li>
          <span>{item}</span>
        </li>
      )
    }.bind(this));
    return (
      <ul >
        {listItems}
      </ul>
      )

  }
});

module.exports = ItemList;