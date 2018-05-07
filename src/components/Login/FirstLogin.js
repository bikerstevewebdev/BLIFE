import React, { Component }from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { requestCoachAccess, updateUsername, updateFullname } from '../../ducks/userReducer'
import RaisedButton from 'material-ui/RaisedButton'
import './FirstLogin.css'
import StripeDefault from '../Stripe/StripeDefault'



class FirstLogin extends Component{
    constructor(){
        super()
        this.state = {
            usernameIn: '',
            fullnameIn: '',
            onFirstStep: true,
            editingUsername: false,
            addingFullname: false,
            sendingToMacroCalc: false,
            sendingToMes: false,
            isRequesting: false,
            onFinalStep: false
        }
        this.startUpdate = this.startUpdate.bind(this)
        this.sendToMacroCalc = this.sendToMacroCalc.bind(this)
        this.sendToMes = this.sendToMes.bind(this)
        this.endFullnameStep = this.endFullnameStep.bind(this)
        this.endUsernameStep = this.endUsernameStep.bind(this)
        this.updateUsernameIn = this.updateUsernameIn.bind(this)
        this.updateFullnameIn = this.updateFullnameIn.bind(this)
        this.requestAccess = this.requestAccess.bind(this)

    }
    
    componentDidUpdate(prevProps){
        console.log(prevProps, this.props)
        if(prevProps.userData.fullname !== this.props.userData.fullname){
            this.setState({
                addingFullname: false,
                isRequesting: true
            })
        }
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
    
    startUpdate() {
        this.setState({
            editingUsername: true,
            onFirstStep: false
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
        if(val){
            requestCoachAccess()
        } 
        this.setState({
            isRequesting: false,
            onFinalStep: true
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
        const { userData, updateFullname } = this.props,
              { usernameIn, editingUsername, addingFullname, fullnameIn, sendingToMacroCalc, sendingToMes, isRequesting, onFirstStep, onFinalStep } = this.state
        return(
            <section className="comp first-login">
                {
                    onFirstStep
                    ?
                    <section className="first-step">
                        <h1>Welcome to your Balanced Life!</h1>
                        {/* could use a delay for the second item to transition in */}
                        <h2>Let's get you started with some simple user information...</h2>
                        <RaisedButton primary={true} style={{width: "200px"}} onClick={this.startUpdate}>Ok</RaisedButton>
                    </section>
                    :
                    null
                }
                {/* Use React Motion and conditional rendering here to make smooth transitions, maybe functional components for each step of the sign-up process */}
                {
                    editingUsername
                    ?
                    <section className="username-edit">
                        <h2>What should we call you?</h2>
                        <input value={usernameIn} onChange={(e) => this.updateUsernameIn(e.target.value)} placeholder="Choose a unique username"/>
                        <RaisedButton primary={true} style={{width: "200px"}} onClick={() => this.endUsernameStep(usernameIn)}>Create Username</RaisedButton >
                        <RaisedButton primary={true} style={{width: "200px"}} onClick={()=>this.endUsernameStep(false)}>Stick with {userData.username}</RaisedButton >
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
                        <RaisedButton primary={true} style={{width: "200px"}} onClick={() => updateFullname(fullnameIn)}>Add my Fullname</RaisedButton >
                    </section>
                    :
                    null
                }
                {
                    isRequesting
                    ?
                    <section className="coach-request-edit">
                        <StripeDefault total={39} />
                        <h2>Are you here to coach others?</h2>
                        <RaisedButton primary={true} style={{width: "200px"}} onClick={() => this.requestAccess(true)}>Yes please! Request coach access!</RaisedButton >
                        <RaisedButton primary={true} style={{width: "200px"}} onClick={() => this.requestAccess(false)}>No thanks, just here to find a healthy balance.</RaisedButton >
                    </section>
                    :
                    null
                }
                {
                    onFinalStep
                    ?
                    <section className="final-step">
                        <h2>Would you like to start by adding your measurements or just calculating your macros?</h2>
                        <RaisedButton primary={true} style={{width: "200px"}} onClick={this.sendToMes}>Add Measurements</RaisedButton >
                        <RaisedButton primary={true} style={{width: "200px"}} onClick={this.sendToMacroCalc} >Calculate Macros</RaisedButton >
                        <Link to="/dashboard"><RaisedButton primary={true} style={{width: "200px"}}>No thanks, take me to the Dashboard</RaisedButton ></Link>
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
            </section>
        )
    }
}
function mapStateToProps(state){
    return {
        userData: state.users.userData
    }
}

export default connect(mapStateToProps, { requestCoachAccess, updateUsername, updateFullname })(FirstLogin)
