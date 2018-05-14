import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
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
import IconButton from 'material-ui/IconButton';
import { toggleFoodModal, toggleMealModal, toggleMenuModal } from '../../ducks/foodReducer'
import { toggleExCreatorModal, toggleWorkCreatorModal } from '../../ducks/fitnessReducer'
import { toggleSideNav, toggleUpdateProfileModal } from '../../ducks/userReducer'
import {List, ListItem} from 'material-ui/List';
import PersonOutline from 'material-ui/svg-icons/social/person-outline';


class SideNav extends Component{    
  constructor(){
    super()
    this.state = {
      fitnessOpen: false,
      nutritionOpen: false,
      userOpen: false
    }
    this.sendToUpdateProfile = this.sendToUpdateProfile.bind(this)
    this.sendToMenuCreator = this.sendToMenuCreator.bind(this)
    this.sendToMealCreator = this.sendToMealCreator.bind(this)
    this.sendToFoodCreator = this.sendToFoodCreator.bind(this)
    this.sendToWorkoutCreator = this.sendToWorkoutCreator.bind(this)
    this.sendToExerciseCreator = this.sendToExerciseCreator.bind(this)
    this.requestSideNavChange = this.requestSideNavChange.bind(this)
  }
  
  requestSideNavChange(){
    this.props.toggleSideNav(false)
    this.setState({
      fitnessOpen: false,
      nutritionOpen: false,
      userOpen: false
    })
  }

  sendToUpdateProfile(){
    this.props.toggleUpdateProfileModal(true)
    this.requestSideNavChange()
  }

  sendToMenuCreator(){
    this.props.toggleMenuModal(true)
    this.requestSideNavChange()
  }
  sendToMealCreator(){
    this.props.toggleMealModal(true)
    this.requestSideNavChange()
  }
  sendToFoodCreator(){
    this.props.toggleFoodModal(true)
    this.requestSideNavChange()
  }
  sendToWorkoutCreator(){
    this.props.toggleWorkCreatorModal(true)
    this.requestSideNavChange()
  }
  sendToExerciseCreator(){
    this.props.toggleExCreatorModal(true)
    this.requestSideNavChange()
  }
 
    
    render() {
        const { fitnessOpen, userOpen, nutritionOpen } = this.state
        return(
            <Drawer onRequestChange={() => this.requestSideNavChange()}
            docked={false} width={200} openSecondary={true} open={this.props.sideNavOpen} >
                <AppBar iconElementLeft={<IconButton onClick={this.requestSideNavChange}><Close /></IconButton>}title="AppBar" />
                <List style={{fontSize: "0.5em"}}>
                    <ListItem
                        key={101}
                        open={userOpen}
                        onClick={() => this.setState({userOpen: !userOpen})}
                        primaryText="User"
                        leftIcon={<PersonOutline />}
                        nestedItems={[
                            <ListItem
                              key={1}
                              nestedLevel={1}
                              onClick={this.sendToUpdateProfile}
                              primaryText="Update Profile"
                              leftIcon={<ModeEdit />}
                            />,
                            <Link key={2} to="/measurements"><ListItem
                              nestedLevel={1}
                              onClick={this.requestSideNavChange}
                              primaryText="Update Measurements"
                              leftIcon={<InsertChart />}
                            /></Link>,
                            <Link key={3} to="/macroCalc"><ListItem
                              nestedLevel={1}
                              onClick={this.requestSideNavChange}
                              primaryText="Macro Calculator"
                              leftIcon={<PieChart />}
                            /></Link>
                          ]}
                        />
                    <ListItem
                        key={102}
                        onClick={() => this.setState({nutritionOpen: !nutritionOpen})}
                        open={nutritionOpen}
                        primaryText="Nutrition"
                        leftIcon={<Dining />}
                        nestedItems={[
                            <ListItem
                            key={4}
                              onClick={this.sendToMenuCreator}
                              primaryText="Menu Creator"
                              leftIcon={<Assignment />}
                            />,
                            <ListItem
                              key={5}
                              onClick={this.sendToMealCreator}
                              primaryText="Meal Creator"
                              leftIcon={<Restaurant />}
                            />,
                            <ListItem
                              key={6}
                              onClick={this.sendToFoodCreator}
                              primaryText="Food Creator"
                              leftIcon={<NoteAdd />}
                            />
                          ]}
                        />
                    <ListItem
                        key={103}
                        open={fitnessOpen}
                        onClick={() => this.setState({fitnessOpen: !fitnessOpen})}
                        primaryText="Fitness"
                        leftIcon={<Fitness />}
                        nestedItems={[
                            <ListItem
                              key={7}
                              onClick={this.sendToWorkoutCreator}
                              primaryText="Workout Creator"
                              leftIcon={<Fitness />}
                            />,
                            <ListItem
                              key={8}
                              onClick={this.sendToExerciseCreator}
                              primaryText="Exercise Creator"
                              leftIcon={<NoteAdd />}
                            />,
                            <Link key={9} to="/workout/nav"><ListItem
                              nestedLevel={1}
                              onClick={this.requestSideNavChange}
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
