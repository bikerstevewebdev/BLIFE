import React, { Component } from 'react'
import { getUserData, getUserMenus, getUserWorkouts, getAssignedMenus, getAssignedWorkouts } from '../../ducks/userReducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import SearchMeal from '../Search/SearchMeals'
import SearchMenu from '../Search/SearchMenus'
import SearchWorkout from '../Search/SearchWorkouts'
import RaisedButton from 'material-ui/RaisedButton'
import UserMenuCard from '../Menu/UserMenuCard'
import UserWorkoutCard from '../Workout/UserWorkoutCard'
import { requestACoach, getCCInfo, getCoachRequestInfo } from '../../ducks/coachReducer'
import Weight from 'material-ui/svg-icons/places/fitness-center'
import Assignment from 'material-ui/svg-icons/action/assignment'

import './Dashboard.css'
import { IconButton } from 'material-ui';

class Dashboard extends Component{
    constructor() {
        super()
        this.state = {
            firstVisit: false,
            itemsRetrieved: false,
        }
    }
    componentDidMount() {
        const { userData } = this.props
        if(!userData.user_id || userData.user_id <= 0){
            this.props.getUserData()
            
        }else {
            if(userData.has_coach){
                this.props.getAssignedMenus()
                this.props.getAssignedWorkouts()
            }   
            this.props.getUserMenus()
            this.props.getUserWorkouts()
        }
            console.log('DBoard props', this.props)
        }
        
        componentDidUpdate() {
            const { userData, coach_info, getCCInfo, getUserMenus, getUserWorkouts, getAssignedWorkouts, getAssignedMenus, userMenus, userWorkouts } = this.props
            if(userData.has_coach && !coach_info.coach_id){
                getCCInfo()
            }
            const { has_coach } = userData
            if(!this.state.itemsRetrieved){
                if(has_coach){
                    getAssignedMenus()
                    getAssignedWorkouts()
                    this.setState({itemsRetrieved: true})
                } else if(userMenus.length < 1 && userWorkouts.length < 1){
                    getUserMenus()
                    getUserWorkouts()
                    this.setState({itemsRetrieved: true})
                }
            }
        if(userData.coach_id === -411 && !this.props.coach_req_info.client_coach_id){
            getCoachRequestInfo()
        }
        console.log('DBoard updated props', this.props)
    }
    render() {
        const { userData, userMenus, userWorkouts, assignedMenus, assignedWorkouts } =this.props
        const { curr_pro, curr_carb, curr_fat } = userData
        return(
            <section className="comp dashboard">
                <h1 >Welcome Back<br />{this.props.userData.username}</h1>
                <section className="macros-display" >
                    <h3>Your Current Macros:</h3>
                    <section style={{fontSize: "1.15em"}} style={{display: "flex", width: "100%", justifyContent: "space-around"}}>
                        <p>Protein <br />{curr_pro}g</p>
                        <p>Carbs <br />{curr_carb}g</p>
                        <p>Fat <br />{curr_fat}g</p>
                    </section>
                </section>
                <Link className="db-icon-btn menu-i" to='/menusHome'>
                    <Assignment style={{width: "4em", height: "4em"}} />
                    <h3>Menus</h3>
                </Link>
                <Link className="db-icon-btn workout-i" to='/workoutsHome'>
                    <Weight style={{width: "4em", height: "4em"}}/>
                    <h3>Workouts</h3>
                </Link>
                {/* <Link style={{gridArea: "4/1/5/3"}} to="/firstLogin"><RaisedButton backgroundColor="black" labelColor="white" style={{width: "200px"}} label="First Login" /></Link> */}
            </section>
        )
    }
}

function mapStateToProps(state){
    const { curr_mes, userData, userMenus, userWorkouts, assignedMenus, assignedWorkouts } = state.users
    
    return {
        userData,
        userMenus,
        userWorkouts,
        assignedMenus,
        assignedWorkouts,
        curr_mes,
        coach_info: state.coach.coach_info
    }
}

export default connect(mapStateToProps, { getUserData, getUserMenus, getUserWorkouts, getAssignedMenus, getAssignedWorkouts, requestACoach, getCCInfo })(Dashboard)
