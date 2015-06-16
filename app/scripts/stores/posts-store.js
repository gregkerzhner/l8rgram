var appConstants = require('../constants/constants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/dispatcher');
 
var _store = {
  list: []
};

var addItem = function(item){
  _store.list.push(item);
};

var removeItem = function(index){
  _store.list.splice(index, 1);
}

var postsStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(appConstants.CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(appConstants.CHANGE_EVENT, cb);
  },
  getList: function(){
    return _store.list;
  },
});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.ADD_ITEM:
      addItem(action.data);
      postsStore.emit(appConstants.CHANGE_EVENT);
      break;
    case appConstants.REMOVE_ITEM:
      removeItem(action.data);
      postsStore.emit(appConstants.CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = postsStore;