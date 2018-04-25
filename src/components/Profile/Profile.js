import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUserData, updateUserStats } from '../../ducks/macroCalcReducer';


class Profile extends Component{


    componentDidMount() {
        this.props.getUserData()
        // console.log(this.props.userData)
        console.log(this.props)
    }

    updateNewMes() {
        const { current_protein,
            current_carbs,
            current_fat,
            current_weight,
            current_height,
            current_bf
        } = this.props
        const { waist, neck, chest } = this.props.current_measurements
        this.props.updateUserStats(current_protein,
            current_carbs,
            current_fat,
            current_weight,
            current_height,
            current_bf, 
            waist, 
            chest,
            neck )
        console.log('updating measurements')
    }
    
    discardNewMes() {
        console.log('discarding new measurements')
    }
    
    render() {
        const {
            profile_pic,
            current_protein,
            current_carbs,
            current_fat,
            current_weight,
            current_height,
            current_bf 
        } = this.props
        return(
            <section>
                Proofile Yo
                <Link to='/updateProfile'>Update Profile</Link>
                <p>Protein: {current_protein}</p>
                <p>Fat: {current_fat}</p>
                <p>Carbs: {current_carbs}</p>
                <p>Pofile Pic: </p>
                <img src={profile_pic} alt="users pic"/>
                <p>Weight: {current_weight}</p>
                <p>Height: {current_height}</p>
                <p>Bodyfat: {current_bf}</p>
                {
                    this.props.updatedHtWtBf
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
        updatedHtWtBf: state.updatedHtWtBf,
        profile_pic: state.user.profile_pic,
        current_protein: state.user.current_protein,
        current_carbs: state.user.current_carbs,
        current_fat: state.user.current_fat,
        current_weight: state.user.current_weight,
        current_height: state.user.current_height,
        current_bf: state.user.current_bf,
        userData: state.userData,
        current_measurements: state.current_measurements
    }
}

export default connect(mapStateToProps, { getUserData, updateUserStats })(Profile)