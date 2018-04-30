import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUserData, updateUserStats, addMacrosToState, getUserMenus, getUserWorkouts, addMenuToUser, addWorkoutToUser, getAssignedMenus, getAssignedWorkouts } from '../../ducks/userReducer';
import { changeUpdating, clearMacroEntry } from '../../ducks/macroCalcReducer'
import MenuCard from '../Menu/MenuCard'
import WorkoutCard from '../Workout/WorkoutCard'
import SearchMenus from '../Search/SearchMenus'
import SearchWorkouts from '../Search/SearchWorkouts'


class Profile extends Component{
    constructor() {
        super()
        this.state = {
            showingAssigned: false
            // updatedHtWtBf: false
        }
        this.updateNewMes = this.updateNewMes.bind(this)
        this.discardNewMes = this.discardNewMes.bind(this)
        this.showAssigned = this.showAssigned.bind(this)
    }

    

    componentDidMount() {
        console.log(this.props)
        const { userData, getUserMenus, getUserWorkouts, getAssignedWorkouts, getAssignedMenus } = this.props
        const { user_id, has_coach } = userData
        if(has_coach){
            getAssignedMenus()
            getAssignedWorkouts()
        } else{
            getUserMenus()
            getUserWorkouts()
        }
        // const { pro, carbs, fat, curr_mes, userData, bodyfat, weight, height } = this.props
        // if(curr_mes.mes_id !== userData.curr_mes && pro > 0){
        //     this.props.addMacrosToState(pro, carbs, fat, bodyfat, weight, height)
        //     this.setState({
        //         updatedHtWtBf: true
        //     })
        // }else if(curr_mes.mes_id !== userData.curr_mes){
        //     this.setState({
        //         updatedHtWtBf: true
        //     })
        // }
    }
    componentDidUpdate() {
        console.log('profile updated:', this.props)
        const { pro, carbs, fat, bodyfat, weight, height, current_protein, current_carbs, current_fat, userData } = this.props
        // console.log(curr_mes.mes_id, userData.curr_mes_id, pro)
        // Checking to see if macros were calced, and add them to state in userReducer if so
        // User can update their measurements and macros if they want to keep the new numbers or discard them
        if(pro !== current_protein || carbs !== current_carbs || fat !== current_fat){
            this.props.addMacrosToState(pro, carbs, fat, bodyfat/1, weight/1, height/1, userData.curr_mes)
            // this.setState({
            //     updatedHtWtBf: true
            // })
        }
        // }else if(curr_mes.mes_id !== userData.curr_mes_id){
        //     this.setState({
        //         updatedHtWtBf: true
        //     })
        // }
    }

    showAssigned(){
        this.setState({
            showingAssigned: true
        })
    }
    
//////////////////////Handles Macro Changes///////////////////
updateNewMes() {
    const { current_protein,
        current_carbs,
        current_fat,
            current_weight,
            current_height,
            current_bf
        } = this.props
        const { waist, neck, chest } = this.props.curr_mes
        this.props.updateUserStats(current_protein,
            current_carbs,
            current_fat,
            current_weight,
            current_height,
            current_bf, 
            waist, 
            chest,
            neck )
            this.props.changeUpdating()
            console.log('updating measurements')
        }
        
        discardNewMes() {
            this.props.clearMacroEntry()
            console.log('discarding new measurements')
        }
//////////////////////Handles Macro Changes///////////////////
        
        render() {
            const { profile_pic, current_protein, current_carbs, current_fat, current_weight, current_height, current_bf, userData, userWorkouts, userMenus, assignedWorkouts, assignedMenus } = this.props
                  menusList = userMenus.map(menu => <MenuCard key={menu.user_menu_id} menu_id={menu.menu_id} title={menu.title} total_p={menu.total_p} total_c={menu.total_c} total_f={menu.total_f} total_fib={menu.total_fib} img/>),
                  workoutsList = userWorkouts.map(workout => <WorkoutCard key={workout.user_workout_id} workout_id={workout.workout_id} title={workout.title} img={workout.img} type={workout.type} />),
                  /////////////////assigned//////////////
                  assignedMenuList = assignedMenus.map(menu => <MenuCard key={menu.user_menu_id} menu_id={menu.menu_id} title={menu.title} total_p={menu.total_p} total_c={menu.total_c} total_f={menu.total_f} total_fib={menu.total_fib} img/>),
                  assignedWorkoutList = assignedWorkouts.map(workout => <WorkoutCard key={workout.user_workout_id} workout_id={workout.workout_id} title={workout.title} img={workout.img} type={workout.type} />)
        return(
            <section>
                <h1>Welcome Home</h1>
                <Link to='/'><button style={{backgroundColor: "yellow"}}>Back to Login</button></Link>
                <Link to='/updateProfile'><button style={{backgroundColor: "orange"}}>Update Profile</button></Link>
                {
                    userData.coach_id > 0
                    ?
                    <Link to={`/coachManager/${userData.coach_id}`}><button>Coach Manager</button></Link>
                    :
                    null
                }
                {/* Displays user's current menus: */}
                <h2>Your Menus:</h2>
                {
                    this.state.showingAssigned
                    ?
                    assignedMenuList
                    :
                    menusList

                }
                <button onClick={this.showAssigned}>Show me my coach's plan</button>
                <SearchMenus doSomething={true} btnMsg={`Add this workout to your plan`} handleBtnClick={this.props.addMenuToUser.bind(this)} />
                {/* Displays user's current workouts: */}
                <h2>Your Workouts:</h2>
                {
                    this.state.showingAssigned
                    ?
                    assignedWorkoutList
                    :
                    workoutsist

                }
                <SearchWorkouts doSomething={true} btnMsg={`Add this workout to your plan`} handleBtnClick={this.props.addWorkoutToUser.bind(this)} />
                <h2>Current Stats</h2>
                <p>Protein: {current_protein}g</p>
                <p>Fat: {current_fat}g</p>
                <p>Carbs: {current_carbs}g</p>
                <p>Pofile Pic: </p>
                <img src={profile_pic} alt="users pic"/>
                <p>Weight: {current_weight}pounds</p>
                <p>Height: {current_height}inches</p>
                <p>Bodyfat: {current_bf}%</p>
                {
                    this.props.isUpdating
                    ?
                    <section className="new-mes-logic">
                        <p>Looks like you've got some new measurements.</p>
                        <p>Would you like to update them?</p>
                        <button onClick={this.updateNewMes}>Yes</button>
                        <button onClick={this.discardNewMes}>No, get rid of them.</button>
                    </section>
                    :
                    null
                }
            </section>
        )
    }
}

function mapStateToProps(state){
    const { user, curr_mes, userData, assignedMenus, assignedWorkouts } = state.users,
          { profile_pic, current_protein, current_carbs, current_fat, current_weight, current_height, current_bf } = user,
          { macros, weight, height, bodyfat, isUpdating } = state.macros,
          { userMenus, userWorkouts } = state.coach
    return{
        profile_pic,
        current_protein,
        current_carbs,
        current_fat,
        current_weight,
        current_height,
        current_bf,
        userData,
        curr_mes,
        pro: macros.protein,
        carbs: macros.carbs,
        fat: macros.fat,
        weight,
        height,
        bodyfat,
        isUpdating,
        userMenus,
        userWorkouts,
        assignedMenus,
        assignedWorkouts
    }
}

export default connect(mapStateToProps, { getUserData, updateUserStats, addMacrosToState, changeUpdating, clearMacroEntry, getUserMenus, getUserWorkouts, addMenuToUser, addWorkoutToUser, getAssignedMenus, getAssignedWorkouts })(Profile)