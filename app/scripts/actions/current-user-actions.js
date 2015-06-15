var AppDispatcher = require('../dispatcher/dispatcher');
var appConstants = require('../constants/constants');

var currentUserActions = {
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