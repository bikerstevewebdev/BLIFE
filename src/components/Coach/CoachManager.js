import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getClients } from '../../ducks/userReducer'

class CoachManager extends Component{
    constructor(){
        super()
        this.state = {
            clientEmailInput: ''
        }
        this.updateClientEmailInput = this.updateClientEmailInput.bind(this)
    }

    componentDidMount(){
        this.props.getClients(this.props.match.params.id)
    }

    updateClientEmailInput(e){
        this.setState({
            clientEmailInput: e.target.value
        })
    }

    render() {
        const { clientEmailInput } = this.state,
              { username, searchForClient } = this.props
        return (
            <section className="client-manager">
                <h1>Welcome Coach {username}!</h1>
                <p>Add a new client by email (must be exact)</p>
                <input value={clientEmailInput} onChange={this.updateClientEmailInput} />
                <button onClick={() => searchForClient(clientEmailInput)}>Send request to your new client</button>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentClient: state.users.currentClient
    }
}


export default connect(mapStateToProps, { getClients })(CoachManager)