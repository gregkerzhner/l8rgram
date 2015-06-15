var React = require('react');
var Input = require('react-bootstrap').Input;
var Auth = require('../models/j-toker');
var currentUserActions = require('../actions/current-user-actions');

var Login = React.createClass({
  getInitialState: function(){
    return {}
  },
  componentDidMount: function(){

  },
  componentWillUnmount: function(){

  },
  handleClick: function(){
     Auth.oAuthSignIn({provider: 'instagram'})
    .then(function(user) {
      currentUserActions.setCurrentUser(user);
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