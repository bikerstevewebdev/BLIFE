import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getClients, searchForClient } from '../../ducks/userReducer'
import ClientCard from '../Client/ClientCard'

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
              { username, searchForClient, clients } = this.props,
              clientList = clients.map(client => <ClientCard fullname={client.fullname} last_login={client.last_login} client_id={client.client_id}/>)
        return (
            <section className="coach-manager">
                <h1>Welcome Coach {username}!</h1>
                {clientList}
                <p>Add a new client by email (must be exact)</p>
                <input value={clientEmailInput} onChange={this.updateClientEmailInput} />
                <button onClick={() => searchForClient(clientEmailInput)}>Send request to your new client</button>
            </section>
        )
    }
}

function mapStateToProps(state) {
    const { currentClient, clients } = state.coach
    return {
        username: state.users.userData.username,
        currentClient,
        clients
    }
}


export default connect(mapStateToProps, { getClients, searchForClient })(CoachManager)