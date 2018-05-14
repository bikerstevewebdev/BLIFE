import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getClients, searchForClient } from '../../ducks/coachReducer'
import ClientCard from '../Client/ClientCard'
import RaisedButton from 'material-ui/RaisedButton'
import { TextField } from 'material-ui';

class CoachManager extends Component{
    constructor(){
        super()
        this.state = {
            clientEmailInput: ''
        }
        this.updateClientEmailInput = this.updateClientEmailInput.bind(this)
    }

    componentDidMount(){
        this.props.getClients()
    }

    updateClientEmailInput(e){
        this.setState({
            clientEmailInput: e.target.value
        })
    }

    render() {
        const { clientEmailInput } = this.state,
              { username, searchForClient, clients } = this.props,
              clientList = clients.map(client => <ClientCard key={client.client_coach_id} history={this.props.history} username={client.username} client_coach_id={client.client_coach_id} curr_mes_id={client.curr_mes_id} fullname={client.fullname} last_login={client.last_login/1} img={client.profile_pic} client_coach_id={client.client_coach_id}/>)
        const layoutStyles = {
                display: "grid",
                width: "100%",
                gridTemplateColumns: "repeat(4, 1fr)",
                gridTemplateRows: "10em",
                //  gridAutoRows: "",
                alignItems: "center",
                gridGap: "0.5em",
                padding: "5%",
                boxShadow: "rgb(29, 39, 41) 0px 2px 1px 1px",
                borderRadius: "3px",
                width: "auto",
                backgroundColor: "rgba(236, 234, 255, 0.76)"
             }
             const subStyles = {gridGap: "0.75em", display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", justifyItems: "center", width: "100%"}
        return (
            <section style={{...layoutStyles}} className="comp coach-manager">
                <h1 style={{fontSize: "3em", gridArea: "1/1/2/5", width: "100%", textAlign: "center"}}>Welcome Coach {username}!</h1>
                <section style={{...subStyles, gridColumn: "1/3"}}>
                   {clientList}
                </section>
                <section style={{...subStyles, gridColumn: "3/5"}}>
                    <TextField style={{width: "70%", gridColumn: "1/3"}} floatingLabelText="Add a new client by email (must be exact)" value={clientEmailInput} onChange={this.updateClientEmailInput} />
                    <RaisedButton style={{width: "70%", gridColumn: "1/3"}} secondary={true} onClick={() => searchForClient(clientEmailInput)} label="Send request to your new client" />
                </section>
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