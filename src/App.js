import React, { Component } from 'react'
import './App.css'
import Nav from './components/Nav/Nav'
import Dashboard from './components/Dashboard/Dashboard'
import Login from './components/Login/Login'
import Profile from './components/Profile/Profile'
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav/>
        <Switch>
          <Route path='/' exact component={Dashboard} />
          <Route path='/auth' component={Login} />
          <Route path='/profile' component={Profile} />
        </Switch>
      </div>
    );
  }
}

export default App;