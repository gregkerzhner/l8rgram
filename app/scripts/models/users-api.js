var config = require('../l8rgram-config');
var request = require('superagent');
var AppDispatcher = require('../dispatcher/dispatcher');

var UsersApi = {
  //make this return promises to action module
  getUser: function(userId){
    //possibly pass request here
    AppDispatcher.handleAction({
      actionType: appConstants.GET_USER,
      data: appConstants.REQUEST.PENDING
    })
  }
};


module.exports = UsersApi;
