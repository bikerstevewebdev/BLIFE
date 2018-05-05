import React, { Component } from 'react'
import './App.css'
import Nav from './components/Nav/Nav'
import SideNav from './components/Nav/SideNav'
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
// import MealFromRecipe from './components/Meal/MealFromRecipe';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { clearUserMessage } from './ducks/userReducer'
import { clearCoachMessage } from './ducks/coachReducer'
import { clearFitnessMessage } from './ducks/fitnessReducer'
import { clearFoodMessage } from './ducks/foodReducer'
// import RaisedButton from 'material-ui/RaisedButton'
// import seaVid from './seaVid.mp4'



class App extends Component {
  constructor(){
    super()
    this.state = {
      open: false
    }
    this.close = this.close.bind(this)
    // this.clearMessages = this.clearMessages.bind(this)
  }
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  componentDidUpdate(){
    const { userMessage, foodMessage, coachMessage, fitnessMessage } = this.props    
    if(!this.state.open && (userMessage || foodMessage || coachMessage || fitnessMessage)){
      this.setState({
        open: true
      })
    }
  }
  
  // clearMessages(){
  // }
  
  close(){
    const { userMessage, foodMessage, coachMessage, fitnessMessage } = this.props    
    if(userMessage){
      this.props.clearUserMessage()
    }else if(foodMessage){
      this.props.clearFoodMessage()
    }else if(coachMessage){
      this.props.clearCoachMessage()
    }else if(fitnessMessage){
      this.props.clearFitnessMessage()
    }
    this.setState({
      open: false
    })
    // this.clearMessages()
  }
  
  render() {
    const { userMessage, foodMessage, coachMessage, fitnessMessage } = this.props
    return (
      <div className="App">
        {
          this.props.location.pathname === '/'
          ?
          null
          :
          <Nav />
        }
          <section id="main-content">
            <Switch className="main-div">
              <Route path='/' exact component={Login} />
              <Route path='/dashboard' component={Dashboard} />
              <Route path='/profile' component={Profile} />
              <Route path='/updateProfile' component={UpdateProfile} />
              <Route path='/macroCalc' component={MacroCalc} />
              <Route path='/meal/:id' component={Meal} />
              <Route path='/mealCreator' component={MealCreator} /> {/* modal */}
              <Route path='/food/:from' component={Food} />
              <Route path='/menu/:from' component={Menu} />
              <Route path='/menuCreator' component={MenuCreator} /> {/* modal */}
              <Route path='/exercise/:id' component={Exercise} />
              <Route path='/workout/:id' component={Workout} />
              <Route path='/workoutCreator' component={WorkoutCreator} /> {/* modal */}
              <Route path='/coachManager/:id' component={CoachManager} />
              <Route path='/clientManager/:id' component={ClientManager} />
              <Route path='/firstLogin' component={FirstLogin} />
              <Route path='/measurements' component={Measurements} />
              {/* <Route path='/mealFromRecipe' component={MealFromRecipe} /> */}
            </Switch>
          <SideNav />
          <Snackbar style={{height: "auto"}} contentStyle={{height: "auto"}} bodyStyle={{height: "auto"}} message={foodMessage || userMessage || coachMessage || fitnessMessage} action="ok" autoHideDuration={10000} onRequestClose={this.close} onActionClick={this.close} open={this.state.open} />
          </section>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    userMessage: state.users.warningMsg,
    foodMessage: state.foods.warningMsg,
    coachMessage: state.coach.warningMsg,
    fitnessMessage: state.fitness.warningMsg,
    isLoggedIn: state.users.isLoggedIn
  }
}

export default withRouter(connect(mapStateToProps, { clearCoachMessage, clearFitnessMessage, clearFoodMessage, clearUserMessage })(App))