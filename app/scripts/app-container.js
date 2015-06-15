var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;

var AppContainer = React.createClass({
  getInitialState: function(){
    return {}
  },
  componentDidMount: function(){

  },
  componentWillUnmount: function(){

  },
  handleAddItem: function(newItem){

  },
  handleRemoveItem: function(index){

  },
  _onChange: function(){

  },
  render: function(){
    return (
      <div>
        <Navbar brand='l8rgram' inverse toggleNavKey={0}>
          <Nav right eventKey={0}> {/* This is the eventKey referenced */}
            <NavItem eventKey={1} href='#'>Link</NavItem>
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