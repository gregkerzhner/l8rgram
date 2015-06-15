var React = require('react');
var Input = require('react-bootstrap').Input;

var Login = React.createClass({
  getInitialState: function(){
    return {}
  },
  componentDidMount: function(){

  },
  componentWillUnmount: function(){

  },
  handleClick: function(){
    alert("HI")
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