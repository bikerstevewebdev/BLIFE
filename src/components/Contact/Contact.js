import React, { Component } from 'react'
import TextField from 'material-ui/TextField'

const subStyle = {
    fontSize: "0.75em",
    color: "grey",
    fontStyle: "italic"
}

class Contact extends Component {
    constructor() {
        super()
        this.state = {
            nameIn: '',
            emailIn: '',
            topicIn: '',
            messageIn: ''
        }
        this.updateEmailIn   = this.updateEmailIn.bind(this)
        this.updateNameIn    = this.updateNameIn.bind(this)
        this.updateTopicn    = this.updateTopicIn.bind(this)
        this.updateMessageIn = this.updateMessageIn.bind(this)
    }
    
    updateNameIn(e){
        this.setState({
            nameIn: e.target.value
        })
    }

    updateEmailIn(e){
        this.setState({
            emailIn: e.target.value
        })
    }

    updateTopicIn(e){
        this.setState({
            topicIn: e.target.value
        })
    }

    updateMessageIn(e){
        this.setState({
            messageIn: e.target.value
        })
    }

    render(){
        return(
            <section className="contact">
            <h1>Contact Us</h1>
            <h3>Please fill out the form below regarding yourself and your question and we will get back to you as hastly as we can.</h3>
            <p style={subStyle}>Please allow up to 24 hours for response time.</p>
            <form>
                <TextField className="name-input" onChange={this.updateNameIn} value={this.state.nameIn} />
                <TextField className="topic-input" onChange={this.updateTopicIn} value={this.state.topicIn} />
                <TextField className="email-input" onChange={this.updateEmailIn} value={this.state.emailIn} />
                <TextField className="message-input" onChange={this.updateMessageIn} value={this.state.messageIn} />
            </form>
        </section>
        )
    }
} export default Contact