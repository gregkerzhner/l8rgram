var appConstants = require('../constants/constants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/dispatcher');
 
var _store = {
  currentUser: null
};

var setCurrentUser = function(user){
  _store.currentUser = user;
};

var destroyCurrentUser = function(){
  _store.currentUser = null
}

var currentUserStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(appConstants.CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(appConstants.CHANGE_EVENT, cb);
  },
  currentUser: function(){
    return _store.currentUser;
  }
});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.SET_CURRENT_USER:
      setCurrentUser(action.data);
      uploadStore.emit(appConstants.CHANGE_EVENT);
      break;
    case appConstants.DESTROY_CURRENT_USER:
      destroyCurrentUser();
      uploadStore.emit(appConstants.CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = currentUserStore;