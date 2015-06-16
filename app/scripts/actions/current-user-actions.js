var AppDispatcher = require('../dispatcher/dispatcher');
var appConstants = require('../constants/constants');
var UserApi = require('../models/users-api');
var Auth = require('./models/j-toker');

var currentUserActions = {
  getCurrentUser: function(){
    Auth.validateToken()
      .then(function(user) {
        
      }.bind(this))
      .fail(function() {
        console.log('Failed');
      });
  },
  setCurrentUser: function(item){
    AppDispatcher.handleAction({
      actionType: appConstants.SET_CURRENT_USER,
      data: item
    });
  },
  destroyCurrentUser: function(){
    AppDispatcher.handleAction({
      actionType: appConstants.DESTROY_CURRENT_USER
    })
  }
};

module.exports = currentUserActions;