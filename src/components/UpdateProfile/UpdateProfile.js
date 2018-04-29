import React, { Component } from 'react'
import { updateUsername, updateFullname, updateProfilePic } from '../../ducks/userReducer'
import { connect } from 'react-redux';
import Measurements from '../Measurements/Measurements'

class UpdateProfile extends Component{
    constructor(props){
        super(props)
        this.state = {
            usernameIn: props.userData.username,
            fullnameIn: props.userData.fullname,
            profile_picIn: props.userData.profile_pic,
            // changingMeasurements: false
        }
        this.updateUsernameIn = this.updateUsernameIn.bind(this)
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

    // prepareToChangeMeasurements(val) {
    //     this.setState({
    //         changingMeasurements: true
    //     })
    // }


    
    render() {
        const { usernameIn, fullnameIn, profile_picIn } = this.state,
              { updateFullname, updateProfilePic, updateUsername } = this.props,
            //   { current_weight, current_height, current_bf } = curr_mes
        return(
            <section>
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
                {/* {
                    this.state.changingMeasurements
                    ?
                    :
                    <section className="change-measurements">
                        <ul>
                            <li>{height}</li>
                            <li>{weight}</li>
                            <li>{bf}</li>
                            <li>{waist}</li>
                            <li>{neck}</li>
                            <li>{chest}</li>
                            <li>{chest}</li>
                        </ul>
                        <button onClick={this.prepareToChangeMeasurements}>Change Measurements?</button>
                    </section>
                } */}
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        userData: state.users.userData,
        // user: state.users.user
    }
}

export default connect(mapStateToProps, { updateUsername, updateFullname, updateProfilePic })(UpdateProfile)