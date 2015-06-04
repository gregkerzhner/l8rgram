var React = require('react');
var uploadStore = require('../stores/upload-store');
var uploadActions = require('../actions/upload-actions');

var UploadContainer = React.createClass({
  getInitialState: function(){
    return {
      list: uploadStore.getList()
    }
  },
  componentDidMount: function(){
    uploadStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    uploadStore.removeChangeListener(this._onChange);
  },
  handleAddItem: function(newItem){
    uploadActions.addItem(newItem);
  },
  handleRemoveItem: function(index){
    uploadActions.removeItem(index);
  },
  _onChange: function(){
    this.setState({
      list: uploadStore.getList()
    })
  },
  render: function(){
    return (
      <div className="col-sm-6 col-md-offset-3">
        <div className="col-sm-12">
          <h3 className="text-center"> Todo List </h3>
        </div>
      </div>
    )
  }
});

module.exports = UploadContainer;