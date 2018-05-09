import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
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
import { toggleFoodModal, toggleMealModal, toggleMenuModal } from '../../ducks/foodReducer'
import { toggleExCreatorModal, toggleWorkCreatorModal } from '../../ducks/fitnessReducer'
import { toggleSideNav, toggleUpdateProfileModal } from '../../ducks/userReducer'
import {List, ListItem} from 'material-ui/List';
import PersonOutline from 'material-ui/svg-icons/social/person-outline';

// const sideNavStyles = {

// }


class SideNav extends Component{    
  constructor(){
    super()
    // this.state = {
    //   sendingToUpdateProfile: false,
    //   sendingToMeasurements: false,
    //   sendingToMacroCalc: false,
    //   sendingToWorkoutDesigner: false
    // }
    this.sendToUpdateProfile = this.sendToUpdateProfile.bind(this)
    // this.sendToMeasurements = this.sendToMeasurements.bind(this)
    // this.sendToMacroCalc = this.sendToMacroCalc.bind(this)
    this.sendToMenuCreator = this.sendToMenuCreator.bind(this)
    this.sendToMealCreator = this.sendToMealCreator.bind(this)
    this.sendToFoodCreator = this.sendToFoodCreator.bind(this)
    this.sendToWorkoutCreator = this.sendToWorkoutCreator.bind(this)
    this.sendToExerciseCreator = this.sendToExerciseCreator.bind(this)
    // this.sendToWorkoutDesigner = this.sendToWorkoutDesigner.bind(this)
  }

  sendToUpdateProfile(){
    this.props.toggleUpdateProfileModal(true)
    this.props.toggleSideNav(false)
  }
  // sendToMeasurements(){
  //   this.setState({sendingToMeasurements: true})
  //   this.props.toggleSideNav(false)
  // }
  // sendToMacroCalc(){
  //   this.setState({sendingToMacroCalc: true})
  //   this.props.toggleSideNav(false)
  // }
  sendToMenuCreator(){
    this.props.toggleMenuModal(true)
    this.props.toggleSideNav(false)
  }
  sendToMealCreator(){
    this.props.toggleMealModal(true)
    this.props.toggleSideNav(false)
  }
  sendToFoodCreator(){
    this.props.toggleFoodModal(true)
    this.props.toggleSideNav(false)
  }
  sendToWorkoutCreator(){
    this.props.toggleWorkCreatorModal(true)
    this.props.toggleSideNav(false)
  }
  sendToExerciseCreator(){
    this.props.toggleExCreatorModal(true)
    this.props.toggleSideNav(false)
  }
  // sendToWorkoutDesigner(){
  //   this.setState({sendingToWorkoutDesigner: true})
  //   this.props.toggleSideNav(false)
  // }
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
        

        // const { sendingToMacroCalc, sendingToMeasurements, sendingToUpdateProfile, sendingToWorkoutDesigner } = this.state
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
                              nestedLevel={1}
                              onClick={this.sendToUpdateProfile}
                              key={1}
                              primaryText="Update Profile"
                              leftIcon={<ModeEdit />}
                            />,
                            <Link to="/measurements"><ListItem
                              nestedLevel={1}
                              onClick={() => this.props.toggleSideNav(false)}
                              key={2}
                              primaryText="Update Measurements"
                              leftIcon={<InsertChart />}
                            /></Link>,
                            <Link to="/macroCalc"><ListItem
                              nestedLevel={1}
                              onClick={() => this.props.toggleSideNav(false)}
                              key={3}
                              primaryText="Macro Calculator"
                              leftIcon={<PieChart />}
                            /></Link>
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
                            <Link to="/workout/nav"><ListItem
                              nestedLevel={1}
                              onClick={() => this.props.toggleSideNav(false)}
                              key={9}
                              primaryText="Workout Designer"
                              leftIcon={<Storage />}
                            /></Link>
                          ]}
                        />
                </List>
            </Drawer>
        )
    }
}

function mapStateToProps(state) {
    return {
        sideNavOpen: state.users.sideNavOpen
    }
}

export default connect(mapStateToProps, { toggleSideNav, toggleFoodModal, toggleMealModal, toggleMenuModal, toggleExCreatorModal, toggleWorkCreatorModal, toggleUpdateProfileModal })(SideNav)
