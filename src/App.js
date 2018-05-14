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
import MealCreator from './components/Meal/MealCreator';
import MenuCreator from './components/Menu/MenuCreator';
import Menu from './components/Menu/Menu';
import Exercise from './components/Exercise/Exercise';
import WorkoutEditor from './components/Workout/WorkoutEditor';
import ExerciseCreator from './components/Exercise/ExerciseCreator';
import WorkoutCreator from './components/Workout/WorkoutCreator';
import ClientManager from './components/Coach/ClientManager';
import CoachManager from './components/Coach/CoachManager';
import AdminManager from './components/Admin/AdminManager';
import FirstLogin from './components/Login/FirstLogin';
import Measurements from './components/Measurements/Measurements';
// import MealFromRecipe from './components/Meal/MealFromRecipe';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { clearUserMessage, getUserData } from './ducks/userReducer'
import { clearCoachMessage, toggleCoachChatModal, getCoachRequestInfo } from './ducks/coachReducer'
import { clearFitnessMessage } from './ducks/fitnessReducer'
import { clearFoodMessage } from './ducks/foodReducer'
import CoachChat from './components/Coach/CoachChat';
import { FloatingActionButton } from 'material-ui';
import CommunicationChat from 'material-ui/svg-icons/communication/chat'
import MotivationalQuote from './components/Measurements/MotivationalQuote'
import CoachReqModal from './components/Coach/CoachReqModal';
import MakeInvestment from './components/Stripe/MakeInvestment'


class App extends Component {
  constructor(){
    super()
    this.state = {
      open: false
    }
    this.close = this.close.bind(this)
  }
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  componentDidMount(){
    if(!this.props.userData.user_id && this.props.location.pathname !== '/'){
      this.props.getUserData()
    }
  }

  componentDidUpdate(){
    const { userMessage, foodMessage, coachMessage, fitnessMessage, userData, isLoggedIn, location, getCoachRequestInfo } = this.props    
    if(location.pathname !== '/' && (!userData.user_id || !isLoggedIn)){
    // if(location.pathname !== '/' && (userData.user_id <= 0 || !isLoggedIn)){
      this.props.history.push('/')
    }
    if(location.pathname !== '/firstLogin' && userData.coach_id === 0){
      this.props.history.push('/firstLogin')
    }
    if(userData.user_id && (!userData.has_paid && location.pathname !== '/investmentCheckout')){
      this.props.history.push('/investmentCheckout')
    }
    if(!this.state.open && (userMessage || foodMessage || coachMessage || fitnessMessage)){
      this.setState({
        open: true
      })
    }
    if(userData.coach_id === -411){
      getCoachRequestInfo()
    }
  }

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
  }
  
  render() {
    const { userMessage, foodMessage, coachMessage, fitnessMessage, userData, toggleCoachChatModal, coachChatModalOpen, coach_req_info } = this.props
    return (
      <div className="App">
        {
          this.props.location.pathname === '/'
          ?
          null
          :
          <Nav history={this.props.history}/>
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
              <Route path='/coachManager' component={CoachManager} />
              <Route path='/clientManager/:id' component={ClientManager} />
              <Route path='/firstLogin' component={FirstLogin} />
              <Route path='/measurements' component={Measurements} />
              <Route path='/adminManager' component={AdminManager} />
              <Route path='/investmentCheckout' component={MakeInvestment} />
            </Switch>
          <SideNav />
          <UpdateProfile />
          <Food />
          <MealCreator />
          <MenuCreator />
          <ExerciseCreator />
          <MotivationalQuote history={this.props.history} location={this.props.location} />
          <WorkoutCreator />
          {
            coach_req_info.client_coach_id
          ?
            <CoachReqModal />
          :
            null
          }
          {
            userData.has_coach || userData.coach_id > 0
          ?
              coachChatModalOpen
            ?
              <CoachChat />
            :
                userData.coach_id > 0
              ?
                null
              :
                <FloatingActionButton style={{position: "fixed", bottom: "30px", right: "30px"}} onClick={() => toggleCoachChatModal(true)}>
                  <CommunicationChat />
                </FloatingActionButton>
          :
            null
          }
          <Snackbar style={{height: "auto"}} contentStyle={{height: "auto"}} bodyStyle={{height: "auto"}} message={foodMessage || userMessage || coachMessage || fitnessMessage} action="ok" autoHideDuration={10000} onActionClick={this.close} open={this.state.open} />
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
    coachChatModalOpen: state.coach.coachChatModalOpen,
    coach_req_info: state.coach.coach_req_info
  }
}

export default withRouter(connect(mapStateToProps, { clearCoachMessage, clearFitnessMessage, clearFoodMessage, clearUserMessage, toggleCoachChatModal, getCoachRequestInfo, getUserData })(App))