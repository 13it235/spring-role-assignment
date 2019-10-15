import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import './App.css';
import UserDetails from './components/userDetails';
import Dashboard from './components/dashboard';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/">
          <Redirect to="/users" />
        </Route>
        <Route path={`/users`} component={Dashboard} />
        <Route path={`/user/:id`} component={UserDetails} />
      </BrowserRouter>
    );
  }
}

export default App;
