import React, { Component }from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { requestCoachAccess, updateUsername, updateFullname } from '../../ducks/userReducer'



class FirstLogin extends Component{
    constructor(){
        super()
        this.state = {
            usernameIn: '',
            fullnameIn: '',
            editingUsername: false,
            addingFullname: false,
            sendingToMacroCalc: false,
            sendingToMes: false,
            isRequesting: false,
            onFinalStep: false
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
    
    endUsernameStep(username) {
        if(username){
            this.props.updateUsername(username)
            this.setState({
                editingUsername: false,
                addingFullname: true
            })
        }else{
            this.setState({
                editingUsername: false,
                addingFullname: true
                })
        }
    }

    endFullnameStep(){
        this.setState({
            addingFullname: false,
            isRequesting: true
        })
    }

    requestAccess(val) {
        const { requestCoachAccess } = this.props
        if(val) requestCoachAccess()
        
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
        const { userData, updateFullname, onFinalStep, isRequesting } = this.props,
              { usernameIn, editingUsername, addingFullname, fullnameIn, sendingToMacroCalc, sendingToMes } = this.state
        return(
            <nav>
                <h1>Welcome to your Balanced Life!</h1>
                {/* could use a delay for the second item to transition in */}
                <h2>Let's get you started with some simple user information...</h2>
                <button style={{width: "200px"}} onClick={this.startUpdate}>Ok</button>
                {/* Use React Motion and conditional rendering here to make smooth transitions, maybe functional components for each step of the sign-up process */}
                {
                    editingUsername
                    ?
                    <section className="username-edit">
                        <h2>What should we call you?</h2>
                        <input value={usernameIn} onChange={(e) => this.updateUsernameIn(e.target.value)} placeholder="Choose a unique username"/>
                        <button style={{width: "200px"}} onClick={() => this.endUsernameStep(usernameIn)}>Create Username</button>
                        <button style={{width: "200px"}} onClick={this.endUsernameStep}>Stick with {userData.username}</button>
                    </section>
                    :
                    null
                }
                {
                    addingFullname
                    ?
                    <section className="fullname-edit">
                        <h2>What does your mother call you?</h2>
                        <input value={fullnameIn} onChange={(e) => this.updateFullnameIn(e.target.value)} placeholder="What do does your mother call you?"/>
                        <button style={{width: "200px"}} onClick={() => updateFullname(fullnameIn)}>Add my Fullname</button>
                    </section>
                    :
                    null
                }
                {
                    isRequesting
                    ?
                    <section className="coach-request-edit">
                        <h2>Are you here to coach others?</h2>
                        <button style={{width: "200px"}} onClick={() => this.requestAccess(true)}>Yes please! Request coach access!</button>
                        <button style={{width: "200px"}} onClick={() => this.requestAccess(false)}>No thanks, just here to find a healthy balance.</button>
                    </section>
                    :
                    null
                }
                {
                    onFinalStep
                    ?
                    <section className="final-step">
                        <h2>Would you like to start by adding your measurements or just calculating your macros?</h2>
                        <button style={{width: "200px"}} onClick={this.sendToMes}>Add Measurements</button>
                        <button style={{width: "200px"}} onClick={this.sendToMacroCalc} >Calculate Macros</button>
                        <Link to="/dashboard"><button style={{width: "200px"}}>No thanks, take me to the Dashboard</button></Link>
                    </section>
                    :
                    null
                }
                {/* Redirecting to end the welcome process */}
                {
                    sendingToMacroCalc
                    ?
                    <Redirect to={`/macroCalc`} />
                    :
                    null
                }
                {
                    sendingToMes
                    ?
                    <Redirect to={`/measurements`} />
                    :
                    null
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

export default connect(mapStateToProps, { requestCoachAccess, updateUsername, updateFullname })(FirstLogin)
