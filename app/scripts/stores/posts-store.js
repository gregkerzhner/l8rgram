var appConstants = require('../constants/constants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/dispatcher');
 
var _store = {
  data: {
    list: [],
    state: appConstants.ready
  }
};

var addItem = function(item){
  _store.list.push(item);
};

var removeItem = function(index){
  _store.list.splice(index, 1);
}

var setState = function(state){
  this.store.state = state;
}

var postsStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(appConstants.CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(appConstants.CHANGE_EVENT, cb);
  },
  getAll: function(){
    return _store.data;
  }
});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.GET_POSTS_LIST:
      setState(action.data.status);
      break;
    default:
      return true;
  }

  postsStore.emit(appConstants.CHANGE_EVENT);
});

module.exports = postsStore;