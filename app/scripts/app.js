var React = require('react'); 
var Router = require('react-router');
var Route = Router.Route;

var Auth = require('./models/j-toker');

var Login = require('./login/login');
var AppContainer = require('./app-container');
var routes = (
    <Route name="App" path="/" handler={AppContainer}>
        <Route name="login" path="login" handler={Login} />
    </Route>
);

Auth.configure({
  apiUrl: 'http://ama-lab.dev',
  authProviderPaths: {
    "instagram":    '/auth/instagram'
  }
});

Router.run(routes, Router.HistoryLocation, function (Handler, state) {
    React.render(<Handler/>, document.body);
});
