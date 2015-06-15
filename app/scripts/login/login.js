var React = require('react');
var Input = require('react-bootstrap').Input;
var Auth = require('../models/j-toker');
var currentUserActions = require('../actions/current-user-actions');
var Router = require('react-router');

var Login = React.createClass({
  mixins: [ Router.Navigation ],
  getInitialState: function(){
    return {}
  },
  componentDidMount: function(){

  },
  componentWillUnmount: function(){

  },
  handleClick: function(){
  var _this = this;
     Auth.oAuthSignIn({provider: 'instagram'})
    .then(function(user) {
      currentUserActions.setCurrentUser(user);
      _this.transitionTo('/dashboard', null, { });
    })
    .fail(function(resp) {
      alert('Authentication failure: ' + resp.errors.join(' '));
    });
  },
  render: function(){
    return (
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <img className="instagram-login-img" src="images/instagram.png" onClick={this.handleClick}></img>
        </div>
      </div>
    )
  }
});

module.exports = Login;