var config = require('../l8rgram-config');
var request = require('superagent');
var AppDispatcher = require('../dispatcher/dispatcher');
var appConstants = require('../constants/constants');
/*
cases: 

list fetching
list refreshing
  set 'pending state on store for these'
record fetching for first time
  if there is a record in a store, show it, otherwise we 
  will know and show spinner

record updating
  set "pending state" on record inside store
record creating for first time
  add to store and set "pending"
record deleting
  set "removing in store"
*/
var PostsApi = {
  //make this return promises to action module
  getList: function(){
    //possibly pass request here
    AppDispatcher.handleAction({
      actionType: appConstants.GET_POSTS_LIST,
      data: appConstants.REQUEST.PENDING
    })
  }
};


module.exports = PostsApi;




