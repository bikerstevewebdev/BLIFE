import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUserData, updateUserStats, addMacrosToState, getUserMenus, getUserWorkouts } from '../../ducks/userReducer';
import { changeUpdating, clearMacroEntry } from '../../ducks/macroCalcReducer'
import MenuCard from '../Menu/MenuCard'
import WorkoutCard from '../Workout/WorkoutCard'


class Profile extends Component{
    constructor() {
        super()
        // this.state = {
        //     updatedHtWtBf: false
        // }
        this.updateNewMes = this.updateNewMes.bind(this)
        this.discardNewMes = this.discardNewMes.bind(this)
    }

    

    componentDidMount() {
        console.log(this.props)
        const { user_id } = this.props.userData
        this.props.getUserMenus(user_id)
        this.props.getUserWorkouts(user_id)
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
            const { profile_pic, current_protein, current_carbs, current_fat, current_weight, current_height, current_bf, userData, userWorkouts, userMenus } = this.props
                  menusList = userMenus.map(menu => <MenuCard key={user_menu_id} menu_id={menu.menu_id} title={menu.title} total_p={menu.total_p} total_c={menu.total_c} total_f={menu.total_f} total_fib={menu.total_fib} img/>),
                  workoutsList = userWorkouts.map(workout => <WorkoutCard key={user_workout_id} workout_id={workout.workout_id} title={workout.title} img={workout.img} type={workout.type} />)
        return(
            <section>
                Proofile Yo
                <Link to='/'><button>Back to Login</button></Link>
                <Link to='/updateProfile'><button>Update Profile</button></Link>
                {
                    userData.coach_id > 0
                    ?
                    <Link to={`/coachManager/${userData.coach_id}`}><button>Coach Manager</button></Link>
                    :
                    null
                }
                {/* Displays user's current menus: */}
                {menusList}
                {/* Displays user's current workouts: */}
                {workoutsList}
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
    const { user, curr_mes, userData } = state.users,
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
        userWorkouts
    }
}

export default connect(mapStateToProps, { getUserData, updateUserStats, addMacrosToState, changeUpdating, clearMacroEntry, getUserMenus, getUserWorkouts })(Profile)