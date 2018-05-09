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
import { Switch, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import MealCreator from './components/Meal/MealCreator';
import MenuCreator from './components/Menu/MenuCreator';
import Menu from './components/Menu/Menu';
import Exercise from './components/Exercise/Exercise';
import WorkoutEditor from './components/Workout/WorkoutEditor';
import ExerciseCreator from './components/Exercise/ExerciseCreator';
import WorkoutCreator from './components/Workout/WorkoutCreator';
import ClientManager from './components/Coach/ClientManager';
import CoachManager from './components/Coach/CoachManager';
import FirstLogin from './components/Login/FirstLogin';
import Measurements from './components/Measurements/Measurements';
// import MealFromRecipe from './components/Meal/MealFromRecipe';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { clearUserMessage } from './ducks/userReducer'
import { clearCoachMessage, toggleCoachChatModal } from './ducks/coachReducer'
import { clearFitnessMessage } from './ducks/fitnessReducer'
import { clearFoodMessage } from './ducks/foodReducer'
import CoachChat from './components/Coach/CoachChat';
import { FloatingActionButton } from 'material-ui';
import CommunicationChat from 'material-ui/svg-icons/communication/chat'



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
    const { userMessage, foodMessage, coachMessage, fitnessMessage, userData } = this.props    
    if(this.props.location.pathname !== '/firstLogin' && userData.coach_id === 0){
      this.props.history.push('/firstLogin')
    }
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
    const { userMessage, foodMessage, coachMessage, fitnessMessage, userData, toggleCoachChatModal, coachChatModalOpen } = this.props
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
              <Route path='/menu/:from' component={Menu} />
              <Route path='/exercise/:id' component={Exercise} />
              <Route path='/workout/:id' component={WorkoutEditor} />
              <Route path='/coachManager/:id' component={CoachManager} />
              <Route path='/clientManager/:id' component={ClientManager} />
              <Route path='/firstLogin' component={FirstLogin} />
              <Route path='/measurements' component={Measurements} />
              {/* <Route path='/food/:from' component={Food} /> */}
              {/* <Route path='/mealCreator' component={MealCreator} /> modal */}
              {/* <Route path='/menuCreator' component={MenuCreator} /> modal */}
              {/* <Route path='/workoutCreator' component={WorkoutCreator} /> modal */}
              {/* <Route path='/mealFromRecipe' component={MealFromRecipe} /> */}
            </Switch>
          <SideNav />
          <UpdateProfile />
          <Food />
          <MealCreator />
          <MenuCreator />
          <ExerciseCreator />
          <WorkoutCreator />
          {
            userData.has_coach
            ?
              (coachChatModalOpen
              ?
              <CoachChat />
              :
              <FloatingActionButton onClick={() => toggleCoachChatModal(true)}>
                <CommunicationChat />
              </FloatingActionButton>)
            :
            null
          }
          <Snackbar style={{height: "auto"}} contentStyle={{height: "auto"}} bodyStyle={{height: "auto"}} message={foodMessage || userMessage || coachMessage || fitnessMessage} action="ok" autoHideDuration={10000} onActionClick={this.close} open={this.state.open} />
          {/* {
            ?
            <Redirect to='/firstLogin' />
            :
            null
          } */}
          </section>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    userData: state.users.userData,
    userMessage: state.users.warningMsg,
    foodMessage: state.foods.warningMsg,
    coachMessage: state.coach.warningMsg,
    fitnessMessage: state.fitness.warningMsg,
    isLoggedIn: state.users.isLoggedIn,
    coachChatModalOpen: state.coach.coachChatModalOpen
  }
}

export default withRouter(connect(mapStateToProps, { clearCoachMessage, clearFitnessMessage, clearFoodMessage, clearUserMessage })(App))