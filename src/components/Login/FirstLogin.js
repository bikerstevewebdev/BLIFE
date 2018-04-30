import React, { Component }from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateUser, requestCoachAccess, updateUsername, updateFullname } from '../../ducks/userReducer'



class FirstLogin extends Component() {
    constructor(){
        super()
        this.state = {
            usernameIn: '',
            editingUsername: false,
            sendingToMacroCalc: false,
            sendingToMes: false,
            isRequesting: false
        }
        this.startUpdate = this.startUpdate.bind(this)
        this.keepUsername = this.keepUsername.bind(this)
        this.updateUsernameIn = this.updateUsernameIn.bind(this)
        this.requestAccess = this.requestAccess.bind(this)

    }
    
    updateUsernameIn(val) {
        this.setState({
            usernameIn: val
        })
    }
    
    startUpdate() {
        this.setState({
            editingUsername: true
        })
    }
    
    keepUsername() {
        this.setState({
            editingUsername: false
        })
    }

    requestAccess(val) {
        val ? this.props.requestCoachAccess() : null
        this.setState({
            isRequesting: false
        })
    }
    
    sendToMacroCalc() {
        this.setState({
            sendingToMacroCalc: true
        })
    }
    
    sendToMes() {
        this.setState({
            sendingToMes: true
        })
    }
    
    render() {
        const { userData, requestCoachAccess, updateUsername, updateFullname } = this.props,
              { usernameIn } = this.state
        return(
            <nav>
                <h1>Welcome to your Balanced Life!</h1>
                {/* could use a delay for the second item to transition in */}
                <h2>Let's get you started with some simple user information...</h2>
                <button style={{width: "200px"}} onClick={this.startUpdate}>Ok</button>
                <h2>What should we call you?</h2>
                <input value={usernameIn} onChange={(e) => this.updateUsernameIn(e.target.value)} placeholder="Choose a unique username"/>
                <button style={{width: "200px"}} onClick={() => updateUsername(usernameIn)}>Create Username</button>
                <input value={fullnameIn} onChange={(e) => this.updateFullnameIn(e.target.value)} placeholder="Choose a unique username"/>
                <button style={{width: "200px"}} onClick={() => updateFullname(usernameIn)}>Create Username</button>
                <button style={{width: "200px"}} onClick={this.keepUsername}>Stick with {userData.username}</button>
                {/* Use React Motion and conditional rendering here to make smooth transitions, maybe functional components for each step of the sign-up process */}
                <h2>Are you here to coach others?</h2>
                <button style={{width: "200px"}} onClick={() => this.requestAccess(true)}>Yes please! Request coach access!</button>
                <button style={{width: "200px"}} onClick={() => this.requestAccess(false)}>No thanks, just here to find a healthy balance.</button>
                {/* Redirecting to end the welcome process */}
                <h2>Would you like to start by adding your measurements or just calculating your macros?</h2>
                <button style={{width: "200px"}} onClick={this.sendToMes}>Add Measurements</button>
                <button style={{width: "200px"}} onClick={this.sendToMacroCalc} >Calculate Macros</button>
                <Link to="/dashboard"><button style={{width: "200px"}}>No thanks, take me to the Dashboard</button></Link>
                {
                    this.state.sendingToMacroCalc
                    ?
                    null
                    :
                    <Redirect to={`/macroCalc`} />
                }
                {
                    this.state.sendingToMes
                    ?
                    null
                    :
                    <Redirect to={`/measurements`} />
                }
            </nav>
        )
    }
}
function mapStateToProps(state){
    return {
        userData: state.users.userData
    }
}

export default connect(mapStateToProps, { updateUser, requestCoachAccess, updateUsername, updateFullname })(FirstLogin)
