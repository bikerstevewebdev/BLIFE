import React, { Component }from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { requestCoachAccess, updateUsername, updateFullname, renounceCoachAccess } from '../../ducks/userReducer'
import RaisedButton from 'material-ui/RaisedButton'
import StripeDefault from '../Stripe/StripeDefault'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import ReceiptModal from '../Stripe/ReceiptModal';
import { TextField } from 'material-ui';




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
        const mainHeadStyle = {
            color: "#ff7800",
            textTransform: "capitalize",
            fontFamily: "Roboto",
            fontSize: "3.25em",
            textShadow: "rgb(0, 0, 0) 3px 4px 8px",
            fontSize: "3.5em"
        }
        const headStyle = {
            fontSize: "1.75em"
        }
        const jcFlexCol = {
            display: "flex", flexDirection: "column", justifyContent: "space-around", height: "100%", alignItems: "center"
        }
    switch (stepIndex) {
        case 0:
        return (
            <section style={{...jcFlexCol, height: "25vh"}}>
                <h1 style={{...mainHeadStyle}}>Welcome to your Balanced Life!</h1>
                <h2 style={{...headStyle}}>Let's get you started with some simple user information...</h2>
            </section>
        );
        case 1:
        return (
            <section style={{...jcFlexCol}}>
               <h2 style={{...headStyle}}>What should we call you?</h2>
                <TextField fullWidth value={usernameIn} onChange={(e) => this.updateUsernameIn(e.target.value)} floatingLabelText="Choose a unique username"/>
                <RaisedButton primary={true} fullWidth onClick={() => this.endUsernameStep(usernameIn)}>Create Username</RaisedButton >
                <RaisedButton primary={true} fullWidth onClick={()=>this.handleNext()}>Stick with {userData.username}</RaisedButton > 
            </section>
        );
        case 2:
        return (
            <section>
                <h2 style={{...headStyle}}>What does your mother call you?</h2>
                <TextField fullWidth value={fullnameIn} onChange={(e) => this.updateFullnameIn(e.target.value)} floatingLabelText="What do does your mother call you?"/>
                <RaisedButton primary={true} fullWidth onClick={() => this.endFullnameStep(fullnameIn)}>Add my Fullname</RaisedButton >
            </section>
        );
        case 3:
        return (
            <section style={{...jcFlexCol, height: "15vh"}}>
                <h2 style={{...headStyle}}>A one time investment that will change your life.</h2>
                <StripeDefault updateChargeMsg={this.updateStripeMsg.bind(this)} amount={3900} />
            </section>
        );
        case 4:
        return (
            <section style={{...jcFlexCol, height: "20vh"}}>
                <h2 style={{...headStyle}}>Are you here to coach others?</h2>
                <RaisedButton primary={true} fullWidth onClick={() => this.requestAccess(true)}>Yes please! Request coach access!</RaisedButton >
                <RaisedButton primary={true} fullWidth onClick={() => this.requestAccess(false)}>No thanks, just here to find a healthy balance.</RaisedButton >
            </section>
        );
        case 5:
        return (
            <section style={{...jcFlexCol, padding: "1.25em", height: "30vh"}}>
                <h2 style={{...headStyle}}>Would you like to start by adding your measurements or just calculating your macros?</h2>
                <RaisedButton primary={true} style={{width: "40%"}} onClick={this.sendToMes}>Add Measurements</RaisedButton >
                <RaisedButton primary={true} style={{width: "40%"}} onClick={this.sendToMacroCalc} >Calculate Macros</RaisedButton >
                <Link style={{width: "40%"}} to="/dashboard"><RaisedButton primary={true} fullWidth>No thanks, take me to the Dashboard</RaisedButton ></Link>
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
        const contentStyle = {
            margin: '0 16px',
            overflow: 'visible',
            boxShadow: "rgb(29, 39, 41) 0px 2px 1px 1px",
            borderRadius: "15px",
            // width: "100%",
            backgroundColor: "rgb(236, 234, 255)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center"
        };
        const jcFlexCol = {
            display: "flex", flexDirection: "column", justifyContent: "space-around", height: "100%"
        }
        return (
          <section style={contentStyle}>
            <div style={{...jcFlexCol}}>{this.getStepContent(stepIndex)}</div>
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
          </section>
        );
      }
    
    
    render() {
        const { loading, stepIndex } = this.state
        const backdropStyle = {
            backgroundColor: "#0c0c0cf2",
            width: "100%",
            position: "fixed",
            height: "100%",
            top: "75px",
            left: "0",
            paddingTop: "10%"
        }
        return(
            <section style={{...backdropStyle}}>
                <section style={{width: '50%', margin: 'auto'}}>
                    <Stepper activeStep={stepIndex}>
                        <Step>
                            <StepLabel style={stepIndex > -1 ? {color: "#fff"} : {color: "rgba(97, 97, 97, 0.6)"}} >
                                Welcome!
                            </StepLabel>
                        </Step>
                        <Step>
                            <StepLabel style={stepIndex > 0 ? {color: "#fff"} : {color: "rgba(97, 97, 97, 0.6)"}} >
                                Username
                            </StepLabel>
                        </Step>
                        <Step>
                            <StepLabel style={stepIndex > 1 ? {color: "#fff"} : {color: "rgba(97, 97, 97, 0.6)"}} >
                                Fullname
                            </StepLabel>
                        </Step>
                        <Step>
                            <StepLabel style={stepIndex > 2 ? {color: "#fff"} : {color: "rgba(97, 97, 97, 0.6)"}} >
                                Life Investment
                            </StepLabel>
                        </Step>
                        <Step>
                            <StepLabel style={stepIndex > 3 ? {color: "#fff"} : {color: "rgba(97, 97, 97, 0.6)"}} >
                                Coach Request
                            </StepLabel>
                        </Step>
                        <Step>
                            <StepLabel style={stepIndex > 4 ? {color: "#fff"} : {color: "rgba(97, 97, 97, 0.6)"}} >
                                What's Next?
                            </StepLabel>
                        </Step>
                    </Stepper>
                    <ExpandTransition loading={loading} open={true}>
                    {this.renderContent()}
                    </ExpandTransition>
                </section>
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
