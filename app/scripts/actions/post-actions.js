var AppDispatcher = require('../dispatcher/dispatcher');
var appConstants = require('../constants/constants');
var PostsApi = require('../models/posts-api');

var postActions = {
  addItem: function(item){
    AppDispatcher.handleAction({
      actionType: appConstants.ADD_ITEM,
      data: item
    });
  },
  removeItem: function(index){
    AppDispatcher.handleAction({
      actionType: appConstants.REMOVE_ITEM,
      data: index
    })
  },
  getList: function(){
    PostsApi.getList();
  }
};

module.exports = postActions;