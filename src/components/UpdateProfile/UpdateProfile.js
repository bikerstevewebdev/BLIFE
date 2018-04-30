import React, { Component } from 'react'
import { updateUsername, updateFullname, updateProfilePic, requestCoachAccess } from '../../ducks/userReducer'
import { connect } from 'react-redux';
import Measurements from '../Measurements/Measurements'

class UpdateProfile extends Component{
    constructor(props){
        super(props)
        this.state = {
            usernameIn: props.userData.username,
            fullnameIn: props.userData.fullname,
            profile_picIn: props.userData.profile_pic
        }
        this.updateUsernameIn = this.updateUsernameIn.bind(this)
        this.updateFullnameIn = this.updateFullnameIn.bind(this)
        this.updateProfilePicIn = this.updateProfilePicIn.bind(this)
        this.requestAccess = this.requestAccess.bind(this)
    }

    updateUsernameIn(val) {
        this.setState({
            usernameIn: val
        })
    }

    updateFullnameIn(val) {
        this.setState({
            fullnameIn: val
        })
    }

    updateProfilePicIn(val) {
        this.setState({
            profile_picIn: val
        })
    }

    requestAccess(val) {
        val ? this.props.requestCoachAccess() : null
    }
    
    render() {
        const { usernameIn, fullnameIn, profile_picIn } = this.state,
              { updateFullname, updateProfilePic, updateUsername, userData } = this.props
            //   { current_weight, current_height, current_bf } = curr_mes
        return(
            <section className="update-profile">
                {
                    userData.coach_id > 0
                    ?
                    null
                    :
                    <section className="coach-request">
                        <h2>Looking to become a coach?</h2>
                        <button style={{width: "200px"}} onClick={() => this.requestAccess(true)}>Yes please! Request coach access!</button>
                    </section>
                }
                <p>Change your username:</p>
                <input value={usernameIn} onChange={(e) => this.updateUsernameIn(e.target.value)} placeholder="Choose a unique username"/>
                <button onClick={() => updateUsername(usernameIn)}>Update</button>
                <p>Change your full name:</p>
                <input value={fullnameIn} onChange={(e) => this.updateFullnameIn(e.target.value)} />
                <button onClick={() => updateFullname(fullnameIn)}>Update</button>
                <p>Change your profile picture:</p>
                <input value={profile_picIn} onChange={(e) => this.updateProfilePicIn(e.target.value)} />
                <button onClick={() => updateProfilePic(profile_picIn)}>Update</button>
                <Measurements />
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        userData: state.users.userData,
    }
}

export default connect(mapStateToProps, { updateUsername, updateFullname, updateProfilePic, requestCoachAccess })(UpdateProfile)