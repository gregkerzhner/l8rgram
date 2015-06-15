var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem; 
var currentUserStore = require('./stores/current-user-store');

var AppContainer = React.createClass({
  getInitialState: function(){
    return {currentUser: currentUserStore.currentUser()}
  },

  componentDidMount: function(){
    currentUserStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    currentUserStore.removeChangeListener(this._onChange);
  },
  _onChange: function(){
    this.setState({currentUser: currentUserStore.currentUser()})
  },
  render: function(){
    return (
      <div>
        <Navbar brand='l8rgram' inverse toggleNavKey={0}>
          <Nav right eventKey={0}> {/* This is the eventKey referenced */}
            <p className="navbar-text">Logged in as {this.state.currentUser.name}</p> 
          </Nav>
        </Navbar>
        <div className="container-fluid">
          <RouteHandler/>
        </div>
      </div>
    )
  }
});

module.exports = AppContainer;