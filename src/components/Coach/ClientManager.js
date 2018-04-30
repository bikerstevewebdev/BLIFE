import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import MenuCard from '../Menu/MenuCard'
import WorkoutCard from '../Workout/WorkoutCard'
import SearchMenu from '../Search/SearchMenus'
import SearchWorkout from '../Search/SearchWorkouts'
import { getClientData, assignWorkoutToClient, assignMenuToClient } from '../../ducks/coachReducer'

class ClientManager extends Component{
    constructor(){
        super()
        this.state = {
            addingWorkout: false,
            addingMenu: false
            // messageInput: ''
        }
        this.prepareToAddWorkout = this.prepareToAddWorkout.bind(this)
        this.prepareToAddMenu = this.prepareToAddMenu.bind(this)
        // this.updateMessageInput = this.updateMessageInput.bind(this)
    }

    componentDidMount(){
        this.props.getClientData(this.props.match.params.id)
    }

    // updateMessageInput(e){
    //     this.setState({
    //         messageInput: e.target.value
    //     })
    // }
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
        // const { messageInput } = this.state,
            const { currentClient, sendClientMsg } = this.props,
                  { username, curr_macros, last_login, current_stats, fullname, menus, client_id, client_coach_id, workouts } = currentClient,
                  { waist, neck, chest, height, weight, bf, date_taken } = current_stats,
                  { pro, carb, fat } = curr_macros,
                  clientMenus = menus.map(v => {
                      return <MenuCard key={v.menu_id} menu_id={v.menu_id} total_p={v.total_p} total_c={v.total_c} total_f={v.total_f} total_fib={v.total_fib} img={v.img} />
                  }),
                  clientWorkouts = workouts.map(v => {
                      return <WorkoutCard key={v.workout_id} workout_id={v.workout_id} title={v.title} img={v.img} type={v.type} />
                  })
        return (
            <section className="client-manager">
                <Link to={`/coachManager/${this.props.coach_id}`}><button>Back to Coach Manager</button></Link>
                <h1>{username}</h1>
                <section className="client-stats">
                    <h2>Current Stats</h2>
                    <h3>Macros:</h3>
                    <p>Protein: {pro}</p>
                    <p>Carbs: {carb}</p>
                    <p>Protein: {fat}</p>
                    <h3>Measurements:</h3>
                    <p>Height: {height} inches</p>
                    <p>Weight: {weight} pounds</p>
                    <p>Bodyfat: {bf} %</p>
                    <p>Waist: {waist} inches</p>
                    <p>Neck: {neck} inches</p>
                    <p>Chest: {chest} inches</p>
                    <p>Last Taken: {date_taken}</p>
                </section>
                <section className="client-workouts">
                    <h2>Current Fitness Plan</h2>
                    {workouts}
                    {
                        this.state.addingWorkout
                        ?
                        <SearchWorkout doSomething={true} arg2={client_coach_id} arg3={client_id} btnMsg={`Add this workout to ${username}'s plan`} handleBtnClick={this.props.assignWorkoutToClient.bind(this)} />
                        :
                        <button onClick={this.prepareToAddWorkout}>Add a workout to {username}'s plan?</button>
                    }
                </section>
                <section className="client-menus">
                    <h2>Current Meal Plan</h2>
                    {menus}
                    {
                        this.state.addingMenu
                        ?
                        <SearchMenu doSomething={true} arg2={client_coach_id} arg3={client_id} btnMsg={`Add this menu to ${username}'s plan`} handleBtnClick={this.props.assignMenuToClient.bind(this)} />
                        :
                        <button onClick={this.prepareToAddMenu}>Add a menu to {username}'s plan?</button>
                    }
                </section>
                {/* <p>Send {fullname} a message.</p>
                <input value={messageInput} onChange={this.updateMessageInput} />
                <button onClick={() => this.sendClientMsg(messageInput)}>Send request to your new client</button> */}
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        coach_id: state.users.userData.coach_id,
        currentClient: state.coach.currentClient
    }
}

export default connect(mapStateToProps, { getClientData, assignWorkoutToClient, assignMenuToClient })(ClientManager)