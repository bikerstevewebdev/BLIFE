import React, { Component } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout'
import { RaisedButton } from 'material-ui';


class StripeDefault extends Component{

    onToken = (token) => {
        token.card = void 0;  // not storing card information
        console.log(this.props.amount)
        axios.post('/api/charge', {token, amount: this.props.amount}).then(res => {
            console.log(res)
            if(res.status === 200){
                this.props.updateChargeMsg(res.data.message)
            }
            }).catch( err => console.log(err))
    }

    render(){
        
    return(
        <div>
            <StripeCheckout
                token = {this.onToken}
                stripeKey = {process.env.REACT_APP_STRIPE_PK}
                amount={this.props.amount}
            >
                <RaisedButton primary={true} label={`Pay $${(this.props.amount/100).toFixed(2)} Investment`}/>
            </StripeCheckout>
        </div>
    )
}
}

export default StripeDefault