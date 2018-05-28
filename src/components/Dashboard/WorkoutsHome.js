import React, { Component } from 'react'
import { connect } from 'react-redux'
import { requestACoach } from '../../ducks/coachReducer'
import { getAssignedWorkouts, getUserWorkouts, addWorkoutToUser } from '../../ducks/userReducer'
import UserWorkoutCard from '../Workout/UserWorkoutCard'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog/Dialog'
import { IconButton, FlatButton } from 'material-ui'
import Add from 'material-ui/svg-icons/content/add'
import CloseBtn from 'material-ui/svg-icons/navigation/close'
import SearchWorkouts from '../Search/SearchWorkouts'

class WorkoutsHome extends Component{
    constructor(){
        super()
        this.state = {
            addWorkoutOpen: false
        }
    }

    componentDidMount(){
        const { userData, userWorkouts, getAssignedWorkouts, getUserWorkouts, assignedWorkouts } = this.props
        if(!userWorkouts.length && !userData.has_coach){
            getUserWorkouts()
        }else if(!assignedWorkouts.length && userData.has_coach){
            getAssignedWorkouts()
        }
    }


    
    render() {
        const { userData, userWorkouts, assignedWorkouts } = this.props
        let assignedWorkoutList, workoutsList
        if(userWorkouts){
            workoutsList = userWorkouts.map(workout => <UserWorkoutCard user_workout_id={workout.user_workout_id} key={workout.user_workout_id} workout_id={workout.workout_id} title={workout.title} img={workout.img} type={workout.type} />)
        }else{
            workoutsList = null
        }
        if(assignedWorkouts){
            assignedWorkoutList = assignedWorkouts.map(workout => <UserWorkoutCard assigned user_workout_id={workout.user_workout_id} key={workout.user_workout_id} workout_id={workout.workout_id} title={workout.title} img={workout.img} type={workout.type} />)
        }else{
            assignedWorkoutList = null
        } 
        return(
            <section className="workouts-home main-layout">
                <section style={{display: "flex", justifyContent: "center", alignItems: "center", height: "5rem"}} >
                    {
                        workoutsList.length || assignedWorkoutList.length
                        ?
                        <h2 style={{fontSize: "1.75em", justifyContent: "center"}}>Your Workouts</h2>
                        :
                        <section style={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%", justifyContent: "space-around", height: "100%"}}>
                            <h2 style={{fontSize: "1.5em"}}>Looks Like you don't have any workouts yet.</h2>
                            <h2 style={{fontSize: "1.25em"}} >{
                                userData.has_coach
                                ?
                                "Chat with your coach to get started."
                                :
                                "Go ahead and search for some below!"
                            }
                            </h2>
                        </section>

                    }
                </section>
                {
                    // this.state.showingAssigned && assignedWorkouts
                    userData.has_coach
                    ?
                    assignedWorkoutList
                    :
                    workoutsList

                }
                {
                    userData.has_coach
                    ?
                    null
                    :
                    <IconButton iconStyle={{width: "2rem", height: "2rem"}} className="icon-btn workout-search-modal" onClick={() => this.setState({ addWorkoutOpen: true})} tooltip="Add a Workout" >
                        <Add className="icon workout-search-modal" />
                    </IconButton>
                }
                <Dialog className="workout-home-search" autoScrollBodyContent={true} open={this.state.addWorkoutOpen}>
                    <SearchWorkouts styleClass={"user-workouts"} btn2msg={"Add to my Plan"} btn2Fn={this.props.addWorkoutToUser} />
                    <IconButton className="close-btn" onClick={() => this.setState({ addWorkoutOpen: false })} tooltip="close"><CloseBtn/></IconButton>
                </Dialog>
            </section>
        )
    }
}

function mapStateToProps(state){
    const { userData, userWorkouts, assignedWorkouts } = state.users
    return {
        userData,
        assignedWorkouts,
        userWorkouts
    }
}

export default connect(mapStateToProps, { getAssignedWorkouts, getUserWorkouts, addWorkoutToUser, requestACoach })(WorkoutsHome)