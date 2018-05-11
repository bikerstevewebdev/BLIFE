import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import MenuCard from '../Menu/MenuCard'
import WorkoutCard from '../Workout/WorkoutCard'
import SearchMenu from '../Search/SearchMenus'
import SearchWorkout from '../Search/SearchWorkouts'
import { getClientData, assignWorkoutToClient, assignMenuToClient, toggleCoachChatModal } from '../../ducks/coachReducer'
import RaisedButton from 'material-ui/RaisedButton'
import CommunicationChat from 'material-ui/svg-icons/communication/chat'
import { FloatingActionButton } from 'material-ui';

class ClientManager extends Component{
    constructor(){
        super()
        this.state = {
            addingWorkout: false,
            addingMenu: false
        }
        this.prepareToAddWorkout = this.prepareToAddWorkout.bind(this)
        this.prepareToAddMenu = this.prepareToAddMenu.bind(this)
    }

    componentDidUpdate(){
        const { currentClient } = this.props
        const { client_coach_id } = currentClient
        // this.props.getClientData(this.props.match.params.id)
        if(!client_coach_id){
            getClientData(this.props.match.params.id)
        }
    }
    
    prepareToAddWorkout(){
        this.setState({
            addingWorkout: true
        })
    }

    prepareToAddMenu(){
        this.setState({
            addingMenu: true
        })
    }


    render() {
            const { currentClient, coachChatModalOpen, clientWorkouts, clientMenus, toggleCoachChatModal } = this.props,
                  { username, last_login, fullname, client_coach_id, waist, neck, chest, height, weight, bf, date_taken, happy_level, curr_pro, curr_carb, curr_fat, profile_pic, email } = currentClient
                   
            const menusList = clientMenus.map(v => {
                      return <MenuCard key={v.menu_id} menu_id={v.menu_id} total_p={v.total_p} total_c={v.total_c} total_f={v.total_f} total_fib={v.total_fib} img={v.img} />
                  })
            const workoutsList = clientWorkouts.map(v => {
                      return <WorkoutCard key={v.workout_id} workout_id={v.workout_id} title={v.title} img={v.img} type={v.type} />
                  })
        return (
            <section className="comp client-manager">
                <Link to={`/coachManager/${this.props.coach_id}`}><RaisedButton secondary={true}>Back to Coach Manager</RaisedButton></Link>
                <h1>{fullname}/{username}</h1>
                <p>Email: {email}</p>
                <h3>Last Login: {new Date(last_login/1).toDateString().slice(0, 15)}</h3>
                <section className="client-stats">
                <img src={profile_pic} alt={username} />
                    <h2>Current Stats</h2>
                    <h3>Macros:</h3>
                    <p>Protein: {curr_pro}</p>
                    <p>Carbs: {curr_carb}</p>
                    <p>Protein: {curr_fat}</p>
                    <h3>Measurements:</h3>
                    <p>Happyness at time of measurement: {happy_level}</p>
                    <p>Height: {height} inches</p>
                    <p>Weight: {weight} pounds</p>
                    <p>Bodyfat: {bf} %</p>
                    <p>Waist: {waist} inches</p>
                    <p>Neck: {neck} inches</p>
                    <p>Chest: {chest} inches</p>
                    <p>Last Taken: {new Date(date_taken/1).toDateString().slice(0, 15)}</p>
                </section>
                <section className="client-workouts">
                    <h2>Current Fitness Plan</h2>
                    {workoutsList}
                    {
                        this.state.addingWorkout
                        ?
                        <SearchWorkout arg1={client_coach_id} btn2msg={`Add this workout to ${username}'s plan`} btn2Fn={this.props.assignWorkoutToClient.bind(this)} />
                        :
                        <RaisedButton secondary={true} onClick={this.prepareToAddWorkout}>Add a workout to {username}'s plan?</RaisedButton>
                    }
                </section>
                <section className="client-menus">
                    <h2>Current Meal Plan</h2>
                    {menusList}
                    {
                        this.state.addingMenu
                        ?
                        <SearchMenu doSomething={true} arg1={client_coach_id}  btn2msg={`Add this menu to ${username}'s plan`} btn2Fn={this.props.assignMenuToClient.bind(this)} />
                        :
                        <RaisedButton secondary={true} onClick={this.prepareToAddMenu}>Add a menu to {username}'s plan?</RaisedButton>
                    }
                </section>
                {
                    coachChatModalOpen
                    ?
                    null
                    :
                    <FloatingActionButton style={{position: "fixed", bottom: "30px", right: "30px"}} onClick={() => toggleCoachChatModal(true)}>
                        <CommunicationChat />
                    </FloatingActionButton>
                }
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        coach_id: state.users.userData.coach_id,
        currentClient: state.coach.currentClient,
        clientWorkouts: state.coach.clientWorkouts,
        clientMenus: state.coach.clientMenus
    }
}

export default connect(mapStateToProps, { getClientData, assignWorkoutToClient, assignMenuToClient, toggleCoachChatModal })(ClientManager)