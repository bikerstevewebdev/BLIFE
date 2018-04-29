import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUserData, updateUserStats, addMacrosToState, getUserMenus, getUserWorkouts } from '../../ducks/userReducer';
import { changeUpdating, clearMacroEntry } from '../../ducks/macroCalcReducer'


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
            const {
            profile_pic,
            current_protein,
            current_carbs,
            current_fat,
            current_weight,
            current_height,
            current_bf,
            userData
        } = this.props
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
    return{
        profile_pic: state.users.user.profile_pic,
        current_protein: state.users.user.current_protein,
        current_carbs: state.users.user.current_carbs,
        current_fat: state.users.user.current_fat,
        current_weight: state.users.user.current_weight,
        current_height: state.users.user.current_height,
        current_bf: state.users.user.current_bf,
        userData: state.users.userData,
        curr_mes: state.users.curr_mes,
        pro: state.macros.macros.protein,
        carbs: state.macros.macros.carbs,
        fat: state.macros.macros.fat,
        weight: state.macros.weight,
        height: state.macros.height,
        bodyfat: state.macros.bodyfat,
        isUpdating: state.macros.isUpdating
    }
}

export default connect(mapStateToProps, { getUserData, updateUserStats, addMacrosToState, changeUpdating, clearMacroEntry, getUserMenus, getUserWorkouts })(Profile)