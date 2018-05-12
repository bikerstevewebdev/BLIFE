import React, { Component } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout'
import { RaisedButton } from 'material-ui';
import { connect } from 'react-redux'
import { updateUserMsg, getUserData } from '../../ducks/userReducer'

class MakeInvestment extends Component{

    onToken = (token) => {
        token.card = void 0;  // not storing card information
        console.log('makeInvestment props: ', this.props)
        axios.post('/api/charge', {token, amount: 3900}).then(res => {
            console.log(res)
            if(res.status === 200){
                this.props.updateUserMsg("Thank you and good luck on your Journey!")
                this.props.getUserData()

            }
            }).catch( err => console.log(err))
    }

    componentDidMount(){
        if(this.props.userData.has_paid){
            this.props.history.push('/dashboard')
        }
    }
    componentDidUpdate(){
        if(this.props.userData.has_paid){
            this.props.history.push('/dashboard')
        }
    }

    render(){
        return(
            <div>
                <h1>It looks like you have not yet made your Life Investment.</h1>
                <h2>Please Make your payment below</h2>
                <StripeCheckout
                    token = {this.onToken}
                    stripeKey = {process.env.REACT_APP_STRIPE_PK}
                    amount={3900}
                >
                    <RaisedButton primary={true} label={`Pay $39.00 Investment`}/>
                </StripeCheckout>
            </div>
        )
}
}

function mapStateToProps(state) {
    return {
        userData: state.users.userData
    }
}

export default connect(mapStateToProps, { updateUserMsg, getUserData })(MakeInvestment)