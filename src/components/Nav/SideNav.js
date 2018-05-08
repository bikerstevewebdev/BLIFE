import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
// import RaisedButton from 'material-ui/RaisedButton';
import Close from 'material-ui/svg-icons/navigation/close';
import PieChart from 'material-ui/svg-icons/editor/pie-chart-outlined';
import Dining from 'material-ui/svg-icons/maps/local-dining';
import Fitness from 'material-ui/svg-icons/places/fitness-center'
import Storage from 'material-ui/svg-icons/device/storage'
import Assignment from 'material-ui/svg-icons/action/assignment'
import Restaurant from 'material-ui/svg-icons/maps/restaurant'
import NoteAdd from 'material-ui/svg-icons/action/note-add'
import InsertChart from 'material-ui/svg-icons/editor/insert-chart'
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit'
// import IconMenu from 'material-ui/IconMenu'
// import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton';
import { toggleSideNav } from '../../ducks/userReducer'
import {List, ListItem} from 'material-ui/List';
import PersonOutline from 'material-ui/svg-icons/social/person-outline';

// const sideNavStyles = {

// }


class SideNav extends Component{    
  constructor(){
    super()
    this.state = {
      sendingToUpdateProfile: false,
      sendingToMeasurements: false,
      sendingToMacroCalc: false,
      sendingToMenuCreator: false,
      sendingToMealCreator: false,
      sendingToFoodCreator: false,
      sendingToWorkoutCreator: false,
      sendingToExerciseCreator: false,
      sendingToWorkoutDesigner: false
    }
    this.sendToUpdateProfile = this.sendToUpdateProfile.bind(this)
    this.sendToMeasurements = this.sendToMeasurements.bind(this)
    this.sendToMacroCalc = this.sendToMacroCalc.bind(this)
    this.sendToMenuCreator = this.sendToMenuCreator.bind(this)
    this.sendToMealCreator = this.sendToMealCreator.bind(this)
    this.sendToFoodCreator = this.sendToFoodCreator.bind(this)
    this.sendToWorkoutCreator = this.sendToWorkoutCreator.bind(this)
    this.sendToExerciseCreator = this.sendToExerciseCreator.bind(this)
    this.sendToWorkoutDesigner = this.sendToWorkoutDesigner.bind(this)
  }

  sendToUpdateProfile(){
    this.setState({sendingToUpdateProfile: true})
    this.props.toggleSideNav(false)
  }
  sendToMeasurements(){
    this.setState({sendingToMeasurements: true})
    this.props.toggleSideNav(false)
  }
  sendToMacroCalc(){
    this.setState({sendingToMacroCalc: true})
    this.props.toggleSideNav(false)
  }
  sendToMenuCreator(){
    this.setState({sendingToMenuCreator: true})
    this.props.toggleSideNav(false)
  }
  sendToMealCreator(){
    this.setState({sendingToMealCreator: true})
    this.props.toggleSideNav(false)
  }
  sendToFoodCreator(){
    this.setState({sendingToFoodCreator: true})
    this.props.toggleSideNav(false)
  }
  sendToWorkoutCreator(){
    this.setState({sendingToWorkoutCreator: true})
    this.props.toggleSideNav(false)
  }
  sendToExerciseCreator(){
    this.setState({sendingToExerciseCreator: true})
    this.props.toggleSideNav(false)
  }
  sendToWorkoutDesigner(){
    this.setState({sendingToWorkoutDesigner: true})
    this.props.toggleSideNav(false)
  }
    // handleOpen(targ){
    //     if(targ === 'fitness'){
    //         this.setState({
    //             fitnessOpen: true
    //         })
    //     }else if(targ === 'nutrition'){
    //         this.setState({
    //             nutritionOpen: true
    //         })
    //     }
    // }
    
    // handleOnRequestChange(targ){
    //     if(targ === 'fitness'){
    //         this.setState({
    //             fitnessOpen: false
    //         })
    //     }else if(targ === 'nutrition'){
    //         this.setState({
    //             nutritionOpen: false
    //         })
    //     }
    // }

    
    render() {
        // const nutrition = (
        //     <IconMenu
        //       onClick={() => this.handleOpen('nutrition')}              
        //       open={this.state.nutritionOpen}
        //       onRequestChange={() => this.handleOnRequestChange('nutrition')}
        //       iconButtonElement={<IconButton><Dining /></IconButton>}
        //       anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        //       targetOrigin={{horizontal: 'right', vertical: 'top'}}
        //       >
        //       <Link to="/mealCreator">
        //         <MenuItem onClick={this.props.toggleSideNav} primaryText="Meal Creator" />
        //       </Link>
        //       <Link to="/menuCreator">
        //         <MenuItem onClick={this.props.toggleSideNav} primaryText="Menu Creator" />
        //       </Link>
        //       <Link to="/food/nav">
        //         <MenuItem onClick={this.props.toggleSideNav} primaryText="Food Creator" />
        //       </Link>
        //     </IconMenu>
        // )
        
        // const fitness = (
        //     <IconMenu
        //       onClick={() => this.handleOpen('fitness')}
        //       open={this.state.fitnessOpen}
        //       onRequestChange={() => this.handleOnRequestChange('fitness')}
        //       iconButtonElement={<IconButton><Fitness /></IconButton>}
        //       anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        //       targetOrigin={{horizontal: 'right', vertical: 'top'}}
        //     >
        //       <Link to="/workoutCreator">
        //         <MenuItem onClick={this.props.toggleSideNav} primaryText="Workout Creator" />
        //       </Link>
        //       <Link to="/exercise/0">
        //         <MenuItem onClick={this.props.toggleSideNav} primaryText="Exercise Creator" />
        //       </Link>
        //     </IconMenu>
        // )
        

        const { sendingToExerciseCreator, sendingToFoodCreator, sendingToMacroCalc, sendingToMealCreator, sendingToMeasurements, sendingToMenuCreator, sendingToUpdateProfile, sendingToWorkoutCreator, sendingToWorkoutDesigner } = this.state
        return(
            <Drawer onRequestChange={() => this.props.toggleSideNav(false)}
            docked={false} width={200} openSecondary={true} open={this.props.sideNavOpen} >
                <AppBar iconElementLeft={<IconButton onClick={() => this.props.toggleSideNav(false)}><Close /></IconButton>}title="AppBar" />
                <List>
                    <ListItem
                        primaryTogglesNestedList={true}
                        primaryText="User"
                        leftIcon={<PersonOutline />}
                        nestedItems={[
                            <ListItem
                              onClick={this.sendToUpdateProfile}
                              key={1}
                              primaryText="Update Profile"
                              leftIcon={<ModeEdit />}
                            />,
                            <ListItem
                              onClick={this.sendToMeasurements}
                              key={2}
                              primaryText="Update Measurements"
                              leftIcon={<InsertChart />}
                            />,
                            <ListItem
                              onClick={this.sendToMacroCalc}
                              key={3}
                              primaryText="Macro Calculator"
                              leftIcon={<PieChart />}
                            />
                          ]}
                        />
                    <ListItem
                        primaryTogglesNestedList={true}
                        primaryText="Nutrition"
                        leftIcon={<Dining />}
                        nestedItems={[
                            <ListItem
                              onClick={this.sendToMenuCreator}
                              key={4}
                              primaryText="Menu Creator"
                              leftIcon={<Assignment />}
                            />,
                            <ListItem
                              onClick={this.sendToMealCreator}
                              key={5}
                              primaryText="Meal Creator"
                              leftIcon={<Restaurant />}
                            />,
                            <ListItem
                              onClick={this.sendToFoodCreator}
                              key={6}
                              primaryText="Food Creator"
                              leftIcon={<NoteAdd />}
                            />
                          ]}
                        />
                    <ListItem
                        primaryTogglesNestedList={true}
                        primaryText="Fitness"
                        leftIcon={<Fitness />}
                        nestedItems={[
                            <ListItem
                              onClick={this.sendToWorkoutCreator}
                              key={7}
                              primaryText="Workout Creator"
                              leftIcon={<Fitness />}
                            />,
                            <ListItem
                              onClick={this.sendToExerciseCreator}
                              key={8}
                              primaryText="Exercise Creator"
                              leftIcon={<NoteAdd />}
                            />,
                            <ListItem
                              onClick={this.sendToWorkoutDesigner}
                              key={9}
                              primaryText="Workout Designer"
                              leftIcon={<Storage />}
                            />
                          ]}
                        />
                </List>
                {
                  sendingToUpdateProfile
                  ?
                  <Redirect to='/updateProfile' />
                  :
                  null
                }
                {
                  sendingToMeasurements
                  ?
                  <Redirect to='/measurements' />
                  :
                  null
                }
                {
                  sendingToMacroCalc
                  ?
                  <Redirect to='/macroCalc' />
                  :
                  null
                }
                {
                  sendingToMenuCreator
                  ?
                  <Redirect to='/menuCreator' />
                  :
                  null
                }
                {
                  sendingToMealCreator
                  ?
                  <Redirect to='/mealCreator' />
                  :
                  null
                }
                {
                  sendingToFoodCreator
                  ?
                  <Redirect to='/food' />
                  :
                  null
                }
                {
                  sendingToWorkoutCreator
                  ?
                  <Redirect to='/workoutCreator' />
                  :
                  null
                }
                {
                  sendingToExerciseCreator
                  ?
                  <Redirect to='/exercise' />
                  :
                  null
                }
                {
                  sendingToWorkoutDesigner
                  ?
                  <Redirect to='/workout' />
                  :
                  null
                }
            </Drawer>
        )
    }
}

function mapStateToProps(state) {
    return {
        sideNavOpen: state.users.sideNavOpen
    }
}

export default connect(mapStateToProps, { toggleSideNav })(SideNav)
