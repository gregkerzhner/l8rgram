var userStore = require('../stores/current-user-store')
var auth = {};

auth.currentUser = function(){
  return userStore.currentUser();
}

module.exports = auth;