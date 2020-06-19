import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './Views/Authentication/LoginPage';
import SignUp from './Views/Authentication/SignUp';
export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUp} />
          <Route path="/" component={LoginPage} />
        </Switch>
      </Router>
    );
  }
}
