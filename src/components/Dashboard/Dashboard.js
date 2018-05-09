import React, { Component } from 'react'
import { getUserData, getUserMenus, getUserWorkouts, getAssignedMenus, getAssignedWorkouts, addMenuToUser, addWorkoutToUser, archiveWorkout, archiveMenu } from '../../ducks/userReducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import SearchMeal from '../Search/SearchMeals'
import SearchMenu from '../Search/SearchMenus'
import SearchWorkout from '../Search/SearchWorkouts'
import RaisedButton from 'material-ui/RaisedButton'
import MenuCard from '../Menu/MenuCard'
import WorkoutCard from '../Workout/WorkoutCard'
import { requestACoach, getCCInfo } from '../../ducks/coachReducer'

class Dashboard extends Component{
    constructor() {
        super()
        this.state = {
            firstVisit: false,
            showingAssigned: false
            // searchingMeals: true,
            // searchingMenus: true,
            // searchingWorkouts: true
        }
        this.showAssigned = this.showAssigned.bind(this)
        
        // this.endWorkoutSearch = this.endWorkoutSearch.bind(this)
        // this.endMealSearch = this.endMealSearch.bind(this)
        // this.endMenuSearch = this.endMenuSearch.bind(this)
    }
    componentDidMount() {
        const { userData, getUserMenus, getUserWorkouts, getAssignedWorkouts, getAssignedMenus, userMenus, userWorkouts, assignedMenus, assignedWorkouts } = this.props
        const { has_coach } = userData
        // if(user_id === 0){
            this.props.getUserData()
        // }
        if(has_coach && assignedMenus.length < 1 && assignedWorkouts.length < 1){
            getAssignedMenus()
            getAssignedWorkouts()
        } else if(userMenus.length < 1 && userWorkouts.length < 1){
            getUserMenus()
            getUserWorkouts()
        }
        console.log('DBoard props', this.props)
    }

    componentDidUpdate() {
        const { userData, coach_info, getCCInfo } = this.props
        if(userData.has_coach && !coach_info.coach_id){
            getCCInfo()
        }
        console.log('DBoard updated props', this.props)
        // if(!(this.props.userData.username.length > 0)){
        //     this.setState({
        //         firstVisit: true
        //     })
        // }
    }

    showAssigned(){
        this.setState({
            showingAssigned: true
        })
    }

    render() {
        const { userData, userMenus, userWorkouts, assignedMenus, assignedWorkouts, archiveWorkout, archiveMenu } =this.props
        const { curr_pro, curr_carb, curr_fat } = userData
        let assignedMenuList, assignedWorkoutList, workoutsList, menusList
        const menuSearchStyle = {
            width: "100%",
            display: "grid",
            gridTemplateRows: "auto",
            gridTemplateColumns: "1fr 1fr",
            justifyContent: "center",
            gridGap: "0.75em",
            gridColumn: "1/3",
            alignContent: "baseline"
        }
        const workSearchStyle = {
            width: "100%",
            display: "grid",
            gridTemplateRows: "auto",
            gridTemplateColumns: "1fr 1fr",
            justifyContent: "center",
            gridGap: "0.75em",
            gridColumn: "3/5",
            alignContent: "baseline"
        }
        const dbStyles = {
            height: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "150px 100px",
            // gridAutoRows: "150px",
            width: "100%",
            gridGap: "0.75em"            
        }
        const macroStyles = {
            width: "100%",
            gridColumn: "4/5",
            justifyContent: "space-around",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "10% 0"
        }
        /////////////////Users Menus/Workouts////////////////////
        if(userMenus){
            menusList = userMenus.map(menu => <MenuCard btn2Fn={archiveMenu} user_menu_id={menu.user_menu_id} btn2Label="Archive" key={menu.user_menu_id} menu_id={menu.menu_id} title={menu.title} total_p={menu.total_p} total_c={menu.total_c} total_f={menu.total_f} total_fib={menu.total_fib} img={menu.img}/>)
        }else{
            menusList = null
        }
        if(userWorkouts){
            workoutsList = userWorkouts.map(workout => <WorkoutCard btn2Fn={archiveWorkout} user_workout_id={workout.user_workout_id} btn2Label="Archive" key={workout.user_workout_id} workout_id={workout.workout_id} title={workout.title} img={workout.img} type={workout.type} />)
        }else{
            workoutsList = null
        }
        /////////////////assigned//////////////
        if(assignedMenus){
            assignedMenuList = assignedMenus.map(menu => <MenuCard  user_menu_id={menu.user_menu_id} key={menu.user_menu_id} menu_id={menu.menu_id} title={menu.title} total_p={menu.total_p} total_c={menu.total_c} total_f={menu.total_f} total_fib={menu.total_fib} img/>)
        }else{
            assignedMenuList = null
        }
        if(assignedWorkouts){
            assignedWorkoutList = assignedWorkouts.map(workout => <WorkoutCard user_workout_id={workout.user_workout_id} key={workout.user_workout_id} workout_id={workout.workout_id} title={workout.title} img={workout.img} type={workout.type} />)
        }else{
            assignedWorkoutList = null
        } 
        
        return(
            <section style={{...dbStyles}} className="comp dashboard">
                <h1 style={{gridColumn: "2/4", fontSize: "2em", alignSelf: "center"}}>Welcome back {this.props.userData.username}</h1>
                <section style={macroStyles}>
                    <h3>Your Current Macros:</h3>
                    <section style={{display: "flex", justifyContent: "space-around"}}>
                        <p>Protein: {curr_pro}</p>
                        <p>Carbs: {curr_carb}</p>
                        <p>Fat: {curr_fat}</p>
                    </section>
                </section>
                <section style={{...menuSearchStyle, gridArea: "2/1/4/3"}} className="user-menus">
                    <section style={{display: "flex", height: "5em", justifyContent: "space-between", alignItems: "center", gridArea: "1/1/2/3"}} >
                        <h2 >Your Menus:</h2>
                        {
                            userData.has_coach
                            ?
                            <RaisedButton secondary={true} onClick={this.showAssigned}>Show me my coach's plan</RaisedButton>
                            :
                            <RaisedButton onClick={this.props.requestACoach} secondary={true}>Request a Coach</RaisedButton>
                        }
                    </section>
                    {
                        this.state.showingAssigned && assignedMenus
                        ?
                        assignedMenuList
                        :
                        menusList
                        
                    }
                </section>
                <section style={{...workSearchStyle, gridArea: "2/3/4/5"}} className="user-workouts">
                        <h2 style={{display: "flex", alignItems: "center", height: "5em", gridArea: "1/1/2/3"}} >Your Workouts:</h2>
                    
                    {
                        this.state.showingAssigned && assignedWorkouts
                        ?
                        assignedWorkoutList
                        :
                        workoutsList

                    }
                </section>
                <SearchMenu btn2Fn={this.props.addMenuToUser} style={{...menuSearchStyle}}/>
                <SearchWorkout btn2Fn={this.props.addWorkoutToUser} style={{...workSearchStyle}}/>
                <RaisedButton secondary={true} style={{width: "200px"}}><Link to="/firstLogin">First Login</Link></RaisedButton>
                
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

export default connect(mapStateToProps, { getUserData, getUserMenus, getUserWorkouts, getAssignedMenus, getAssignedWorkouts, addMenuToUser, addWorkoutToUser, archiveWorkout, archiveMenu, requestACoach, getCCInfo })(Dashboard)
