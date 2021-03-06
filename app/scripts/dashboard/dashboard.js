var React = require('react');
var PostsList = require('./posts-list');
var PostsStore = require('../stores/posts-store');
var PostActions = require('../actions/post-actions');

var Dashboard = React.createClass({
  getInitialState: function(){
    return PostsStore.getAll()
  },
  componentDidMount: function(){
    PostActions.getList();
  },
  componentWillUnmount: function(){
    
  },
  _onChange: function(){
    this.setState({

    })
  },
  render: function(){
    return (
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <h3>Dashboard</h3>
          <div className="row">
            <div className="col-md-6">
              <PostsList posts={this.state}/>
            </div>
            <div className="col-md-6">

            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Dashboard;