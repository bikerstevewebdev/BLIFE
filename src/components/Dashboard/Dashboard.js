import React, { Component } from 'react'
import { getUserData, getUserMenus, getUserWorkouts, getAssignedMenus, getAssignedWorkouts, addMenuToUser, addWorkoutToUser } from '../../ducks/userReducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import SearchMeal from '../Search/SearchMeals'
import SearchMenu from '../Search/SearchMenus'
import SearchWorkout from '../Search/SearchWorkouts'
import RaisedButton from 'material-ui/RaisedButton'
import UserMenuCard from '../Menu/UserMenuCard'
import UserWorkoutCard from '../Workout/UserWorkoutCard'
import { requestACoach, getCCInfo, getCoachRequestInfo } from '../../ducks/coachReducer'


class Dashboard extends Component{
    constructor() {
        super()
        this.state = {
            firstVisit: false,
            // showingAssigned: false
            itemsRetrieved: false,
            // workoutsRetrieved: false
            // searchingMenus: true,
        }
        // this.showAssigned = this.showAssigned.bind(this)
        
        // this.endWorkoutSearch = this.endWorkoutSearch.bind(this)
        // this.endMealSearch = this.endMealSearch.bind(this)
        // this.endMenuSearch = this.endMenuSearch.bind(this)
    }
    componentDidMount() {
        const { userData } = this.props
        if(!userData.user_id || userData.user_id <= 0){
            this.props.getUserData()
        }else{
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
        // if(!(this.props.userData.username.length > 0)){
        //     this.setState({
        //         firstVisit: true
        //     })
        // }
    }

    // showAssigned(){
    //     this.setState({
    //         showingAssigned: true
    //     })
    // }

    render() {
        const { userData, userMenus, userWorkouts, assignedMenus, assignedWorkouts } =this.props
        const { curr_pro, curr_carb, curr_fat } = userData
        let assignedMenuList, assignedWorkoutList, workoutsList, menusList
        const menuSearchStyle = {
            width: "100%",
            display: "grid",
            gridTemplateRows: "auto",
            gridTemplateColumns: "1fr 1fr",
            justifyContent: "center",
            boxShadow: "rgba(10, 6, 15, 0.59) 0px 1px 6px 3px",
            backgroundColor: "#c2d8c4",
            borderRadius: "3px",
            gridGap: "0.75em",
            gridColumn: "1/3",
            alignContent: "baseline",
            padding: "0.5em"
        }
        const workSearchStyle = {
            width: "100%",
            display: "grid",
            boxShadow: "rgba(10, 6, 15, 0.59) 0px 1px 6px 3px",
            backgroundColor: "#c2d8c4",
            borderRadius: "3px",
            gridTemplateRows: "auto",
            gridTemplateColumns: "1fr 1fr",
            justifyContent: "center",
            gridGap: "0.75em",
            gridColumn: "3/5",
            padding: "0.5em",
            alignContent: "baseline"
        }
        const dbStyles = {
            height: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "150px 100px",
            // gridAutoRows: "150px",
            boxShadow: "rgb(37, 48, 51) 0px 2px 1px 1px",
            borderRadius: "3px",
            width: "100%",
            backgroundColor: "#fff",
            backgroundImage: "linear-gradient(to top, #074b19, #0b641c, #177e1b, #279815, #3bb300)",
            padding: "2em",
            gridGap: "0.75em"
        }
        const macroStyles = {
            borderRadius: "3px",
            padding: "0.25em",
            width: "100%",
            gridColumn: "4/5",
            color: "#7b2118",
            alignItems: "center",
            justifyContent: "space-around",
            display: "flex",
            boxShadow: "rgb(27, 32, 33) 1px 1px 2px 1px",
            flexDirection: "column",
            height: "100%",
            padding: "10% 0",
            
            backgroundImage: "linear-gradient(to top, #b3d8b7, #c0e2c3, #cdebcf, #dbf5db, #e8ffe8)"
        }
        /////////////////Users Menus/Workouts////////////////////
        if(userMenus){
            menusList = userMenus.map(menu => <UserMenuCard user_menu_id={menu.user_menu_id}  key={menu.user_menu_id} menu_id={menu.menu_id} title={menu.title} total_p={menu.total_p} total_c={menu.total_c} total_f={menu.total_f} total_fib={menu.total_fib} img={menu.img}/>)
        }else{
            menusList = null
        }
        if(userWorkouts){
            workoutsList = userWorkouts.map(workout => <UserWorkoutCard user_workout_id={workout.user_workout_id} key={workout.user_workout_id} workout_id={workout.workout_id} title={workout.title} img={workout.img} type={workout.type} />)
        }else{
            workoutsList = null
        }
        /////////////////assigned//////////////
        if(assignedMenus){
            assignedMenuList = assignedMenus.map(menu => <UserMenuCard  user_menu_id={menu.user_menu_id} key={menu.user_menu_id} assigned menu_id={menu.menu_id} title={menu.title} total_p={menu.total_p} total_c={menu.total_c} total_f={menu.total_f} total_fib={menu.total_fib} img={menu.img}/>)
        }else{
            assignedMenuList = null
        }
        if(assignedWorkouts){
            assignedWorkoutList = assignedWorkouts.map(workout => <UserWorkoutCard assigned user_workout_id={workout.user_workout_id} key={workout.user_workout_id} workout_id={workout.workout_id} title={workout.title} img={workout.img} type={workout.type} />)
        }else{
            assignedWorkoutList = null
        } 
        
        return(
            <section style={{...dbStyles}} className="comp dashboard">
                <h1 style={{gridColumn: "2/4", fontSize: "2.85rem", alignSelf: "center", textAlign: "center", color: "white", textShadow: "black 1px 1px 7px"}}>Welcome back {this.props.userData.username}</h1>
                <section style={macroStyles}>
                    <h3 style={{fontSize: "1.25em"}}>Your Current Macros:</h3>
                    <section style={{fontSize: "1.15em"}} style={{display: "flex", width: "100%", justifyContent: "space-around"}}>
                        <p>Protein: {curr_pro}</p>
                        <p>Carbs: {curr_carb}</p>
                        <p>Fat: {curr_fat}</p>
                    </section>
                </section>
                <section style={{...menuSearchStyle, gridArea: "2/1/4/3", }} className="user-menus">
                    <section style={{display: "flex", height: "5rem", justifyContent: "space-between", alignItems: "center", gridArea: "1/1/2/3"}} >
                    {
                        menusList.length
                        ?
                        <h2 style={{fontSize: "1.75em"}}>Your Menus:</h2>
                        :
                        <section style={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%", justifyContent: "space-around", height: "100%"}}>
                            <h2 style={{fontSize: "1.5em"}} >Looks Like you don't have any menus yet.</h2>
                            <h2 style={{fontSize: "1.25em"}}>{
                                    userData.has_coach
                                    ?
                                    "Chat with your coach to get started."
                                    :
                                    "Go ahead and search for some below!"
                                }
                            </h2>
                        </section>
                        }
                        {
                            // userData.has_coach
                            // ?
                            // <RaisedButton secondary={true} onClick={this.showAssigned} label="Show me my coach's plan" />
                            // :
                                (((userData.coach_id === -6 || userData.coach_id) === -9 && !userData.is_admin)
                                ?
                                <RaisedButton onClick={this.props.requestACoach} secondary={true} label="Request a Coach" />
                                :
                                null)
                        }
                    </section>
                    {
                        // this.state.showingAssigned && assignedMenus
                        userData.has_coach
                        ?
                        assignedMenuList
                        :
                        menusList
                        
                    }
                </section>
                <section style={{...workSearchStyle, gridArea: "2/3/4/5"}} className="user-workouts">
                    <section style={{display: "flex", alignItems: "center", height: "5rem", gridArea: "1/1/2/3"}} >
                        {
                            workoutsList.length
                            ?
                            <h2 style={{fontSize: "1.75em"}}>Your Workouts:</h2>
                            :
                            <section style={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%", justifyContent: "space-around", height: "100%"}}>
                                <h2 style={{fontSize: "1.5em"}}>Looks Like you don't have any menus yet.</h2>
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
                </section>
                <SearchMenu btn2msg={"Add to my Plan"} btn2Fn={this.props.addMenuToUser} style={{...menuSearchStyle}}/>
                <SearchWorkout btn2msg={"Add to my Plan"} btn2Fn={this.props.addWorkoutToUser} style={{...workSearchStyle}}/>
                <Link to="/firstLogin"><RaisedButton secondary={true} style={{width: "200px"}} label="First Login" /></Link>
                
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

export default connect(mapStateToProps, { getUserData, getUserMenus, getUserWorkouts, getAssignedMenus, getAssignedWorkouts, addMenuToUser, addWorkoutToUser, requestACoach, getCCInfo })(Dashboard)
