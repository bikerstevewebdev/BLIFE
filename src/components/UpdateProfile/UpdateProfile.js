import React, { Component } from 'react'
import { updateUsername, updateFullname, updateProfilePic, requestCoachAccess, toggleUpdateProfileModal } from '../../ducks/userReducer'
import { connect } from 'react-redux';
// import Measurements from '../Measurements/Measurements'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

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
        this.sendUpdate = this.sendUpdate.bind(this)
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

    sendUpdate(val){
        const { updateFullname, updateProfilePic, updateUsername } = this.props
        const { fullnameIn, profile_picIn, usernameIn } = this.state
        if(val === 'pic'){
            updateProfilePic(profile_picIn)
            this.setState({ profile_picIn: '' })
        }else if(val === 'full'){
            updateFullname(fullnameIn)
            this.setState({ fullnameIn: '' })
        }else if(val === 'user'){
            updateUsername(usernameIn)
            this.setState({ usernameIn: '' })
        }
    }

    requestAccess(val) {
        if(val){
            this.props.requestCoachAccess()
        }

    }
    
    render() {
        const { usernameIn, fullnameIn, profile_picIn } = this.state,
              { userData, updateProfileModalOpen } = this.props
        const updateStyles = {
            display: "grid"
        }
            //   { current_weight, current_height, current_bf } = curr_mes
        return(
            <Dialog open={updateProfileModalOpen}className="update-profile">
            <section style={updateStyles}>
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
                <RaisedButton secondary={true} onClick={() => this.sendUpdate('user')}>Update</RaisedButton>
                <p>Change your full name:</p>
                <input value={fullnameIn} onChange={(e) => this.updateFullnameIn(e.target.value)} />
                <RaisedButton secondary={true} onClick={() => this.sendUpdate('full')}>Update</RaisedButton>
                <p>Change your profile picture:</p>
                <input value={profile_picIn} onChange={(e) => this.updateProfilePicIn(e.target.value)} />
                <RaisedButton secondary={true} onClick={() => this.sendUpdate('pic')}>Update</RaisedButton>
                <FlatButton onClick={() => this.props.toggleUpdateProfileModal(false)} label="close" />
            </section>
            </Dialog>
        )
    }
}

function mapStateToProps(state) {
    return {
        userData: state.users.userData,
        updateProfileModalOpen: state.users.updateProfileModalOpen
    }
}

export default connect(mapStateToProps, { updateUsername, updateFullname, updateProfilePic, requestCoachAccess, toggleUpdateProfileModal })(UpdateProfile)