import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateUserMsg } from '../../ducks/userReducer'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { TextField, Checkbox } from 'material-ui';
import axios from 'axios'

class MealCreator extends Component{
    constructor() {
        super()
        this.state = {
            phoneInput: '',
            emailInput: '',
            sendingTxt: false,
            sendingEmail: false,
        }
        this.updateEmailInput = this.updateEmailInput.bind(this)
        this.updatePhoneInput = this.updatePhoneInput.bind(this)
    }

    
    sendReceipt() {
        const { emailInput, phoneInput, sendingEmail, sendingTxt } = this.state        
        let pnum = `+1${phoneInput}`       
        axios.post('/receipt', { emailInput, pnum, sendingEmail, sendingTxt }).then(res => {
            console.log(res)
            if(res.data.success){
                this.props.updateUserMsg(res.data.message)
                this.props.closeModal()
            }
        }).catch(err  => {console.log(err)})
    }

    updatePhoneInput(val) {
        this.setState({
            phoneInput: val
        })
    }

    updateEmailInput(val) {
        this.setState({
            emailInput: val
        })
    }

    changeSendingEmail(bool){
        this.setState({ sendingEmail: bool})
    }
    changeSendingTxt(bool){
        this.setState({ sendingTxt: bool})
    }
    
    render() {
        const { phoneInput, emailInput, sendingTxt, sendingEmail } = this.state
        return(
            <Dialog open={this.props.rmOpen} className="receipt-modal" >
                <h1>Thank you for making such an important investment in your health.</h1>
                <h2>Would you like us to send you a receipt?</h2>
                <Checkbox onClick={() => this.changeSendingEmail(!sendingEmail)} label="Send me an email."/>
                <Checkbox onClick={() => this.changeSendingTxt(!sendingTxt)} label="Send me a text."/>
                <TextField disabled={!sendingEmail} floatingLabelText="Email Address" type="email" hintText="Must Be Valid Email Address" value={emailInput} onChange={(e) => this.updateEmailInput(e.target.value)} />
                <TextField disabled={!sendingTxt} value={phoneInput} type="number" floatingLabelText="Phone Number" hintText="No Spaces or Special Characters" onChange={(e) => this.updatePhoneInput(e.target.value)} />
                <RaisedButton primary={true} disabled={(this.sendingTxt && phoneInput.length !== 10) || (sendingEmail && (emailInput.length < 5 || !emailInput.includes("@")))} onClick={this.sendReceipt.bind(this)} label={"Send Receipt"}/>
                <FlatButton onClick={this.props.closeModal} label="No thanks" />
            </Dialog>
        )
    }
}

export default connect(null, { updateUserMsg })(MealCreator)