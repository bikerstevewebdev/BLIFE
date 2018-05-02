import React, { Component } from 'react'
import './App.css'
import Nav from './components/Nav/Nav'
import Dashboard from './components/Dashboard/Dashboard'
import Login from './components/Login/Login'
import Profile from './components/Profile/Profile'
import UpdateProfile from './components/UpdateProfile/UpdateProfile'
import MacroCalc from './components/MacroCalc/MacroCalc'
import Meal from './components/Meal/Meal'
import Food from './components/Food/Food'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import MealCreator from './components/MealCreator/MealCreator';
import MenuCreator from './components/MenuCreator/MenuCreator';
import Menu from './components/Menu/Menu';
import Exercise from './components/Exercise/Exercise';
import Workout from './components/Workout/Workout';
import WorkoutCreator from './components/Workout/WorkoutCreator';
import ClientManager from './components/Coach/ClientManager';
import CoachManager from './components/Coach/CoachManager';
import FirstLogin from './components/Login/FirstLogin';
import Measurements from './components/Measurements/Measurements';
import MealFromRecipe from './components/Meal/MealFromRecipe';



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
          <Route path='/meal/:id' component={Meal} />
          <Route path='/mealCreator' component={MealCreator} />
          <Route path='/food/:from' component={Food} />
          <Route path='/menu/:from' component={Menu} />
          <Route path='/menuCreator' component={MenuCreator} />
          <Route path='/exercise/:id' component={Exercise} />
          <Route path='/workout/:id' component={Workout} />
          <Route path='/workoutCreator' component={WorkoutCreator} />
          <Route path='/coachManager/:id' component={CoachManager} />
          <Route path='/clientManager/:id' component={ClientManager} />
          <Route path='/firstLogin' component={FirstLogin} />
          <Route path='/measurements' component={Measurements} />
          <Route path='/mealFromRecipe' component={MealFromRecipe} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App)
