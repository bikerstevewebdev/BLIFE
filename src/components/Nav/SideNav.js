import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton';
import { toggleSideNav } from '../../ducks/userReducer'
import {List, ListItem} from 'material-ui/List';
import PersonOutline from 'material-ui/svg-icons/social/person-outline';

// const sideNavStyles = {

// }


class SideNav extends Component{    
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
        

        
        return(
            <Drawer onRequestChange={() => this.props.toggleSideNav(false)}
            docked={false} width={200} openSecondary={true} open={this.props.sideNavOpen} >
                <AppBar iconElementLeft={<IconButton onClick={() => this.props.toggleSideNav(false)}><Close /></IconButton>}title="AppBar" />
                <List>
                    <ListItem
                        primaryTogglesNestedList={true}
                        primaryText="User"
                        leftIcon={<Link to="/profile"><PersonOutline /></Link>}
                        nestedItems={[
                            <ListItem
                              key={1}
                              primaryText="Update Profile"
                              leftIcon={<Link to="/updateProfile"><PersonOutline /></Link>}
                            />,
                            <ListItem
                              key={2}
                              primaryText="Update Measurements"
                              leftIcon={<Link to="/measurements"><InsertChart /></Link>}
                            />,
                            <ListItem
                              key={3}
                              primaryText="Macro Calculator"
                              leftIcon={<Link to="/macroCalc"><PieChart /></Link>}
                            />
                          ]}
                        />
                    <ListItem
                        primaryTogglesNestedList={true}
                        primaryText="Nutrition"
                        leftIcon={<Dining />}
                        nestedItems={[
                            <ListItem
                              key={4}
                              primaryText="Menu Creator"
                              leftIcon={<Assignment />}
                            />,
                            <ListItem
                              key={5}
                              primaryText="Meal Creator"
                              leftIcon={<Restaurant />}
                            />,
                            <ListItem
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
                              key={7}
                              primaryText="Workout Creator"
                              leftIcon={<Fitness />}
                            />,
                            <ListItem
                              key={8}
                              primaryText="Exercise Creator"
                              leftIcon={<NoteAdd />}
                            />,
                            <ListItem
                              key={9}
                              primaryText="Workout Designer"
                              leftIcon={<Storage />}
                            />
                          ]}
                        />
                </List>
                {/* {rightIcons} */}
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
