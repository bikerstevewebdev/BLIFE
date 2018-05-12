import React, { Component }from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { requestCoachAccess, updateUsername, updateFullname, renounceCoachAccess } from '../../ducks/userReducer'
import RaisedButton from 'material-ui/RaisedButton'
import './FirstLogin.css'
import StripeDefault from '../Stripe/StripeDefault'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import ReceiptModal from '../Stripe/ReceiptModal';




class FirstLogin extends Component{
    constructor(){
        super()
        this.state = {
            usernameIn: '',
            fullnameIn: '',
            loading: false,
            stepIndex: 0,
            stripeMsg: '',
            stripeSuccess: false
        }
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
    }
    
    updateUsernameIn(val) {
        this.setState({ usernameIn: val })
    }
    
    updateFullnameIn(val) {
        this.setState({ fullnameIn: val })
    }
    
    endUsernameStep(username) {
        if(username){
            this.props.updateUsername(username)
            this.handleNext()
        }else{
            alert('Please enter a username.')
        }
    }

    endFullnameStep(fullname){
        if(fullname){
            this.props.updateFullname(fullname)
            this.handleNext()
        }else{
            alert('Please enter a name.')
        }
    }

    requestAccess(val) {
        const { requestCoachAccess, renounceCoachAccess } = this.props
        if(val){
            requestCoachAccess()
        } else{
            renounceCoachAccess()
        }
        this.handleNext()
    }
    
    sendToMacroCalc() {
        this.props.history.push('/macroCalc')
    }
    
    sendToMes() {
        this.props.history.push('/measurements')
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
    }



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
                <RaisedButton primary={true} style={{width: "200px"}} onClick={()=>this.handleNext()}>Stick with {userData.username}</RaisedButton > 
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
                <StripeDefault updateChargeMsg={this.updateStripeMsg.bind(this)} amount={3900} />
            </section>
        );
        case 4:
        return (
            <section>
                <h2>Are you here to coach others?</h2>
                <RaisedButton primary={true} style={{width: "200px"}} onClick={() => this.requestAccess(true)}>Yes please! Request coach access!</RaisedButton >
                <RaisedButton primary={true} style={{width: "200px"}} onClick={() => this.requestAccess(false)}>No thanks, just here to find a healthy balance.</RaisedButton >
            </section>
        );
        case 5:
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

    updateStripeMsg(msg, id) {
        this.setState({
            stripeMsg: msg,
            stripeSuccess: true
        })
    }

    closeReceiptModal(){
        this.setState({ stripeSuccess: false })
        this.handleNext()
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
                disabled={stepIndex === 0 || stepIndex > 2}
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
                        Life Investment
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
                <ReceiptModal rmOpen={this.state.stripeSuccess}  closeModal={this.closeReceiptModal.bind(this)} />
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
