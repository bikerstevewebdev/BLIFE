import React, { Component } from 'react'
import { updateUsername, updateFullname, updateProfilePic, requestCoachAccess, toggleUpdateProfileModal } from '../../ducks/userReducer'
import { connect } from 'react-redux';
// import Measurements from '../Measurements/Measurements'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { TextField, IconButton } from 'material-ui';
import CloseBtn from 'material-ui/svg-icons/navigation/close'

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

    componentWillUnmount(){
        this.setState({
            usernameIn: '',
            fullnameIn: '',
            profile_picIn: ''
        })
    }
    
    render() {
        const { usernameIn, fullnameIn, profile_picIn } = this.state,
              { userData, updateProfileModalOpen } = this.props
        const updateStyles = {
            display: "grid"
        }
            //   { current_weight, current_height, current_bf } = curr_mes
        return(
            <Dialog contentStyle={{width: profile_picIn.length ? "36%" : "20%", minWidth: "300px", flexWrap: "wrap"}} open={updateProfileModalOpen}className="update-profile">
                <section style={{display: "flex", alignItems: "center"}}>
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
                        <h1>Update Profile</h1>
                        <TextField floatingLabelText="Change your username" value={usernameIn} onChange={(e) => this.updateUsernameIn(e.target.value)} hintText="Choose a unique username"/>
                        <RaisedButton secondary={true} onClick={() => this.sendUpdate('user')}>Update</RaisedButton>
                        <TextField floatingLabelText="Change your full name" value={fullnameIn} onChange={(e) => this.updateFullnameIn(e.target.value)} />
                        <RaisedButton secondary={true} onClick={() => this.sendUpdate('full')}>Update</RaisedButton>
                        <TextField floatingLabelText="Change your profile picture" value={profile_picIn} onChange={(e) => this.updateProfilePicIn(e.target.value)} />
                        <RaisedButton secondary={true} onClick={() => this.sendUpdate('pic')}>Update</RaisedButton>
                        <IconButton className="close-btn" onClick={() => this.props.toggleUpdateProfileModal(false)} label="close"><CloseBtn /></IconButton>
                    </section>
                        {
                            profile_picIn.length
                            ?
                            <img style={{paddingLeft: "10px", maxWidth: "250px"}} src={profile_picIn} alt={userData.username}/>
                            :
                            null
                        }
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