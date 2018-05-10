import React, { Component }from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { requestCoachAccess, updateUsername, updateFullname, renounceCoachAccess } from '../../ducks/userReducer'
import RaisedButton from 'material-ui/RaisedButton'
import './FirstLogin.css'
import StripeDefault from '../Stripe/StripeDefault'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';




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
            onFinalStep: false,
            loading: false,
            stepIndex: 0
        }
        this.startUpdate = this.startUpdate.bind(this)
        this.sendToMacroCalc = this.sendToMacroCalc.bind(this)
        this.sendToMes = this.sendToMes.bind(this)
        this.endFullnameStep = this.endFullnameStep.bind(this)
        this.endUsernameStep = this.endUsernameStep.bind(this)
        this.updateUsernameIn = this.updateUsernameIn.bind(this)
        this.updateFullnameIn = this.updateFullnameIn.bind(this)
        this.requestAccess = this.requestAccess.bind(this)

        this.dummyAsync = this.dummyAsync.bind(this)
        this.handleNext = this.handleNext.bind(this)
        this.handlePrev = this.handlePrev.bind(this)
        this.getStepContent = this.getStepContent.bind(this)
        this.renderContent = this.renderContent.bind(this)

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
        this.handleNext()
    }

    endFullnameStep(fullname){
        this.props.updateFullname(fullname)
        this.handleNext()
        this.setState({
            addingFullname: false,
            isRequesting: true
        })
    }

    requestAccess(val) {
        const { requestCoachAccess, renounceCoachAccess } = this.props
        if(val){
            requestCoachAccess()
        } else{
            renounceCoachAccess()
        }
        this.setState({
            isRequesting: false,
            onFinalStep: true
        })
        this.handleNext()
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

    ////////////////////
    dummyAsync = (cb) => {
        this.setState({loading: true}, () => {
          this.asyncTimer = setTimeout(cb, 500);
        });
      };
    
    handleNext = () => {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
        this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex + 1,
        }));
    }
    };

    handlePrev = () => {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
        this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex - 1,
        }));
    }
    };

    getStepContent(stepIndex) {
        const { userData } = this.props,
              { usernameIn, fullnameIn } = this.state
    switch (stepIndex) {
        case 0:
        return (
            <section>
                <h1>Welcome to your Balanced Life!</h1>
                <h2>Let's get you started with some simple user information...</h2>
            </section>
        );
        case 1:
        return (
            <section>
               <h2>What should we call you?</h2>
                <input value={usernameIn} onChange={(e) => this.updateUsernameIn(e.target.value)} placeholder="Choose a unique username"/>
                <RaisedButton primary={true} style={{width: "200px"}} onClick={() => this.endUsernameStep(usernameIn)}>Create Username</RaisedButton >
                <RaisedButton primary={true} style={{width: "200px"}} onClick={()=>this.endUsernameStep(false)}>Stick with {userData.username}</RaisedButton > 
            </section>
        );
        case 2:
        return (
            <section>
                <h2>What does your mother call you?</h2>
                <input value={fullnameIn} onChange={(e) => this.updateFullnameIn(e.target.value)} placeholder="What do does your mother call you?"/>
                <RaisedButton primary={true} style={{width: "200px"}} onClick={() => this.endFullnameStep(fullnameIn)}>Add my Fullname</RaisedButton >
            </section>
        );
        case 3:
        return (
            <section>
                <StripeDefault amount={3900} />
                <h2>Are you here to coach others?</h2>
                <RaisedButton primary={true} style={{width: "200px"}} onClick={() => this.requestAccess(true)}>Yes please! Request coach access!</RaisedButton >
                <RaisedButton primary={true} style={{width: "200px"}} onClick={() => this.requestAccess(false)}>No thanks, just here to find a healthy balance.</RaisedButton >
            </section>
        );
        case 4:
        return (
            <section>
                <h2>Would you like to start by adding your measurements or just calculating your macros?</h2>
                <RaisedButton primary={true} style={{width: "200px"}} onClick={this.sendToMes}>Add Measurements</RaisedButton >
                <RaisedButton primary={true} style={{width: "200px"}} onClick={this.sendToMacroCalc} >Calculate Macros</RaisedButton >
                <Link to="/dashboard"><RaisedButton primary={true} style={{width: "200px"}}>No thanks, take me to the Dashboard</RaisedButton ></Link>
            </section>
        );
        default:
        return 'You\'re a long way from home sonny jim!';
        }
    }

    renderContent() {
        const { stepIndex } = this.state;
        const contentStyle = {margin: '0 16px', overflow: 'hidden'};
    
        return (
          <div style={contentStyle}>
            <div>{this.getStepContent(stepIndex)}</div>
            <div style={{marginTop: 24, marginBottom: 12}}>
              <FlatButton
                label="Back"
                disabled={stepIndex === 0}
                onClick={this.handlePrev}
                style={{marginRight: 12}}
              />
              <RaisedButton
                label={'Next'}
                primary={true}
                disabled={stepIndex > 0}
                onClick={this.handleNext}
              />
            </div>
          </div>
        );
      }
    
    
    
    
    
    
    
    
    
    
    render() {
        const { sendingToMacroCalc, sendingToMes } = this.state
        const { loading, stepIndex } = this.state
        return(
            <section style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
                <Stepper activeStep={stepIndex}>
                <Step>
                    <StepLabel>
                        Welcome!
                    </StepLabel>
                </Step>
                <Step>
                    <StepLabel>
                        Username
                    </StepLabel>
                </Step>
                <Step>
                    <StepLabel>
                        Fullname
                    </StepLabel>
                </Step>
                <Step>
                    <StepLabel>
                        Coach Request
                    </StepLabel>
                </Step>
                <Step>
                    <StepLabel>
                        What's Next?
                    </StepLabel>
                </Step>
                </Stepper>
                <ExpandTransition loading={loading} open={true}>
                {this.renderContent()}
                </ExpandTransition>
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

export default connect(mapStateToProps, { requestCoachAccess, updateUsername, updateFullname, renounceCoachAccess })(FirstLogin)
