import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUserData, updateUserStats, addMacrosToState, getUserMenus, getUserWorkouts, addMenuToUser, addWorkoutToUser, getAssignedMenus, getAssignedWorkouts, getAllProgressPics, getCurrentPhotos } from '../../ducks/userReducer';
import { changeUpdating, clearMacroEntry } from '../../ducks/macroCalcReducer'
import MenuCard from '../Menu/MenuCard'
import WorkoutCard from '../Workout/WorkoutCard'
import SearchMenus from '../Search/SearchMenus'
import SearchWorkouts from '../Search/SearchWorkouts'
import PhotoUpload from '../Photos/PhotoUpload'
import PhotoCard from '../Photos/PhotoCard'
import RaisedButton from 'material-ui/RaisedButton'
// import { Image } from 'semantic-ui-react'
import {List, ListItem} from 'material-ui/List'
import MobileTearSheet from '../MobileTearSheet/MobileTearSheet'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {blue500, yellow600} from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import Avatar from 'material-ui/Avatar';

class Profile extends Component{
    constructor() {
        super()
        this.state = {
            showingAssigned: false,
            showingAllProgressPics: false
            // updatedHtWtBf: false
        }
        this.updateNewMes = this.updateNewMes.bind(this)
        this.discardNewMes = this.discardNewMes.bind(this)
        this.showAssigned = this.showAssigned.bind(this)
    }

    
    componentDidMount() {
            this.props.getUserData()
        
        console.log(this.props)
        const { userData, getUserMenus, getUserWorkouts, getAssignedWorkouts, getAssignedMenus, userMenus, userWorkouts, assignedMenus, assignedWorkouts } = this.props
        const { has_coach } = userData
        if(has_coach && assignedMenus.length < 1 && assignedWorkouts.length < 1){
            getAssignedMenus()
            getAssignedWorkouts()
        } else if(userMenus.length < 1 && userWorkouts.length < 1){
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
        const { pro, carbs, fat, bodyfat, weight, height, userData, isUpdating } = this.props
        if(isUpdating){
            this.props.addMacrosToState(pro, carbs, fat, bodyfat/1, weight/1, height/1, userData.curr_mes)
        }
        // console.log(curr_mes.mes_id, userData.curr_mes_id, pro)
        // Checking to see if macros were calced, and add them to state in userReducer if so
        // User can update their measurements and macros if they want to keep the new numbers or discard them
            // this.setState({
            //     updatedHtWtBf: true
            // })
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
    
        showAllProgressPics(val){
            if(val){
                this.props.getAllProgressPics()
            }else{
                this.props.getCurrentPhotos()
            }
            this.setState({
                showingAllProgressPics: val
            })
        }
    
//////////////////////Handles Macro Changes///////////////////
        updateNewMes() {
            const { current_protein, current_carbs, current_fat, current_weight, current_height, current_bf } = this.props
            const { waist, neck, chest } = this.props.curr_mes
            this.props.updateUserStats(current_protein, current_carbs, current_fat, current_weight, current_height, current_bf, waist, chest, neck)
            this.props.changeUpdating()
            console.log('updating measurements')
        }

        discardNewMes() {
            this.props.clearMacroEntry()
            console.log('discarding new measurements')
        }
//////////////////////Handles Macro Changes///////////////////
        
        render() {
            const { profile_pic, current_protein, current_carbs, current_fat, current_weight, current_height, current_bf, userData, userWorkouts, userMenus, assignedWorkouts, assignedMenus, progress_pics } = this.props
            let assignedMenuList, assignedWorkoutList, workoutsList, menusList
            const progressPics = progress_pics.map(pic => <PhotoCard key={pic.photo_id} date_added={pic.date_added} src={pic.url} photo_id={pic.photo_id} alt={userData.username + ' ' + pic.type} />)
            /////////////////Users Menus/Workouts////////////////////
            if(userMenus){
                menusList = userMenus.map(menu => <MenuCard key={menu.user_menu_id} menu_id={menu.menu_id} title={menu.title} total_p={menu.total_p} total_c={menu.total_c} total_f={menu.total_f} total_fib={menu.total_fib} img={menu.img}/>)
            }else{
                menusList = null
            }
            if(userWorkouts){
                workoutsList = userWorkouts.map(workout => <WorkoutCard key={workout.user_workout_id} workout_id={workout.workout_id} title={workout.title} img={workout.img} type={workout.type} />)
            }else{
                workoutsList = null
            }
            /////////////////assigned//////////////
            if(assignedMenus){
                assignedMenuList = assignedMenus.map(menu => <MenuCard key={menu.user_menu_id} menu_id={menu.menu_id} title={menu.title} total_p={menu.total_p} total_c={menu.total_c} total_f={menu.total_f} total_fib={menu.total_fib} img/>)
            }else{
                assignedMenuList = null
            }
            if(assignedWorkouts){
                assignedWorkoutList = assignedWorkouts.map(workout => <WorkoutCard key={workout.user_workout_id} workout_id={workout.workout_id} title={workout.title} img={workout.img} type={workout.type} />)
            }else{
                assignedWorkoutList = null
            }
        return(
            <section className="comp profile">
                <h1>Welcome Home</h1>
                <PhotoUpload />
                {progressPics}
                {
                    this.state.showingAllProgressPics
                    ?
                    <RaisedButton secondary={true} onClick={()=>this.showAllProgressPics(false)}>Just Show Me My Current Progress Pictures</RaisedButton>
                    :
                    <RaisedButton secondary={true} onClick={()=>this.showAllProgressPics(true)}>Show me all my progress pictures</RaisedButton>
                }
                <Link to='/'><RaisedButton secondary={true} style={{backgroundColor: "yellow"}}>Back to Login</RaisedButton></Link>
                <Link to='/updateProfile'><RaisedButton secondary={true} style={{backgroundColor: "orange"}}>Update Profile</RaisedButton></Link>
                {
                    userData.coach_id > 0
                    ?
                    <Link to={`/coachManager/${userData.coach_id}`}><RaisedButton>secondary={true} Coach Manager</RaisedButton></Link>
                    :
                    null
                }
                {/* Displays user's current menus: */}
                <h2>Your Menus:</h2>
                {
                    this.state.showingAssigned && assignedMenus
                    ?
                    assignedMenuList
                    :
                    menusList

                }
                
                {
                    userData.has_coach
                    ?
                    <RaisedButton secondary={true} onClick={this.showAssigned}>Show me my coach's plan</RaisedButton>
                    :
                    null
                }
                <SearchMenus style={{width: "200px"}} doSomething={true} btnMsg={`Add this workout to your plan`} handleBtnClick={this.props.addMenuToUser.bind(this)} />
                {/* Displays user's current workouts: */}
                <h2>Your Workouts:</h2>
                {
                    this.state.showingAssigned && assignedWorkouts
                    ?
                    assignedWorkoutList
                    :
                    workoutsList

                }
                <SearchWorkouts style={{width: "200px"}} doSomething={true} btnMsg={`Add this workout to your plan`} handleBtnClick={this.props.addWorkoutToUser.bind(this)} />
                <h2>Current Stats</h2>
                {/* <p>Protein: {current_protein}g</p>
                <p>Fat: {current_fat}g</p>
                <p>Carbs: {current_carbs}g</p> */}
                <p>Pofile Pic: </p>
                {/* <Image src={profile_pic} size='medium' circular /> */}
                <img style={{width: "200px", height: "200px", borderRadius: "50%", overFlow: "hidden"}} src={profile_pic} alt="users pic"/>
                {/* <p>Weight: {current_weight}pounds</p>
                <p>Height: {current_height}inches</p>
                <p>Bodyfat: {current_bf}%</p> */}
                <MobileTearSheet >
                    <Subheader>Current Measurements</Subheader>
                    <List>
                        <ListItem leftAvatar={<Avatar icon={<EditorInsertChart />} backgroundColor={yellow600}/>} primaryText="Weight" secondaryText={current_weight} />
                        <ListItem insetChildren={true} primaryText="Height" secondaryText={current_height} />
                        <ListItem insetChildren={true} primaryText="Bodyfat" secondaryText={current_bf} />
                    </List>
                    <Divider inset={true} />
                    <Subheader>Current Macros</Subheader>
                    <List>
                        <ListItem  leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />} primaryText={`Protein`} secondaryText={`${current_protein}g`} />
                        <ListItem insetChildren={true} primaryText={`Fat`} secondaryText={`${current_fat}g`} />
                        <ListItem insetChildren={true} primaryText={`Carbs`} secondaryText={`${current_carbs}g`} />
                    </List>
                </MobileTearSheet>
                {
                    this.props.isUpdating
                    ?
                    <section className="new-mes-logic">
                        <p>Looks like you've got some new measurements.</p>
                        <p>Would you like to update them?</p>
                        <RaisedButton secondary={true} onClick={this.updateNewMes}>Yes</RaisedButton>
                        <RaisedButton secondary={true} onClick={this.discardNewMes}>No, get rid of them.</RaisedButton>
                    </section>
                    :
                    null
                }
            </section>
        )
    }
}

function mapStateToProps(state){
    const { user, curr_mes, userData, userMenus, userWorkouts, assignedMenus, assignedWorkouts } = state.users,
          { profile_pic, current_protein, current_carbs, current_fat, current_weight, current_height, current_bf, progress_pics } = user,
          { macros, weight, height, bodyfat, isUpdating } = state.macros
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
        assignedWorkouts,
        progress_pics
    }
}

export default connect(mapStateToProps, { getUserData, updateUserStats, addMacrosToState, changeUpdating, clearMacroEntry, getUserMenus, getUserWorkouts, addMenuToUser, addWorkoutToUser, getAssignedMenus, getAssignedWorkouts, getAllProgressPics, getCurrentPhotos })(Profile)