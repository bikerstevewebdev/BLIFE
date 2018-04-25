import React, { Component } from 'react'
import './App.css'
import Nav from './components/Nav/Nav'
import Dashboard from './components/Dashboard/Dashboard'
import Login from './components/Login/Login'
import Profile from './components/Profile/Profile'
import UpdateProfile from './components/UpdateProfile/UpdateProfile'
import MacroCalc from './components/MacroCalc/MacroCalc'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'



class App extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }
  render() {
    return (
      <div className="App">
        {
            this.props.location.pathname === '/'
            ?
            null
            :
            <Nav />
          }
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/profile' component={Profile} />
          <Route path='/updateProfile' component={UpdateProfile} />
          <Route path='/macroCalc' component={MacroCalc} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App)
