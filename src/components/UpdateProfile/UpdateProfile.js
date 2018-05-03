import React, { Component } from 'react'
import { updateUsername, updateFullname, updateProfilePic, requestCoachAccess } from '../../ducks/userReducer'
import { connect } from 'react-redux';
import Measurements from '../Measurements/Measurements'
import RaisedButton from 'material-ui/RaisedButton'

class UpdateProfile extends Component{
    constructor(props){
        super(props)
        this.state = {
            usernameIn: props.userData.username || '',
            fullnameIn: props.userData.fullname || '',
            profile_picIn: props.userData.profile_pic || ''
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
        if(val){
            this.props.requestCoachAccess()
        }

    }
    
    render() {
        const { usernameIn, fullnameIn, profile_picIn } = this.state,
              { updateFullname, updateProfilePic, updateUsername, userData } = this.props
            //   { current_weight, current_height, current_bf } = curr_mes
        return(
            <section className="update-profile">
                {
                    userData.coach_id/1 !== 0
                    ?
                    null
                    :
                    <section className="coach-request">
                        <h2>Looking to become a coach?</h2>
                        <RaisedButton secondary={true} style={{width: "200px"}} onClick={() => this.requestAccess(true)}>Yes please! Request coach access!</RaisedButton>
                    </section>
                }
                <p>Change your username:</p>
                <input value={usernameIn} onChange={(e) => this.updateUsernameIn(e.target.value)} placeholder="Choose a unique username"/>
                <RaisedButton secondary={true} onClick={() => updateUsername(usernameIn)}>Update</RaisedButton>
                <p>Change your full name:</p>
                <input value={fullnameIn} onChange={(e) => this.updateFullnameIn(e.target.value)} />
                <RaisedButton secondary={true} onClick={() => updateFullname(fullnameIn)}>Update</RaisedButton>
                <p>Change your profile picture:</p>
                <input value={profile_picIn} onChange={(e) => this.updateProfilePicIn(e.target.value)} />
                <RaisedButton secondary={true} onClick={() => updateProfilePic(profile_picIn)}>Update</RaisedButton>
                <Measurements location={this.props.location} />
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